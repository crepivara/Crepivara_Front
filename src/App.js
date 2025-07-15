import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import Login from "./view/auth/Login";
import Register from "./view/auth/Register";
import Home from "./view/Home";
import AdminHome from "./view/admin/AdminHome";
import OrderHome from "./view/order/OrderHome";
import ScrollConfig from "./js/ScrollConfig";
import AboutUs from "./view/aboutUs/AboutUs";
import AOS from 'aos';
import 'aos/dist/aos.css';

import "./index.css";
import MainMenu from "./view/menu/mainMenu";
import TimeCounter from "./view/counter/TimeCounter";

const isAuthenticated = () => localStorage.getItem("user") !== null;

// Función para comprobar si seguimos antes de la fecha de apertura
const bloquedTime = () => {
  const openingDateStr = process.env.REACT_APP_OPENING_DATE; // "DD/MM/YYYY"
  const openingHourStr = process.env.REACT_APP_OPENING_HOUR; // opcional: "HH" o "HH:MM"

  if (!openingDateStr) {
    console.warn('REACT_APP_OPENING_DATE no está definida');
    return false; // por seguridad, permitir navegación si no se define
  }

  const partes = openingDateStr.split('/');
  if (partes.length !== 3) {
    console.error('Formato inválido en REACT_APP_OPENING_DATE:', openingDateStr);
    return false;
  }
  const [diaStr, mesStr, añoStr] = partes;
  const dia = Number(diaStr);
  const mes = Number(mesStr);
  const año = Number(añoStr);
  if (
    Number.isNaN(dia) ||
    Number.isNaN(mes) ||
    Number.isNaN(año) ||
    dia < 1 || dia > 31 ||
    mes < 1 || mes > 12
  ) {
    console.error('Valores inválidos en REACT_APP_OPENING_DATE:', openingDateStr);
    return false;
  }
  // Crear fecha en zona local
  const fechaObj = new Date(año, mes - 1, dia);

  // Si se definió hora de apertura, parsearla:
  if (openingHourStr) {
    const partesHora = openingHourStr.split(':');
    const hora = Number(partesHora[0]);
    const minuto = partesHora.length > 1 ? Number(partesHora[1]) : 0;
    if (!Number.isNaN(hora) && hora >= 0 && hora < 24 && !Number.isNaN(minuto) && minuto >= 0 && minuto < 60) {
      fechaObj.setHours(hora, minuto, 0, 0);
    } else {
      console.warn('Formato inválido en REACT_APP_OPENING_HOUR:', openingHourStr);
    }
  } else {
    fechaObj.setHours(0, 0, 0, 0);
  }

  const now = new Date();
  return now < fechaObj; // true = aún bloqueado
};

// Un componente guard genérico para rutas públicas/privadas
const RouteGuard = ({ element, authRequired = false }) => {
  const blocked = bloquedTime();
  if (blocked) {
    return <Navigate to="/timecount" replace />;
  }
  if (authRequired && !isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

// Wrapper para AdminLayout con auth y time guard
const AdminLayoutWrapper = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

function App() {
  // Inicializar AOS al montar la aplicación:
  useEffect(() => {
    AOS.init({
      duration: 2000,  // Animación más lenta (2 segundos)
      offset: 120,
      once: true,      // Ejecutar la animación solo una vez
      mirror: false,
    });
    // Si necesitas refrescar en contenido dinámico:
    // AOS.refresh();
  }, []);

  return (
    <Router>
      <ScrollConfig />
      <Routes>
        <Route path="/timecount" element={<TimeCounter />} />

        <Route element={<RouteGuard element={<UserLayout />} authRequired={false} />}>  
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/orders" element={<OrderHome />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Route>

        <Route path="/login" element={
          bloquedTime()
            ? <Login />
            : isAuthenticated()
              ? <Navigate to="/" replace />
              : <Login />
        } />
        <Route path="/register" element={
          bloquedTime()
            ? <Register />
            : isAuthenticated()
              ? <Navigate to="/" replace />
              : <Register />
        } />

        <Route path="/home-admin/*" element={<RouteGuard element={<AdminLayoutWrapper />} authRequired={true} />}>
          <Route index element={<AdminHome />} />
        </Route>

        <Route path="*" element={
          bloquedTime()
            ? <Navigate to="/timecount" replace />
            : <Navigate to="/" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
