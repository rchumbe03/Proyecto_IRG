import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <button className="logo-button">Logo</button>
        <p>&copy; 2025 Company IRG.</p>
      </div>
      
      <div className="footer-right">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;