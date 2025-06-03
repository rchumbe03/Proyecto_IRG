import React, { useState, useEffect, useRef } from 'react';
import '../css/HeaderIn.css';
import perfilIcon from '../../../assets/usuario/perfil-icon.png';
import spotify from '../../../assets/logos/spotify.png';
import { FaHome, FaBookOpen, FaBuilding, FaEnvelope, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();

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
                <img src={spotify} alt="Logo" className="logo" onClick={() => navigate('/cursos')} />
            </div>
            <div className="right">
                <nav className="tabs">
                    <button className="icon-text-button" onClick={() => navigate('/')}>
                        <span>Inicio</span>
                        <FaHome />
                    </button>
                    <button className="icon-text-button" onClick={() => navigate('/admin/cursos')}>
                        <span>Cursos</span>
                        <FaBookOpen />
                    </button>
                    <button className="icon-text-button">                       
                        <span>Sobre Nosotros</span> 
                        <FaBuilding />
                    </button>
                    <button className="icon-text-button">
                        <span>Contacto</span>
                        <FaEnvelope />
                    </button>
                </nav>
                <div className="mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun className="mode-icon" /> : <FaMoon className="mode-icon" />}
                </div>
                <div className="profile" ref={profileRef}>
                    <img src={perfilIcon} alt="Perfil" className="profile-icon" onClick={toggleDropdown} />
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
