import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

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
        <img src="logo.png" alt="Logo" className="logo" />
      </div>
      <div className="right">
        <nav className="tabs">
          <a href="#inicio">Inicio</a>
          <a href="#cursos">Cursos</a>
          <a href="#mis-compras">Mis compras</a>
          <a href="#contacto">Contacto</a>
        </nav>
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

// function toggleDropdown() {
//     const dropdown = document.querySelector('.dropdown');
//     dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
//   }
