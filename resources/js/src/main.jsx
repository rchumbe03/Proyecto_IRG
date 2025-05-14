import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormLogin from './components/Login/FormLogin.jsx';
import ListaCursos from './components/ListaCursos/ListaCursos.jsx';
import Notificaciones from "./components/Notificaciones/Notificaciones.jsx";
import InicioPlc from './components/Inicio/InicioPlc.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<FormLogin />} />
            <Route path="/cursos" element={<ListaCursos />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path="/inicio" element={<InicioPlc />} />
        </Routes>
    </BrowserRouter>
);
