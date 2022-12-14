import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../../custom hooks/useUser';
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import "./styles/Navbar.scss"
import { useSelector } from 'react-redux';

function Navbar() {
    const user = useUser();
    const navigate = useNavigate();
    const [menuIcon, setMenuIcon] = useState();
    let { total_item } = useSelector((state) => state.cart);

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    
  return (
    <header id="MainNav">
        <NavLink to="/">
            <h2>A-Plus</h2>
        </NavLink>
        <nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Contact
            </NavLink>
          </li>

          {user && <NavLink to="/profile"><p>{user.firstname}</p></NavLink>}

          {user ? (
            <li>
              <button className='btn' onClick={logOut}>
                Log Out
              </button>
            </li>
          ) : (
            <li>
              <button className='btn' onClick={() => navigate('/login')}>Log In</button>
            </li>
          )}

          <li>
            <NavLink to="/cart" className="navbar-link cart-trolley--link">
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item"> {total_item} </span>
            </NavLink>
          </li>
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </nav>
    </header>
  )
}

export default Navbar