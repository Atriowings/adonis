// src/components/Admin/AdminNavbar.jsx
// import React from "react";

// export default function AdminNavbar({ toggleSidebar }) {
//   return (
//     <div className="admin-navbar">
//       <button onClick={toggleSidebar} className="hamburger-btn">
//         ☰
//       </button>
//       <h4>Admin Dashboard</h4>
//     </div>
//   );
// }

import React from "react";

export default function AdminNavbar({ toggleSidebar }) {
  return (
    <div className="mobile-topbar">
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <h4>Admin Dashboard</h4>
    </div>
  );
}
