import { useState } from "react";
import { AuthContext } from "./auth-context";
import { clearBookingDraft } from "../services/bookingDraft";

const STORAGE_KEY = "filo-user";

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function storeUser(user) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // sin almacenamiento disponible: la sesión no se persiste
  }
}

// Fecha de alta simulada: se fija la primera vez que entra cada correo
function getMemberSince(email) {
  const key = `filo-member-since:${email}`;
  const now = new Date().toISOString();
  try {
    const stored = localStorage.getItem(key);
    if (stored) return stored;
    localStorage.setItem(key, now);
  } catch {
    // ignorar
  }
  return now;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  // TODO: reemplazar por llamadas a la API cuando esté el backend
  const login = (userData) => {
    const next = { ...userData, createdAt: getMemberSince(userData.email) };
    setUser(next);
    storeUser(next);
  };

  const updateUser = (changes) => {
    const next = { ...user, ...changes };
    setUser(next);
    storeUser(next);
  };

  const logout = () => {
    setUser(null);
    storeUser(null);
    clearBookingDraft();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}