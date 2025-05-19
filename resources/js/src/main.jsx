import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FormLogin from './Login/FormLogin.jsx';
import ListaCursos from './ListaCursos/ListaCursos.jsx';
import NotificacionesAd from "./Notificaciones/NotificacionesAd.jsx";
import InicioPl from './Inicio/InicioPl.jsx';
import NotificacionesU from "./Notificaciones/NotificacionesU.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            /* Usuario y Admin */
            <Route path="/login" element={<FormLogin />} />
            <Route path="/cursos" element={<ListaCursos />} />
            /* Admin */
            <Route path="/admin/notificaciones" element={<NotificacionesAd />} />

            /* Usuario */
            <Route path="/notificacionesu" element={<NotificacionesU />} />
            <Route path="/iniciopl" element={<InicioPl />} />
        </Routes>
    </BrowserRouter>
);
