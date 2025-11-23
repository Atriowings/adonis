import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import "./Home.css";

export default function Candidates() {
const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [formData, setFormData] = useState({
  //   companyName: "",
  //   name: "",
  //   mobile: "",
  //   designation: "",
  //   email: "",
  // });

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/jobs`);
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Search jobs
  const handleSearchChange = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchQuery(val);

    if (!val) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(val)
          // job.company.toLowerCase().includes(val) ||
          // (job.location && job.location.toLowerCase().includes(val)) ||
          // (job.designation && job.designation.toLowerCase().includes(val))
      );
      setFilteredJobs(filtered);
    }
  };

  // Submit contact form
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(`${API_URL}/api/hiringRequests`, formData);
  //     alert("Submitted successfully!");
  //     setFormData({
  //       companyName: "",
  //       name: "",
  //       mobile: "",
  //       designation: "",
  //       email: "",
  //     });
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("Something went wrong!");
  //   }
  // };

  return (
    <div className="home-container">
      <div className="container-fluid">
      {/* Left Jobs Section */}
      <div className="jobs-section">
        <div className="jobs-header">
          <h2>Hot Vacancies For Candidates</h2>
          <p>
            Looking for the next big career break? Get access to opportunities
            with companies across India and abroad.
          </p>
        </div>

        <div className="searchbar">
          <input
            type="text"
            placeholder="Search jobs by title.."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Scrollable Jobs List */}
        <div className="jobs-list scrollable">
          {filteredJobs.length === 0 ? (
            <div className="no-jobs">No jobs found</div>
          ) : (
            filteredJobs.map((job, idx) => (
              <JobCard key={job._id} job={job} index={idx} />
            ))
          )}
        </div>
      </div>

      {/* Right Contact Section */}
      {/* <div className="contact-section">
        <div className="contact-header">
          <h2>Contact For Hiring Needs</h2>
          <p>
            Need to close your critical positions!!! Please enter basic details below. We will get back and let us work together..
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            required
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label htmlFor="mobile">Mobile No</label>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
          />
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            placeholder="Your Designation"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
            required
          />
          <button type="submit">Submit Hiring Request</button>
        </form>
      </div> */}
      </div>
    </div>
  );
}
