import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ScrollToTop from "./components/layout/ScrollToTop";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookingLayout from "./components/booking/BookingLayout";
import ServiceStep from "./pages/booking/ServiceStep";
import BarberStep from "./pages/booking/BarberStep";
import DateStep from "./pages/booking/DateStep";
import SummaryStep from "./pages/booking/SummaryStep";
import BookingSuccess from "./pages/booking/BookingSuccess";
import MyAppointments from "./pages/MyAppointments";
import Profile from "./pages/Profile";
import AdminRoute from "./components/auth/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";
import Dashboard from "./pages/admin/Dashboard";
import Agenda from "./pages/admin/Agenda";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/reservar" element={<BookingLayout />}>
              <Route index element={<Navigate to="servicio" replace />} />
              <Route path="servicio" element={<ServiceStep />} />
              <Route path="barbero" element={<BarberStep />} />
              <Route path="fecha" element={<DateStep />} />
              <Route path="resumen" element={<SummaryStep />} />
            </Route>
            <Route path="/turno-confirmado" element={<BookingSuccess />} />
            <Route path="/mis-turnos" element={<MyAppointments />} />
            <Route path="/perfil" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="*" element={<AdminPlaceholder />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
