import React, { useState, useEffect, useRef } from 'react';
import '../css/HeaderIn.css';
import { FaHome, FaBookOpen, FaBuilding, FaEnvelope, FaSun, FaMoon } from 'react-icons/fa';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const profileRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            if (newMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            return newMode;
        });
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
        <header>
            <div className="left">
                <img src="logo.png" alt="Logo" className="logo" />
            </div>
            <div className="right">
                <nav className="tabs">
                    <a href="#inicio"><FaHome className="tab-icon" />Inicio</a>
                    <a href="#cursos"><FaBookOpen className="tab-icon" />Cursos</a>
                    <a href="#sobre-nosotros"><FaBuilding className="tab-icon" />Sobre Nosotros</a>
                    <a href="#contacto"><FaEnvelope className="tab-icon" />Contacto</a>
                </nav>
                <div className="mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun className="mode-icon" /> : <FaMoon className="mode-icon" />}
                </div>
                <div className="profile" ref={profileRef}>
                    <img
                        src="profile-icon.png"
                        alt="Perfil"
                        className="profile-icon"
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div className="dropdown">
                            <ul>
                                <li><a href="#perfil">Ver perfil</a></li>
                                <li><a href="#configuracion">Configuración</a></li>
                                <li><a href="#logout">Cerrar sesión</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
