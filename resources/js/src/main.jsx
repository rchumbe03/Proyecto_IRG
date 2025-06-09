import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import DetallesCurso from './DetallesCurso/DetallesCurso.jsx';
import Contactanos from './Contactanos/Contactanos.jsx'

// Lazy loading de componentes
const FormLogin = lazy(() => import('./Login/FormLogin'));
const ListaCursos = lazy(() => import('./ListaCursos/ListaCursos'));
const NotificacionesAd = lazy(() => import('./Notificaciones/NotificacionesAd'));
const InicioPl = lazy(() => import('./Dashboard/./Dashboard'));
const NotificacionesU = lazy(() => import('./Notificaciones/NotificacionesU'));
const PasarelaPago = lazy(() => import('./PasarelaPago/PasarelaPago'));
const Inicio = lazy(() => import('./Inicio/Inicio.jsx'));
const InformacionPersonal = lazy(()=> import('./InformacionPersonal/'))

export const AppRoutes = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<FormLogin />} />
            <Route path="/pasarela" element={<PasarelaPago />} />
            <Route path="/inicio" element={<Inicio />} />

            {/* Rutas protegidas de administrador */}
            <Route path="/admin/*" element={
                <ProtectedRoute requiredRole="admin">
                    <Routes>
                        <Route path="notificaciones" element={<NotificacionesAd />} />
                        <Route path="dashboard" element={<InicioPl />} />
                        <Route path="cursos" element={<ListaCursos />} />
                        <Route path="inicio" element={<Inicio />} />
                        <Route path="detallescurso" element={<DetallesCurso />} />
                        <Route path="contactanos" element={<Contactanos />} />
                        <Route path="informacionPersonal" element={<InformacionPersonal />} />
                    </Routes>
                </ProtectedRoute>
            } />

            {/* Rutas protegidas de usuario */}
            <Route path="/usuario/*" element={
                <ProtectedRoute requiredRole="user">
                    <Routes>
                        <Route path="notificaciones" element={<NotificacionesU />} />
                        <Route path="dashboard" element={<InicioPl />} />
                        <Route path="cursos" element={<ListaCursos />} />
                        <Route path="inicio" element={<Inicio />} />
                        <Route path="detallescurso" element={<DetallesCurso />} />
                        <Route path="contactanos" element={<Contactanos />} />

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
