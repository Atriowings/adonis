// import React from "react";
// import "./About.css";

// export default function About() {
//   return (
//     <main className="about-container">
      
     
//       <section className="hero-section fade-in">
//         <h1>Adonis Jobs</h1>
//         <p>Your career, our mission. Bringing top talent and companies together.</p>
//       </section>

      
//       <section className="content-section slide-up">
//         <h2>Our Mission</h2>
//         <p>
//           We strive to provide the best platform for job seekers and employers by bridging opportunities with talent in an honest and trustworthy environment.
//         </p>
//       </section>

      
//       <section className="content-section slide-left">
//         <h2>Our Values</h2>
//         <ul>
//           <li>Integrity & Transparency</li>
//           <li>Innovation & Excellence</li>
//           <li>User-Centered Experience</li>
//           <li>Diversity & Inclusion</li>
//         </ul>
//       </section>

      
//       <section className="content-section slide-right features">
//         <h2>Why Choose Us?</h2>
//         <div className="feature-cards">
//           <div className="feature-card">
//             <h3>Simple & Clean</h3>
//             <p>Easy to navigate job listings and applications with a modern interface.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Trustworthy</h3>
//             <p>Verified jobs and candidates to ensure quality and security.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Always Support</h3>
//             <p>Assistance at every stage for employers and candidates.</p>
//           </div>
//         </div>
//       </section>

    
//       <section className="content-section fade-in-up team">
//         <h2>Meet Our Team</h2>
//         <div className="team-members">
//           <div className="team-member">
//             <h3>Jane Doe</h3>
//             <p>CEO & Founder</p>
//           </div>
//           <div className="team-member">
//             <h3>John Smith</h3>
//             <p>Head of Recruitment</p>
//           </div>
//           <div className="team-member">
//             <h3>Emily Johnson</h3>
//             <p>Lead Developer</p>
//           </div>
//         </div>
//       </section>

     
//       <section className="content-section slide-up testimonials">
//         <h2>What Our Users Say</h2>
//         <div className="testimonial-cards">
//           <div className="testimonial-card">
//             <p>"Adonis Jobs helped me land my dream job in just two weeks!"</p>
//             <h4>- Rahul K.</h4>
//           </div>
//           <div className="testimonial-card">
//             <p>"The platform is clean, intuitive, and trustworthy."</p>
//             <h4>- Priya S.</h4>
//           </div>
//           <div className="testimonial-card">
//             <p>"Our company found top talent through Adonis Jobs easily."</p>
//             <h4>- Tech Corp HR</h4>
//           </div>
//         </div>
//       </section>

      
//       <section className="content-section fade-in-up contact">
//         <h2>Contact Us</h2>
//         <p>Have questions? Reach out and we'll be happy to assist you.</p>
//         <form className="contact-form">
//           <input type="text" placeholder="Your Name" required />
//           <input type="email" placeholder="Your Email" required />
//           <textarea placeholder="Your Message" required></textarea>
//           <button type="submit">Send Message</button>
//         </form>
//       </section>

//     </main>
//   );
// }

import React from "react";
import { Box, Typography, Button, useMediaQuery, Paper } from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import "./About.css";

export default function AboutUs() {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <>
    <Box sx={{ width: "100%", p: 0, m: 0 }}>
      {/* Top Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: "center",
          color: "#fff",
          background: "linear-gradient(135deg, #0b3c91, #004aad)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2rem", md: "2rem" , lg: "2rem"} }}
          >
            Your Trusted HR Partner
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              mt: 2,
              opacity: 0.9,
              fontSize: { xs: "1rem", md: "1.25rem", lg:"1.25rem" },
            }}
          >
            Leading player in the HR Industry for Recruitment, Executive Search, Contractual Staffing – Staff Category, Payroll Services etc with proven expertise in Automotive, EMS, FMCG, FMCD and Manufacturing at large…..
          </Typography>
        </motion.div>
      </Box>
    </Box>
      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container">
          {/* <h3 className="section-subtitle">WHO WE ARE</h3>
          <h2 className="section-title">Adonis Infinite Resources</h2> */}

          <p>
            Having started in 2006, we (Adonis Recruitment Consultants Private
            Limited – Search Services and Recruitment and Adonis Staff Services
            Private Limited – Temp Staffing, Payroll Processing and HR Support
            Services) have emerged as a leading player in the HR industry with
            dedicated focus on Automotive and Auto Components, FMCG & FMCD,
            Electronics Manufacturing Services (EMS), Industrial Products,
            Engineering, Heavy Infrastructure and manufacturing at large, and
            at the same time with specific clients across other Industry
            Verticals like IT & ITeS, e-Commerce, Pharmaceuticals & Healthcare,
            Hospitality, Retail & Services and many more.
          </p>

          <p>
            During this short span we had the privilege of working with top
            global brands and Fortune 500 firms across levels from Managing
            Director to GETs and could create a name for us among the Automotive,
            FMCG and other Manufacturing sectors across Indian job market.
          </p>

          <p>
            Apart from our dedicated focus on the selective business verticals
            and the long-term business rapport with our clients, our team,
            majority of them with us since our initial days are the key factors
            for our success so far.
          </p>

          <p>
            Whether you are Senior Professional looking for the next career move
            or an Organization looking for the right and skillful talents,
            please contact us and we will be your best bet and support.
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title center">Our Services</h2>
          <p className="section-desc">
            Comprehensive HR solutions tailored to your business needs
          </p>

          <div className="services-grid">
            <div className="service-card col-lg-4 col-md-4 col-sm-12">
              <div className="icon">👥</div>
              <h3>Recruitment Services</h3>
              <p>
                Expert recruitment solutions for all levels from Managing
                Director to Graduate Engineer Trainees.
              </p>
            </div>

            <div className="service-card col-lg-4 col-md-4 col-sm-12">
              <div className="icon">🔄</div>
              <h3>Temp Staffing</h3>
              <p>
                Flexible temporary staffing solutions to meet your dynamic
                business requirements.
              </p>
            </div>

            <div className="service-card col-lg-4 col-md-4 col-sm-12">
              <div className="icon">💼</div>
              <h3>HR Support Services</h3>
              <p>
                Comprehensive HR support including payroll processing and
                administrative services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-sectionss">
        <div className="container">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-desc">
            Ready to find the perfect talent for
            your organization?
          </p>

          <div className="contact-grid">
            <div className="contact-item col-lg-3 col-md-3 col-sm-12">
              <div className="icon">📞</div>
              <h4>Call Us</h4>
              <p>+91 98409 54819</p>
            </div>

            <div className="contact-item col-lg-3 col-md-3 col-sm-12">
              <div className="icon">✉️</div>
              <h4>Email Us</h4>
              <p>elvin@adonisstaff.in</p>
            </div>

            <div className="contact-item col-lg-3 col-md-3 col-sm-12">
              <div className="icon">📍</div>
              <h4>Visit Us</h4>
              <p>
                No 117/26J, Kilpauk Garden Main Road <br />
                Kilpauk, Chennai – 600 010.
              </p>
            </div>

            <div className="contact-item col-lg-3 col-md-3 col-sm-12">
              <div className="icon">⏰</div>
              <h4>Working Hours</h4>
              <p>Mon – Sat (10.00AM – 05.30PM)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
