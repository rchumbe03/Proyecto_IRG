import React, { useState, useRef, useEffect } from 'react';
import '../css/HeaderAd.css';
import { FaBell, FaMoon, FaSun } from 'react-icons/fa';

const HeaderAd = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const profileRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src="" alt="Logo" className="logo-img" />
      </div>

      <div className="right-section">
        {/* Notificaciones */}
        <div className="icon-with-label notification-section">
          <FaBell className="icon" />
          <span className="icon-label">Notificaciones</span>
        </div>

        {/* Modo Oscuro */}
        <div className="icon-with-label darkmode-section" onClick={toggleDarkMode}>
          {darkMode ? (
            <>
              <FaSun className="icon" />
              <span className="icon-label"></span>
            </>
          ) : (
            <>
              <FaMoon className="icon" />
              <span className="icon-label"></span>
            </>
          )}
        </div>

        {/* Perfil */}
        <div className="profile" ref={profileRef}>
          <img
            src=""
            alt="Perfil"
            className="profile-icon"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="dropdown">
              <ul>
                <li><a href="/perfil">Mi Perfil</a></li>
                <li><a href="/configuracion">Configuración</a></li>
                <li><a href="/logout">Cerrar sesión</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAd;
