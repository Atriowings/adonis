import React from "react";
import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import "./Contact.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      mobile: "",
      message: "",
    });

  // Submit contact form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/appliedJobs`, formData);
      alert("Submitted successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };
  return (
    <section className="contact-wrapper py-5">
      <div className="container">
        <div className="contact-box bg-white rounded-4 shadow-sm p-4 p-md-5">
          <div className="row g-4 align-items-center">
            {/* Left Side */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <h3>Contact Us</h3>
              <p className="cont-p">
                Get in touch with us for any queries or support. We’ll be happy to assist you.
              </p>

              <div className="contact-infos">
                <div className="icon-wrap">
                  <FaMapMarkerAlt className="contact-icon text-primary" />
                </div>
                <div className="contact-infosContent">
                  <h6>Address :</h6>
                  <p>
                    No 117/261, Kilpauk Garden Main Road, Kilpauk, Chennai, Tamilnadu, India - 600 010.
                  </p>
                </div>
              </div>

              <div className="contact-infos">
                <div className="icon-wrap">
                  <FaEnvelope className="contact-icon text-primary" />
                </div>
                <div className="contact-infosContent">
                  <h6>Email :</h6>
                  <p>elvin@adonisstaff.in</p>
                </div>
              </div>

              <div className="contact-infos">
                <div className="icon-wrap">
                  <FaPhoneAlt className="contact-icon text-primary" />
                </div>
                <div className="contact-infosContent">
                  <h6>Phone :</h6>
                  <p>+91 98409 54819(For Client Only)</p>
                </div>
              </div>

              <div className="contact-infos">
                <div className="icon-wrap">
                  <FaClock className="contact-icon text-primary" />
                </div>
                <div className="contact-infosContent">
                  <h6>Working Hours :</h6>
                  <p>Mon – Sat (10.00 AM – 05.30 PM)</p>
                </div>
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="contact-box-contact">
              <div className="contact-box-top">
                <h2>Contact For Your Hiring Needs</h2>
                <p>Need to close your critical positions!!! Please enter basic details below. We will get back and let us work together..</p>
              </div>
              
                <form className="contact-formss" onSubmit={handleSubmit}>
                  <input placeholder="Name" value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            } required />
                  <input placeholder="Email" value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            } required />
                  <input placeholder="Phone" value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            } />
                  <textarea placeholder="Message" rows={6} value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            } required />
                  <div style={{marginTop:8}}><button className="btn" type="submit">Send</button></div>
                </form>
                {/* {status && <div style={{marginTop:8}}>{status}</div>} */}
            </div>
            </div>
        </div>
      </div>
        

        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <div className="map-frame rounded-4 overflow-hidden shadow-sm">
            <iframe
                  title="Kilpauk Garden Road Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.1804598531193!2d80.23498457482207!3d13.077726587251143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265eb1df0bcd7%3A0x93e0b830e4e14a27!2sKilpauk%20Garden%20Road!5e0!3m2!1sen!2sin!4v1712579609183!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
