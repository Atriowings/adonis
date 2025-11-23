import React, { useEffect, useState } from "react";
// import api from "../api";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaPlus, FaUserCheck, FaSignOutAlt } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
// import api from "../api";

import "./AdminDashboard.css";

export default function AdminDashboard() {
 const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [contAppliedJobs, setcontAppliedJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    // company: "",
    // location: "",
    // experience: "",
    // vacancies: 1,
    // description: "",
    applyLink: "",
  });
  const [headerImage, setHeaderImage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const authCfg = { headers: { Authorization: `Bearer ${token}` } };

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      nav("/admin");
      return;
    }
    fetchJobs();
    fetchHeader();
    fetchAppliedJobs();
    contappliedJobs(); // 👈 add this line
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/jobs`, authCfg);
      setJobs(res.data);
    } catch (err) {
      if (err.response?.status === 401) nav("/admin");
    }
  };

  const fetchHeader = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/settings/headerImage`, authCfg);
      // Backend returns the value directly, not wrapped in an object
      setHeaderImage(res.data || "");
    } catch (err) {
      if (err.response?.status === 401) nav("/admin");
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/hiringRequests`, authCfg);
      setAppliedJobs(res.data);
    } catch (err) {
      console.error("Error fetching applied jobs", err);
    }
  };
  const contappliedJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/appliedJobs`, authCfg);
      setcontAppliedJobs(res.data);
    } catch (err) {
      console.error("Error fetching applied jobs", err);
    }
  };
 
  const createJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/jobs`, form, authCfg);
      setForm({
        title: "",
        // company: "",
        // location: "",
        // experience: "",
        // vacancies: 1,
        // description: "",
        applyLink: "",
      });
      fetchJobs();
      setActiveTab("jobs");
    } catch {
      alert("Error creating job");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete job?")) return;
    try {
      await axios.delete(`${API_URL}/api/jobs/${id}`, authCfg);
      fetchJobs();
    } catch{ alert ("Error deleting job")}
  };

  const updateHeader = async () => {
    try {
      await axios.post(`${API_URL}/api/settings/headerImage`, { value: headerImage }, authCfg);
      alert("Header image saved");
    } catch { console.error("Error saving header image")}
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    nav("/admin");
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="admin-dashboard-container">
<div className="mobile-topbar">
  <button className="hamburger-btn" onClick={toggleSidebar}>
    <i className="fas fa-bars"></i>
  </button>
  <h4>Admin Dashboard</h4>
</div>

     <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
  <div className="admin-sidebar-header">Admin Panel</div>
  <div className="menu-section">
    <button
      className={`menu-btn ${activeTab === "jobs" ? "active" : ""}`}
      onClick={() => { setActiveTab("jobs"); setSidebarOpen(false); }}
    >
      <FaBriefcase /> Jobs
    </button>
    <button
      className={`menu-btn ${activeTab === "add" ? "active" : ""}`}
      onClick={() => { setActiveTab("add"); setSidebarOpen(false); }}
    >
      <FaPlus /> Add Job
    </button>
    <button
      className={`menu-btn ${activeTab === "applied" ? "active" : ""}`}
      onClick={() => { setActiveTab("applied"); setSidebarOpen(false); }}
    >
      <FaUserCheck /> Applied Jobs
    </button>
    <button
      className={`menu-btn ${activeTab === "contactapplied" ? "active" : ""}`}
      onClick={() => { setActiveTab("contactapplied"); setSidebarOpen(false); }}
    >
      <FaUserCheck /> Contact Applied
    </button>
  </div>
  <button className="logout-btn-sidebar" onClick={logout}>
    <FaSignOutAlt /> Logout
  </button>
</aside>

      {/* Main content area */}
      <main className="admin-main">
        <h2>Admin Dashboard</h2>

        {activeTab === "add" && (
          <section>
            <h4>Create Job</h4>
            <form onSubmit={createJob}>
              <label htmlFor="Title" style={{ fontSize:12}}>Job Title</label>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              {/* <label htmlFor="Company" style={{ fontSize:12}}>Company Name</label>
              <input
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <label htmlFor="Location" style={{ fontSize:12}}>Job Location</label>
              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <label htmlFor="Experience" style={{ fontSize:12}}>Required Experiences</label>
              <input
                placeholder="Experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
              />
              <label htmlFor="Vacancies" style={{ fontSize:12}}>No of Vacancies</label> */}
              {/* <input
                type="number"
                placeholder="Vacancies"
                value={form.vacancies}
                onChange={(e) =>
                  setForm({ ...form, vacancies: Number(e.target.value) })
                }
              /> */}
              <label htmlFor="link" style={{ fontSize:12}}>Link</label>
              <input
                placeholder="Apply Link"
                value={form.applyLink}
                onChange={(e) => setForm({ ...form, applyLink: e.target.value })}
              />
              {/* <label htmlFor="Description" style={{ fontSize:12}}>Job Description</label> */}
              {/* <textarea
                placeholder="Description"
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              /> */}
              <div  className="admin-form-btn" style={{ marginTop: 8 }}>
                <button className="btn" type="submit">
                  Create Job
                </button>
              </div>
            </form>
          </section>
        )}

        {activeTab === "jobs" && (
          <section>
            <h4>Existing Jobs</h4>
            {jobs.map((j) => (
              <div key={j.id} className="card">
                <div className="job-card-info">
                  <div>
                    <strong>{j.title}</strong>
                    {/* <div className="job-company-loc">
                      {j.title} • {j.applyLink}
                    </div> */}
                  </div>
                  <button
                    className="btn danger"
                    aria-label="delete"
                    onClick={() => del(j.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === "applied" && (
          <section>
            <h4>Applied Jobs</h4>
            {appliedJobs.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              appliedJobs.map((a) => (
                <div key={a.id} className="card">
                  <div><strong>Company:</strong> {a.companyName}</div>
                  <div><strong>Name:</strong> {a.name}</div>
                  <div><strong>Mobile:</strong> {a.mobile}</div>
                  <div><strong>Designation:</strong> {a.designation}</div>
                </div>
              ))
            )}
          </section>
        )}

        {activeTab === "contactapplied" && (
          <section>
            <h4>Contact Applied Jobs</h4>
            {appliedJobs.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              contAppliedJobs.map((a) => (
                <div key={a.id} className="card">
                  <div><strong>Name:</strong> {a.name}</div>
                  <div><strong>Email:</strong> {a.email}</div>
                  <div><strong>Mobile:</strong> {a.mobile}</div>
                  <div><strong>Message:</strong> {a.message}</div>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}
