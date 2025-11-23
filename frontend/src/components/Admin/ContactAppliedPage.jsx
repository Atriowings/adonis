import React from "react";
import { useOutletContext } from "react-router-dom";

export default function ContactAppliedPage() {
  const { contAppliedJobs } = useOutletContext();

  return (
    <section>
      <h4>Contact Applied Jobs</h4>
      {contAppliedJobs.length === 0 ? (
        <p>No contact applications yet</p>
      ) : (
        contAppliedJobs.map((a) => (
          <div key={a._id} className="card">
            <div><strong>Name:</strong> {a.name}</div>
            <div><strong>Email:</strong> {a.email}</div>
            <div><strong>Mobile:</strong> {a.mobile}</div>
            <div><strong>Message:</strong> {a.message}</div>
          </div>
        ))
      )}
    </section>
  );
}

