import React, { useState } from 'react';
import './FormLogin.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function FormLogin() {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(false); // Estado para controlar el modo oscuro
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add('dark-mode'); // Agregar la clase dark-mode al body
        } else {
            document.body.classList.remove('dark-mode'); // Quitar la clase dark-mode del body
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: contrasena
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Credenciales incorrectas');
                return;
            }

            // Redirigir si el login fue exitoso
            navigate('/cursos');
        } catch (err) {
            setError('Error al conectar con el servidor.');
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