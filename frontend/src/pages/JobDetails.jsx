import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import "./JobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/jobs/` + id).then((r) => setJob(r.data))
      .catch(() => {});
  }, [id]);

  if (!job)
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading job details...</p>
      </div>
    );

  return (
    <div className="job-details-container container my-5">
      <div className="job-card shadow-sm">
        <div className="job-header">
          <h2 className="job-title">{job.title}</h2>
          <p className="job-company">
            {job.company} • <span>{job.location}</span>
          </p>
        </div>

        <div className="job-meta">
          <span>
            <strong>Experience:</strong> {job.experience || "Not specified"}
          </span>
          <span>
            <strong>Vacancies:</strong> {job.vacancies || "N/A"}
          </span>
        </div>

        <hr />

        <div className="job-description">
          <h5>Job Description</h5>
          <p>{job.description || "No description provided."}</p>
        </div>

        <div className="apply-section">
          <button
            className="apply-btn btn btn-primary"
            onClick={() =>
              window.open(job.applyLink || "#", "_blank", "noopener noreferrer")
            }
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

