import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import InicioComunidad from './InicioUsuario/jsx/InicioComunidad.jsx'; 
import FormaParte from './InicioUsuario/jsx/FormaParte.jsx'; 
import PreguntasFrecuentes from './InicioUsuario/jsx/PreguntasFrecuentes.jsx'
import LandingSecciones from './InicioUsuario/jsx/LandingSecciones.jsx';

// Lazy loading de componentes
const FormLogin = lazy(() => import('./Login/FormLogin'));
const ListaCursos = lazy(() => import('./ListaCursos/ListaCursos'));
const NotificacionesAd = lazy(() => import('./Notificaciones/NotificacionesAd'));
const InicioPl = lazy(() => import('./Inicio/InicioPl'));
const NotificacionesU = lazy(() => import('./Notificaciones/NotificacionesU'));

export const AppRoutes = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<FormLogin />} />

            {/* Rutas protegidas de administrador */}
            <Route path="/admin/*" element={
                <ProtectedRoute requiredRole="admin">
                    <Routes>
                        <Route path="notificaciones" element={<NotificacionesAd />} />
                        <Route path="inicio" element={<InicioPl />} />
                        <Route path="cursos" element={<ListaCursos />} />
                        <Route path="comunidad" element={<InicioComunidad />} /> {/* Ruta corregida */}
                        <Route path="formaparte" element={<FormaParte/>} />
                        <Route path="preguntasfrecuentes" element={<PreguntasFrecuentes/>} />
                        <Route path="usuario" element={<LandingSecciones/>} />
                    </Routes>
                </ProtectedRoute>
            } />

            {/* Rutas protegidas de usuario */}
            <Route path="/usuario/*" element={
                <ProtectedRoute requiredRole="user">
                    <Routes>
                        <Route path="notificaciones" element={<NotificacionesU />} />
                        <Route path="inicio" element={<InicioPl />} />
                        <Route path="cursos" element={<ListaCursos />} />
                        <Route path="Inicio" element={<InicioComunidad />} /> {/* Ruta corregida */}
                        <Route path="comunidad" element={<InicioComunidad />} /> 
                        <Route path="formaparte" element={<FormaParte/>} />
                        <Route path="preguntasfrecuentes" element={<PreguntasFrecuentes/>} />
                        <Route path="usuario" element={<LandingSecciones/>} />

                    </Routes>
                </ProtectedRoute>
            } />

            {/* Redirección por defecto */}
            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    </Suspense>
);

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </AuthProvider>
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
