import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

// Lazy loading de componentes
const FormLogin = lazy(() => import('./Login/FormLogin'));
const ListaCursos = lazy(() => import('./ListaCursos/ListaCursos'));
const NotificacionesAd = lazy(() => import('./Notificaciones/NotificacionesAd'));
const InicioPl = lazy(() => import('./Dashboard/./Dashboard'));
const NotificacionesU = lazy(() => import('./Notificaciones/NotificacionesU'));
const PasarelaPago = lazy(() => import('./PasarelaPago/PasarelaPago'));
const InicioComunidad = lazy(() => import('./Inicio/InicioComunidad'));

export const AppRoutes = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<FormLogin />} />
            <Route path="/pasarela" element={<PasarelaPago />} />

            {/* Rutas protegidas de administrador */}
            <Route path="/admin/*" element={
                <ProtectedRoute requiredRole="admin">
                    <Routes>
                        <Route path="notificaciones" element={<NotificacionesAd />} />
                        <Route path="dashboard" element={<InicioPl />} />
                        <Route path="cursos" element={<ListaCursos />} />
                        <Route path="inicio" element={<InicioComunidad />} />
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
                        <Route path="inicio" element={<InicioComunidad />} />
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
