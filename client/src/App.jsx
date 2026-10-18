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
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
    </>
  );
}
