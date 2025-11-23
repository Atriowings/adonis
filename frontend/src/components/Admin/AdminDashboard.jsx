// // src/components/AdminDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdminNavbar from "./AdminNavbar";
// import AdminSidebar from "./AdminSidebar";
// import "./AdminDashboard.css";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function AdminDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [activeTab, setActiveTab] = useState("jobs");

//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [contAppliedJobs, setContAppliedJobs] = useState([]);

//   const nav = useNavigate();
//   const token = localStorage.getItem("token");
//   const authCfg = { headers: { Authorization: `Bearer ${token}` } };

//   useEffect(() => {
//     if (!token) nav("/admin");
//     fetchJobs();
//     fetchAppliedJobs();
//     fetchContactApplied();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/jobs`, authCfg);
//       setJobs(res.data);
//     } catch (err) {
//       if (err.response?.status === 401) nav("/admin");
//     }
//   };

//   const fetchAppliedJobs = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/hiringRequests`, authCfg);
//       setAppliedJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching applied jobs", err);
//     }
//   };

//   const fetchContactApplied = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/appliedJobs`, authCfg);
//       setContAppliedJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching contact applied jobs", err);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     nav("/admin");
//   };

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <div className="admin-dashboard-container">
//       <AdminNavbar toggleSidebar={toggleSidebar} />
//       {/* <AdminSidebar
//         sidebarOpen={sidebarOpen}
//         toggleSidebar={() => setSidebarOpen(false)}
//         logout={logout}
//       /> */}
//       <AdminSidebar
//   activeTab={activeTab}
//   setActiveTab={setActiveTab} // 👈 must be passed here
//   sidebarOpen={sidebarOpen}
//   logout={logout}
// />

//       <main className="admin-main">
//         <h2>Admin Dashboard</h2>
//         {/* Nested Route Outlet */}
//         <Outlet
//           context={{
//             API_URL,
//             authCfg,
//             jobs,
//             setJobs,
//             appliedJobs,
//             contAppliedJobs,
//             fetchJobs,
//             fetchAppliedJobs,
//             fetchContactApplied,
//           }}
//         />
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [contAppliedJobs, setContAppliedJobs] = useState([]);

  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const authCfg = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) nav("/admin");
    fetchJobs();
    fetchAppliedJobs();
    fetchContactApplied();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/jobs`, authCfg);
      setJobs(res.data);
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

  const fetchContactApplied = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/appliedJobs`, authCfg);
      setContAppliedJobs(res.data);
    } catch (err) {
      console.error("Error fetching contact applied jobs", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav("/admin");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="admin-dashboard-container">
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar sidebarOpen={sidebarOpen} logout={logout} />

      <main className="admin-main">
        <h2>Admin Dashboard</h2>

        {/* Nested routes rendered here */}
        <Outlet
  context={{
    API_URL,
    authCfg,
    jobs,
    setJobs,
    appliedJobs,
    contAppliedJobs,
    fetchJobs,
    fetchAppliedJobs,
    fetchContactApplied,
  }}
/>

      </main>
    </div>
  );
}

