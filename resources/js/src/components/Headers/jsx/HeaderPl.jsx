import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HeaderPl.css';
import pepsi from '../../../assets/logos/pepsi.png';

// Importa los iconos de React Icons
import { FaBell, FaSun, FaMoon } from 'react-icons/fa';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);  // Para el cambio de tema
    const profileRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);

        // Cambiar la clase 'dark-theme' en el body y header
        if (!isDarkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <header className={isDarkMode ? 'dark-theme' : ''}>
            <div className="left">
                <img src={pepsi} alt="Logo" className="logo" />
            </div>
            <div className="right">
                <div className="icons">

                    {/* NotificacionesAd */}
                    <button className="icon-text-button" onClick={() => navigate('/usuario/notificaciones')}>
                        <span>Notificaciones</span>
                        <FaBell />
                    </button>


                    {/* Modo Día/Noche */}
                    <button className="icon-text-button" onClick={toggleTheme}>
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                <div className="profile" ref={profileRef}>
                    <img
                        src=""
                        alt="Perfil"
                        className="profile-icon"
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div className="dropdown">
                            <ul>
                                <li><a href="#">Ver perfil</a></li>
                                <li><a href="#">Configuración</a></li>
                                <li><a href="#">Cerrar sesión</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}


