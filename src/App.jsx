import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/EntrepreneurDashboardComponents/Sidebar/Sidebar"; 
import TopNavbar from "./components/EntrepreneurDashboardComponents/TopNavbar/TopNavbar"; 
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import EntrepreneurDashboard from "./pages/Dashboard/EntrepreneurDashboard";
import Role from "./pages/RoleSelection/RoleSelection";
import StartupForm from "./components/EntrepreneurDashboardComponents/forms/StartupForm";
import ManpowerForm from "./components/EntrepreneurDashboardComponents/forms/ManpowerForm";
import FundingForm from "./components/EntrepreneurDashboardComponents/forms/FundingForm";
import InvestorDashboard from "./pages/InvestorDashboard/InvestorDashboard";
import Transaction from "./pages/InvestorDashboard/Transaction";
import BrowseStartups from "./pages/InvestorDashboard/BrowseStartups";
import FormPage from "./pages/InvestorDashboard/StartupDetails";
import ManageIdeas from "./pages/ManageIdeas/ManageIdeas";
import ManageInvestments from "./pages/ManageInvestments/ManageInvestments";
import UserProfile from "./pages/UserProfile/UserProfile"
import "./App.css";
import Admin from "./pages/Admin/Admin";

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <Router>
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
              <Route path="/investor-dashboard" element={<InvestorDashboard />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/browse" element={<BrowseStartups />} />
              <Route path="/showDetails" element={<FormPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/manage-ideas" element={<ManageIdeas />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/manage-investment" element={<ManageInvestments />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;