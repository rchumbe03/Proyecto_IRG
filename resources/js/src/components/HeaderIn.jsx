import React, { useState, useEffect, useRef } from 'react';
import './HeaderIn.css';

// Importa los iconos de React Icons
import { FaWallet, FaFileAlt, FaBell, FaSun, FaMoon } from 'react-icons/fa';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);  // Para el cambio de tema
  const profileRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', isDarkMode);  // Cambiar el tema a oscuro
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
        <div className="icons">
          {/* Billetera */}
          <button className="icon-text-button">
            <span>Billetera</span>
            <FaWallet />
          </button>

          {/* Expediente */}
          <button className="icon-text-button">
            <span>Expediente</span>
            <FaFileAlt />
          </button>

          {/* Notificaciones */}
          <button className="icon-text-button">
            <span>Notificaciones</span>
            <FaBell />
          </button>

          {/* Modo Día/Noche */}
          <button className="icon-text-button" onClick={toggleTheme}>
            <span>Modo</span>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
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

