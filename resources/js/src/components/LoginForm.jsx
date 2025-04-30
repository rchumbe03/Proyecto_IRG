import React, { useState } from 'react';
import './LoginForm.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, contrasena });
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

                    <button type="submit" className="login-button">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
