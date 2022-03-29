import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './Navbar.css'
import Logo from '../assets/icon.svg'


function Navbar() {

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="dojo logo" />
          <span>Groupomania</span>
        </li>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>

        {/* <li><Link to="/">Dashboard</Link></li> */}

        <li>
          <button className="btn">Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
