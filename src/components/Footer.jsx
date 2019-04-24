import React from 'react';
import '../styles/Footer.css';

function Footer(props) {
  return (
    <footer className="footer bg-dark text-white text-center">
      Copyright &copy; {new Date().getFullYear()} Analytics UI
    </footer>
  );
};

export default Footer