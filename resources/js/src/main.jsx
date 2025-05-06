import React from 'react';
import ReactDOM from 'react-dom/client';

import LoginForm from './components/LoginForm'; // ✅ correcto

import Footer from './components/Footer';
import Header from './components/Header';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <Header />
      
      <Footer />
    </>
  </React.StrictMode>
);
