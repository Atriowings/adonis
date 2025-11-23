import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/adonis-logo.jpg"; // adjust path if needed

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Description */}
        <div className="footer-section col-lg-4 col-md-4 col-sm-12">
          <img src={logo} alt="Adonis Logo" className="footer-logo" />
          <p className="footer-desc">
            Your trusted career partner. Connecting top talent with leading companies across India and abroad.
          </p>
          <div className="social-icons">
            {/* <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a> */}
            <a href="https://in.linkedin.com/company/adonis-staff-services" target="_blank"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section col-lg-4 col-md-12 col-sm-12">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/candidates">Candidates</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section col-lg-4 col-md-12 col-sm-12">
          <h4>Contact Info</h4>
          <p><FaEnvelope /> &nbsp; elvin@adonisstaff.in</p>
          <p><FaPhoneAlt /> &nbsp; +91 98409 54819(For Client Only)</p>
          <p><FaMapMarkerAlt /> &nbsp; No 117/261, Kilpauk Garden Main Road, Kilpauk, Chennai,
              Tamilnadu, India - 600 010.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Adonis Staff. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
