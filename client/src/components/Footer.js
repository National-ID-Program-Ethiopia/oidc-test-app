import React from 'react';

const Footer = ({ className }) => (
  <footer className={className}>
    &copy; {new Date().getFullYear()} National ID. All Rights Reserved.
  </footer>
);

export default Footer;
