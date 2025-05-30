// ==============================
// IMPORTACIONES
// ==============================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './FormLogin.css';

// ==============================
// CONFIGURACIÓN GLOBAL DE AXIOS
// ==============================
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

// ==============================
// COMPONENTE PRINCIPAL
// ==============================
/**
 * FormLogin maneja la autenticación de usuarios y administradores.
 */
function FormLogin() {
    // ------------------------------
    // ESTADOS
    // ------------------------------
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    // ------------------------------
    // HOOKS
    // ------------------------------
    const navigate = useNavigate();

    // ------------------------------
    // FUNCIONES AUXILIARES
    // ------------------------------
    // Alterna entre modo claro y oscuro
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    // Maneja el envío del formulario de inicio de sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Obtener token CSRF
            await axios.get('/sanctum/csrf-cookie');
            // Intento de inicio de sesión
            const response = await axios.post('/api/login', {
                email,
                password: contrasena
            });
            const { data } = response;
            if (data.user) {
                localStorage.setItem('user_data', JSON.stringify(data.user));
                localStorage.setItem('theme', data.user.theme || 'light');
                // Redirección según tipo de usuario
                const route = data.user.role === 'admin' ? '/admin/cursos' : '/usuario/cursos';
                window.location.href = route;
                navigate(route, { replace: true });
            } else {
                setError('Error: No se recibieron datos del usuario');
            }
        } catch (error) {
            setError(error.response?.status === 401
                ? 'Credenciales inválidas'
                : 'Error al conectar con el servidor'
            );
        }
    };

    // ------------------------------
    // RENDERIZADO
    // ------------------------------
    return (
        <div className="login-wrapper">
            {/* Sección de introducción */}
            <div className="intro-container">
                <div className="half-circle" />
                <div className="intro-text">
                    <h1 className="intro-title">¡Bienvenido!</h1>
                    <p className="intro-subtitle">Construyamos lo que viene</p>
                </div>
            </div>

            {/* Sección del formulario */}
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1 className="login-title">Iniciar Sesión</h1>

                    {/* Campo de correo */}
                    <div className="form-group">
                        <label className="form-label">Correo</label>
                        <div className="form-input">
                            <input
                                type="email"
                                placeholder="Introduce tu dirección email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Campo de contraseña */}
                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <div className="form-input password-input">
                            <input
                                type={mostrarContrasena ? 'text' : 'password'}
                                placeholder="Introduce tu contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="icon-button"
                                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                aria-label={mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                <FontAwesomeIcon icon={mostrarContrasena ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>

                    {/* Mensaje de error */}
                    {error && <div className="form-error">{error}</div>}

                    <button type="submit" className="login-button">
                        Iniciar sesión
                    </button>
                </form>
            </div>

            {/* Botón de cambio de tema */}
            <div className="mode-toggle">
                <button
                    className="mode-toggle-button"
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                >
                    <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
                </button>
            </div>
        </div>
    );
}

export default FormLogin;
