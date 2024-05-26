import React, { useState } from 'react';
import './DropDownMenu.css';
import { Link } from 'react-router-dom'

const DropdownMenu: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div>
      <button className="btnd btn-primary" onClick={toggleMenu}>Toggle Menu</button>
      <div className={`menu-container ${menuVisible ? 'visible' : ''}`}>
        <button id="closeMenu" onClick={closeMenu}>Cerrar</button>
        <ul className="menu">
          <Link to='/Generator' >Generador Contraseñas</Link>
          <Link to='/Grupos' >Grupos</Link>
          <Link to='/Main' >Contraseñas</Link>
          <Link to='/CheckPass' >Seguridad</Link>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
