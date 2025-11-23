// src/components/AdminSidebar.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function AdminSidebar({ sidebarOpen, toggleSidebar, logout }) {
//   const location = useLocation();

//   const activeClass = (path) =>
//     location.pathname === path ? "active" : "";

//   return (
//     <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
//       <button className="close-btn" onClick={toggleSidebar}>×</button>
//       <nav>
//         <ul>
//           <li><Link to="/admin/add" className={activeClass("/admin/add")}>Add Job</Link></li>
//           <li><Link to="/admin/jobs" className={activeClass("/admin/jobs")}>Jobs</Link></li>
//           <li><Link to="/admin/applied" className={activeClass("/admin/applied")}>Applied Jobs</Link></li>
//           <li><Link to="/admin/contactapplied" className={activeClass("/admin/contactapplied")}>Contact Applied</Link></li>
//         </ul>
//         <button onClick={logout} className="btn logout">Logout</button>
//       </nav>
//     </aside>
//   );
// }

// src/components/Admin/AdminSidebar.jsx
import React from "react";
import { FaBriefcase, FaPlus, FaUserCheck, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ sidebarOpen, logout }) {
  const nav = useNavigate();

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="admin-sidebar-header">Admin Panel</div>

      <div className="menu-section">
        <button className="menu-btn" onClick={() => nav("/admin/dashboard/jobs")}>
          <FaBriefcase /> Jobs
        </button>

        <button className="menu-btn" onClick={() => nav("/admin/dashboard/add")}>
          <FaPlus /> Add Job
        </button>

        <button className="menu-btn" onClick={() => nav("/admin/dashboard/applied")}>
          <FaUserCheck /> Applied Jobs
        </button>

        <button className="menu-btn" onClick={() => nav("/admin/dashboard/contactapplied")}>
          <FaUserCheck /> Contact Applied
        </button>
      </div>

      <button className="logout-btn-sidebar" onClick={logout}>
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}
