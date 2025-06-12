import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

// Lazy loading de componentes
const Inicio = lazy(() => import('./Inicio/Inicio.jsx'));
const PasarelaPago = lazy(() => import('./PasarelaPago/PasarelaPago'));
const FormLogin = lazy(() => import('./Login/FormLogin'));
const ListaCursos = lazy(() => import('./ListaCursos/ListaCursos'));
const Dashboard = lazy(() => import('./Dashboard/./Dashboard'));
const VideoTema = lazy(() => import('./VideoPl/VideoPl'));
const NotificacionesAd = lazy(() => import('./Notificaciones/NotificacionesAd'));
const NotificacionesU = lazy(() => import('./Notificaciones/NotificacionesU'));
const Perfil = lazy(() => import('./Perfil/Perfil.jsx'));

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
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="cursos" element={<ListaCursos />} />
                        <Route path="video/:id" element={<VideoTema />} />
                        <Route path="perfil" element={<Perfil />} />
                    </Routes>
                </ProtectedRoute>
            } />

            {/* Rutas protegidas de usuario */}
            <Route path="/usuario/*" element={
                <ProtectedRoute requiredRole="usuario">
                    <Routes>
                        <Route path="notificaciones" element={<NotificacionesU />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="cursos" element={<ListaCursos />} />
                        <Route path="video/:id" element={<VideoTema />} />
                        <Route path="perfil" element={<Perfil />} />
                    </Routes>
                </ProtectedRoute>
            } />

            {/* Redirección por defecto */}
            <Route path="/" element={<Navigate to="/inicio" replace />} />
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
