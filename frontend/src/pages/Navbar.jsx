import React, { useState } from "react";
import "../styling/navbar.css";
import ThemeToggle from "./ThemeToggle";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" >RESUME AI</div>

      {/* Hamburger Icon (only shows on small screens via CSS) */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className={isOpen ? "line open" : "line"}></span>
        <span className={isOpen ? "line open" : "line"}></span>
        <span className={isOpen ? "line open" : "line"}></span>
      </div>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li><a href="/Home" onClick={toggleMenu}>Home</a></li>
        <li><a href="/Resume" onClick={toggleMenu}>Resume</a></li>
        <li><a href="/Services" onClick={toggleMenu}>Services</a></li>
        <li><a href="/About" onClick={toggleMenu}>About</a></li>
        <li><a href="/Contact" onClick={toggleMenu}>Contact</a></li>
      </ul>
      <ThemeToggle/>
  
    </nav>
  );
};

export default Navbar;
