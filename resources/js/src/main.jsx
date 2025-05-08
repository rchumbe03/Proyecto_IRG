import React from 'react';
import ReactDOM from 'react-dom/client';

import LoginForm from './components/LoginForm'; // ✅ correcto

import Footer from './components/Footer';
import Header from './components/Header';
import HeaderAd from './components/HeaderAD';
import Notificaciones from './components/Notificaciones';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="pagina">
      <HeaderAd />
      <Notificaciones />
      <Footer />
    </div>
  </React.StrictMode>
);
