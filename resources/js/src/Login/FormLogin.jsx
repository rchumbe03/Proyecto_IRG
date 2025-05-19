import React, { useState } from 'react';
import axios from 'axios';
import './FormLogin.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

// Configuración global de axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

function FormLogin() {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add('dark-mode'); // Agregar la clase dark-mode al body
        } else {
            document.body.classList.remove('dark-mode'); // Quitar la clase dark-mode del body
        }
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Obtener el token CSRF
            await axios.get('/sanctum/csrf-cookie');

            const response = await axios.post('/api/login', {
                email,
                password: contrasena
            });

            const { data } = response;
            console.log('Respuesta del servidor:', data); // Para debug

            if (data.user) {
                console.log('Datos del usuario:', data.user);
                localStorage.setItem('user_data', JSON.stringify(data.user));

                // Guardar tema
                localStorage.setItem('theme', data.user.theme || 'light');

                // Determinar la ruta
                const route = data.user.type === 'admin' ? '/admin/cursos' : '/cursos';
                console.log('Intentando redirigir a:', route);

                // Forzar la redirección
                window.location.href = route;

                // Como respaldo, también usar navigate
                navigate(route, { replace: true });
            } else {
                console.error('No hay datos de usuario en la respuesta');
                setError('Error: No se recibieron datos del usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response?.status === 401) {
                setError('Credenciales inválidas');
            } else {
                setError('Error al conectar con el servidor');
            }
        }
    };

    return (
        <div className="login-wrapper">
            {/* Sección izquierda */}
            <div className="intro-container">
                <div className="half-circle" />
                <div className="intro-text">
                    <h1 className="intro-title">¡Bienvenido!</h1>
                    <p className="intro-subtitle">Construyamos lo que viene</p>
                </div>
            </div>

            {/* Sección derecha (formulario) */}
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1 className="login-title">Iniciar Sesión</h1>

                    {/* Correo */}
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

                    {/* Contraseña */}
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
                            >
                                👁
                            </button>
                        </div>
                    </div>

                    {/* Error de login */}
                    {error && <div className="form-error">{error}</div>}

                    <button type="submit" className="login-button">
                        Iniciar sesión
                    </button>
                </form>
            </div>

            {/* Botón para cambiar el modo oscuro */}
            <div className="mode-toggle">
                <button className="mode-toggle-button" onClick={toggleDarkMode}>
                    <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
                </button>
            </div>
        </div>
    );
}

export default FormLogin;
