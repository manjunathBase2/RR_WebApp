/* ==========================================================================
File:   Footer.jsx

Description:
This file defines the Footer component. It displays the Roche logo and the copyright information.

Features:
- Displays the Roche logo.
- Displays the copyright information.

Instructions:
- The component does not receive any props.

========================================================================== */



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
