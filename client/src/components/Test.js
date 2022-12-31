import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import'./Test.scss';

function NavigationMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navigation-menu">
      <a href="#" className="navigation-menu-logo">Logo</a>
      <button
        className="navigation-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Menu
      </button>
      <ul className={`navigation-menu-items ${menuOpen ? 'open' : ''}`}>
        <li className="navigation-menu-item">
          <a href="#" className="navigation-menu-link">Home</a>
        </li>
        <li className="navigation-menu-item">
          <a href="#" className="navigation-menu-link">Shop</a>
        </li>
        <li className="navigation-menu-item">
          <a href="#" className="navigation-menu-link">About</a>
        </li>
        <li className="navigation-menu-item">
          <a href="#" className="navigation-menu-link">Contact</a>
        </li>
      </ul>
      <div className="navigation-menu-buttons">
        <button className="navigation-menu-button">Login</button>
        <a href="#" className="navigation-menu-cart">
          <FaShoppingCart />
        </a>
      </div>
    </nav>
  );
}

export default NavigationMenu;
