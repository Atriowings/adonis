import React from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function JobsPage() {
  const context = useOutletContext();

  if (!context) return <p>Loading...</p>; // safety fallback

  const { jobs, fetchJobs, authCfg, API_URL } = context;

  const del = async (id) => {
    if (!window.confirm("Delete job?")) return;
    try {
      await axios.delete(`${API_URL}/api/jobs/${id}`, authCfg);
      fetchJobs();
    } catch {
      alert("Error deleting job");
    }
  };

  return (
    <section>
      <h4>Existing Jobs</h4>
      {jobs.map((j) => (
        <div key={j.id} className="card">
          <div className="job-card-info">
            <div><strong>{j.title}</strong></div>
            <button className="btn danger" onClick={() => del(j.id)}>Delete</button>
          </div>
        </div>
      ))}
    </section>
  );
}
