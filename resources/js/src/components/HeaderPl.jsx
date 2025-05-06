import React, { useState, useEffect, useRef } from 'react';
import './HeaderPl.css';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const profileRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                <img src="" alt="Logo" className="logo" />
            </div>
            <div className="right">
                <nav className="tabs">
                    <a href="">Inicio</a>
                    <a href="">Cursos</a>
                    <a href="">Mis compras</a>
                    <a href="">Contacto</a>
                </nav>
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
                                <li><a href="">Ver perfil</a></li>
                                <li><a href="">Configuración</a></li>
                                <li><a href="">Cerrar sesión</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
