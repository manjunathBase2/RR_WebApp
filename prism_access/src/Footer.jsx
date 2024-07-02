import React from 'react';
import RocheLogo from './assets/Roche_Logo.png';

function Footer() {
  return (
    <footer className="footer">
      <img src={RocheLogo} alt="Roche Logo" className="footer-logo" />
      <p>© 2024  Roche Products (India) Pvt. Ltd.</p>
    </footer>
  );
}

export default Footer;
