import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import FormLogin from './components/Login/FormLogin.jsx';
import ListaCursos from './components/ListaCursos/ListaCursos.jsx';
import Notificaciones from "./components/Notificaciones/Notificaciones.jsx";
import InicioPl from './components/Inicio/InicioPl.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<FormLogin />} />
            <Route path="/cursos" element={<ListaCursos />} />
            <Route path="/admin/cursos" element={<ListaCursos />} />
            <Route path="/admin/notificaciones" element={<Notificaciones />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path="/iniciopl" element={<InicioPl />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>
);
