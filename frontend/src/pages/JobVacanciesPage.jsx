import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaBuilding, FaUser, FaMobileAlt, FaBriefcase, FaSearch } from "react-icons/fa";

const JobVacanciesPage = () => {
  const [search, setSearch] = useState("");

  const jobs = [
    { id: 1, title: "Manager - NPD / Program Manager", company: "Injection Molding Auto MNC", salary: "15LPA Max" },
    { id: 2, title: "Executive - Finance", company: "Tier1 Auto MNC @ Hosur", salary: "4LPA Max" },
    { id: 3, title: "AM / DM - Purchase", company: "HoD For European Tier1 Auto MNC @ Chennai", salary: "12LPA Max" },
  ];

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="job-page">
      {/* Top Header */}
      <div className="top-bar d-flex flex-column flex-md-row justify-content-between align-items-center text-white px-4 py-2">
        <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
          <span><FaEnvelope className="me-2" /> elvin@adonisstaff.in</span>
          <span><FaPhone className="me-2" /> +91 98409 54819</span>
        </div>
        <div>
          Follow Us :
          <FaLinkedin className="ms-2" />
        </div>
      </div>

      {/* Navbar */}
      <div className="navbar-section d-flex flex-column flex-md-row justify-content-between align-items-center px-4 py-3 bg-white shadow-sm">
        <img src="https://via.placeholder.com/120x40?text=Adonis+Logo" alt="Logo" height="40" className="mb-2 mb-md-0" />
        <nav className="nav gap-4 fw-medium">
          <a href="#" className="nav-link text-dark">Home</a>
          <a href="#" className="nav-link text-dark">About Us</a>
          <a href="#" className="nav-link text-dark">Services</a>
          <a href="#" className="nav-link text-dark">Candidates</a>
          <a href="#" className="nav-link text-dark">Our Client</a>
          <a href="#" className="nav-link text-dark">Contact</a>
        </nav>
      </div>

      {/* Main Section */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Hot Vacancies Section */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header text-white d-flex align-items-center gap-2" style={{ backgroundColor: "#1E3A8A" }}>
                <FaBriefcase />
                <h5 className="mb-0">Hot Vacancies For Candidates</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Looking for the next big career break!!! Get access to opportunities with companies across India and abroad. Let us support you..
                </p>

                {/* Search */}
                <div className="position-relative mb-4">
                  <FaSearch className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Search vacancies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Job Listings */}
                <div className="d-flex flex-column gap-3">
                  {filteredJobs.map((job, index) => (
                    <div key={job.id} className="border rounded-3 p-3 d-flex align-items-start gap-3 job-card">
                      <div className="badge-circle">{index + 1}</div>
                      <div>
                        <h6 className="fw-semibold mb-1">{job.title}</h6>
                        <p className="text-muted small mb-1">{job.company}</p>
                        <p className="text-primary small fw-semibold mb-0">{job.salary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header text-white d-flex align-items-center gap-2" style={{ backgroundColor: "#0D9465" }}>
                <FaEnvelope />
                <h5 className="mb-0">Contact For Hiring Needs</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Need to close your critical positions!!! Please enter basic details below. We will get back and let us work together..
                </p>

                <form className="d-flex flex-column gap-3">
                  <div className="position-relative">
                    <FaBuilding className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
                    <input type="text" className="form-control ps-5" placeholder="Company Name" />
                  </div>
                  <div className="position-relative">
                    <FaUser className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
                    <input type="text" className="form-control ps-5" placeholder="Enter Name" />
                  </div>
                  <div className="position-relative">
                    <FaMobileAlt className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
                    <input type="text" className="form-control ps-5" placeholder="Enter Mobile Number" />
                  </div>
                  <div className="position-relative">
                    <FaBriefcase className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
                    <input type="text" className="form-control ps-5" placeholder="Your Designation" />
                  </div>
                  <button type="submit" className="btn text-white fw-semibold" style={{ backgroundColor: "#0D9465" }}>
                    Submit Hiring Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobVacanciesPage;
