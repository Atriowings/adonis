import React from "react";
import { useOutletContext } from "react-router-dom";

export default function AppliedJobsPage() {
  const { appliedJobs } = useOutletContext();

  return (
    <section>
      <h4>Applied Jobs</h4>
      {appliedJobs.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        appliedJobs.map((a) => (
          <div key={a._id} className="card">
            <div><strong>Company:</strong> {a.companyName}</div>
            <div><strong>Name:</strong> {a.name}</div>
            <div><strong>Designation:</strong> {a.designation}</div>
            <div><strong>Mobile:</strong> {a.mobile}</div>
            <div><strong>Email:</strong> {a.email}</div>
            
          </div>
        ))
      )}
    </section>
  );
}

