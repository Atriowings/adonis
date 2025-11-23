import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import "./Nav.css";
import logo from "../assets/adonis-logo.jpg"; // ✅ import your image

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="topbar">
        <div className="topbar-container">
          <div className="topbar-left">
            <span><FaEnvelope /> elvin@adonisstaff.in</span>
            <span><FaPhone /> +91 98409 54819</span>
          </div>
          <div className="topbar-right">
            <span>Follow Us :</span>
              <a href="https://in.linkedin.com/company/adonis-staff-services" target="_blank" rel="noreferrer">
               <FaLinkedin />
              </a>
          </div>
        </div>
      </div>


      {/* ===== Main Navbar ===== */}
      <nav className="navbar-container">
        <div className="navbar">
          {/* Logo / Brand */}
          <div className="brand">
            <img src={logo} className="logo"/>
          </div>

          {/* Hamburger Button */}
          <button
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          {/* Nav Links */}
          <div className={`navlinks ${menuOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/candidates">Candidates</Link>
            <Link to="/clients">Clientele</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin" >Admin Login</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
