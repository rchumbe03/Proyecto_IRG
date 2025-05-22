import React, { useState, useRef, useEffect } from 'react';
import '../css/HeaderAd.css';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaMoon, FaSun } from 'react-icons/fa';
import adidas2 from '../../../assets/logos/adidas2.png';
import defaultAvatar from '../../../assets/avatars/avatarDefault.png';

const HeaderAd = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false); // ← nuevo
  const profileRef = useRef(null);
  const navigate = useNavigate();
//
 const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleTheme = () => {
     setIsSpinning(true);

     setDarkMode(d => {
       const next = !d;
       document.body.classList.toggle('dark-mode', next);
       return next;
     });
  
     setTimeout(() => setIsSpinning(false), 500);
   };
//
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
      <div className="logo" onClick={() => navigate('/admin/cursos')}>
        <img src={adidas2} alt="Logo" className="logo-img" />
      </div>

      <div className="right-section">
        {/* NotificacionesAd */}
        <div className="icon-text-button" onClick={() => navigate('/notificacionesad')}>
          <span>Notificaciones</span>
          <FaBell /> 
        </div>

        {/* Modo Oscuro */}
         <div
         className={`icon-with-label darkmode-section ${isSpinning ? 'spin' : ''}`}
         onClick={toggleTheme}>

         {darkMode
           ? <FaSun className="icon" />
           : <FaMoon className="icon" />
         }
       </div>

        {/* Perfil */}
<div className="profile" ref={profileRef}>
  <img
    src={ defaultAvatar }
    alt="Perfil"
    className="profile-icon"
    onError={e => { e.currentTarget.src = defaultAvatar }}
    onClick={toggleDropdown}
  />
  { dropdownOpen && (
    <div className="dropdown"> <ul>
    <li><a href="/perfil">Mi Perfil</a></li>
    <li><a href="/configuracion">Configuración</a></li>
    <li><a href="/logout">Cerrar sesión</a></li>
  </ul> </div>
  ) }
</div>
        
      </div>
    </header>
  );
};

export default HeaderAd;
