import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Contact from './pages/Contact';
import Candidates from './pages/Candidates';
import About from './pages/About';
import Clients from './pages/clients';
import Services from './pages/Services';
import Footer from './components/Footer'; 
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddJobPage from './components/Admin/AddJobPage';
import JobsPage from './components/Admin/JobsPage';
import AppliedJobsPage from './components/Admin/AppliedJobsPage';
import ContactAppliedPage from './components/Admin/ContactAppliedPage';


export default function App() {

  const location = useLocation();

  // Hide navbar + footer only in admin pages
  const hideLayout = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideLayout && <Navbar />}
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/job/:id" element={<JobDetails />} />
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/clients" element={<Clients />} />
  <Route path="/candidates" element={<Candidates />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />

  <Route path="/admin/dashboard" element={<AdminDashboard />}>
        <Route index element={<JobsPage />} />               {/* default page */}
        <Route path="jobs" element={<JobsPage />} />
        <Route path="add" element={<AddJobPage />} />
        <Route path="applied" element={<AppliedJobsPage />} />
        <Route path="contactapplied" element={<ContactAppliedPage />} />
      </Route>
</Routes>
      {/* </div> */}
      {!hideLayout && <Footer />}  
       {/* ✅ Footer visible in all pages except admin */}
    </>
  );
}
