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
    const [recuerdame, setRecuerdame] = useState(false);

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
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/api/login', {
                email,
                password: contrasena,
                remember: recuerdame,
            });
            const { data } = response;
            console.log(data); // Depurar la respuesta del backend
            if (data.user) {
                console.log(data.user.type); // Depurar el tipo de usuario
                localStorage.setItem('user_data', JSON.stringify(data.user));
                localStorage.setItem('theme', data.user.theme || 'light');
                if (data.user.type === 'admin') {
                    navigate('/admin/cursos', { replace: true });
                } else if (data.user.type === 'usuario') {
                    navigate('/usuario/cursos', { replace: true });
                } else {
                    setError('Tipo de usuario no reconocido');
                }
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

                    {/* Checkbox "Recuerdame" */}
                    <div className="form-group">
                        <label className="form-label">
                            <input
                                type="checkbox"
                                checked={recuerdame}
                                onChange={(e) => setRecuerdame(e.target.checked)}
                            />
                            Recuérdame
                        </label>
                    </div>

                    {/* Mensaje de error */}
                    {error && <div className="form-error">{error}</div>}

                    <button type="submit" className="login-button">
                        Iniciar sesión
                    </button>
                </form>
            </div>

            {/* Botón de cambio de tema */}
            <div className="theme-toggle">
                <button
                    className="theme-toggle-button"
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
