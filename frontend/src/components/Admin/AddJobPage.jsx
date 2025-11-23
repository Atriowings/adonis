import React, { useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function AddJobPage() {
  const { API_URL, authCfg, fetchJobs } = useOutletContext();
  const [form, setForm] = useState({ title: "", applyLink: "" });

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/jobs`, form, authCfg);
      setForm({ title: "", applyLink: "" });
      fetchJobs();
      alert("Job created successfully!");
    } catch {
      alert("Error creating job");
    }
  };

  return (
    <section>
      <h4>Create Job</h4>
      <form onSubmit={createJob}>
        <label htmlFor="Title" style={{ fontSize: 12 }}>Job Title</label>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <label htmlFor="link" style={{ fontSize: 12 }}>Link</label>
        <input
          placeholder="Apply Link"
          value={form.applyLink}
          onChange={(e) => setForm({ ...form, applyLink: e.target.value })}
        />

        <div className="admin-form-btn" style={{ marginTop: 8 }}>
          <button className="btn" type="submit">Create Job</button>
        </div>
      </form>
    </section>
  );
}
