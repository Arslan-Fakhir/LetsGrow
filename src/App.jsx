import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/EntrepreneurDashboardComponents/Sidebar/Sidebar"; 
import TopNavbar from "./components/EntrepreneurDashboardComponents/TopNavbar/TopNavbar"; 
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import EntrepreneurDashboard from "./pages/Dashboard/EntrepreneurDashboard";
import Role from "./pages/RoleSelection/RoleSelection";
import StartupForm from "./components/EntrepreneurDashboardComponents/forms/StartupForm";
import ManpowerForm from "./components/EntrepreneurDashboardComponents/forms/ManpowerForm";
import FundingForm from "./components/EntrepreneurDashboardComponents/forms/FundingForm";


function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <BrowserRouter>
      <div className="d-flex">
        <Sidebar
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
          sidebarExpanded={sidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-grow-1" style={{ 
          marginLeft: sidebarExpanded ? '250px' : '80px',
          transition: 'margin-left 0.3s ease-in-out'
        }}>
          <TopNavbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid py-4">
            <Routes>
              <Route index element={<Role />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<EntrepreneurDashboard />} />
              <Route path="/apply-startup" element={<StartupForm />} />
              <Route path="/request-manpower" element={<ManpowerForm />} />
              <Route path="/apply-funding" element={<FundingForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
