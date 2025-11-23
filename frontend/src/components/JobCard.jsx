// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function JobCard({ job }){
//   const navigate = useNavigate();
//   return (
//     <div className="card">
//       <h3>{job.title}</h3>
//       <div className="meta">{job.company} • {job.location}</div>
//       <div className="meta">Experience: {job.experience} • Vacancies: {job.vacancies}</div>
//       <p style={{color:'var(--muted)', minHeight:40}}>{job.description?.slice(0,120)}{job.description?.length>120?'...':''}</p>
//       <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
        
//         <button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.06)',color:'var(--muted)',padding:'6px 10px',borderRadius:8}} onClick={()=>navigate(`/job/${job._id}`)}>Details</button>
//         <button className="btn" onClick={() => window.open(job.applyLink || '#', '_blank')}>Apply / Open</button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaBuilding } from "react-icons/fa";
import './JobCard.css';

export default function JobCard({ job }) {
  // const navigate = useNavigate();

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        {/* <span className="job-company">
          <FaBuilding size={14} style={{ marginRight: 6 }} />
          {job.company}
        </span> */}
      </div>

      {/* <div className="job-meta">
        <span>
          <FaMapMarkerAlt size={12} style={{ marginRight: 6 }} />
          {job.location}
        </span>
        <span>
          <FaBriefcase size={12} style={{ marginRight: 6 }} />
          Exp: {job.experience} yrs
        </span>
        <span>Vacancies: {job.vacancies}</span>
      </div> */}

      {/* <p className="job-desc">
        {job.description?.slice(0, 100)}{job.description?.length > 100 ? '...' : ''}
      </p> */}

      <div className="job-actions">
       

        <button
          className="btn-primary"
          onClick={() => window.open(job.applyLink || '#', '_blank')}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
 {/* <button
          className="btn-outline"
          onClick={() => navigate(`/job/${job._id}`)}
        >
          Details
        </button> */}
