import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './FormLogin.css';

// Configuración global de axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

/**
 * Componente FormLogin
 * Maneja la autenticación de usuarios y administradores
 *
 * @returns {JSX.Element} Formulario de inicio de sesión
 */
function FormLogin() {
    // Estados del formulario
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    // Hook de navegación
    const navigate = useNavigate();

    /**
     * Alterna entre modo claro y oscuro
     */
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    /**
     * Maneja el envío del formulario de inicio de sesión
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // 1. Obtener token CSRF
            await axios.get('/sanctum/csrf-cookie');

            // 2. Intento de inicio de sesión
            const response = await axios.post('/api/login', {
                email,
                password: contrasena
            });

            const { data } = response;

            // 3. Procesamiento de respuesta exitosa
            if (data.user) {
                // Almacenar datos del usuario
                localStorage.setItem('user_data', JSON.stringify(data.user));
                localStorage.setItem('theme', data.user.theme || 'light');

                // Determinar ruta según tipo de usuario
                const route = data.user.type === 'admin' ? '/cursos' : '/cursos';

                // Redirección doble para mayor seguridad
                window.location.href = route;
                navigate(route, { replace: true });
            } else {
                setError('Error: No se recibieron datos del usuario');
            }
        } catch (error) {
            // Manejo de errores de autenticación
            console.error('Error:', error);
            setError(error.response?.status === 401
                ? 'Credenciales inválidas'
                : 'Error al conectar con el servidor'
            );
        }
    };

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
