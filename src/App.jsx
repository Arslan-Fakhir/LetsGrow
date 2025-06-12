import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import UserProfile from "./pages/UserProfile/UserProfile";
import Admin from "./pages/Admin/Admin";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { auth, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/checklogin`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (response.ok && data.ok) {
          login({ userId: data.userId });
          setLoading(false);
        } else {
          toast.error(data.message || 'Session expired. Please log in again.');
          navigate('/login');
        }
      } catch (error) {
        toast.error('Error checking login status.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, [navigate, login]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return auth.user ? children : <Navigate to="/login" replace />;
};

const MainLayout = ({ children, toggleSidebar, sidebarExpanded }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Check if current route is login or signup
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="d-flex">
      {/* Show sidebar only when authenticated and not on auth pages */}
      {auth.user && !isAuthPage && (
        <Sidebar
          sidebarExpanded={sidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
      )}
      
      <div 
        className="flex-grow-1" 
        style={{ 
          marginLeft: auth.user && !isAuthPage ? (sidebarExpanded ? '250px' : '80px') : '0',
          transition: 'margin-left 0.3s ease-in-out'
        }}
      >
        {/* Show navbar only when authenticated and not on auth pages */}
        {auth.user && !isAuthPage && (
          <TopNavbar toggleSidebar={toggleSidebar} />
        )}
        
        <div className="container-fluid py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* All protected routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <MainLayout 
                toggleSidebar={toggleSidebar} 
                sidebarExpanded={sidebarExpanded}
              >
                <Routes>
                  <Route index element={<Role />} />
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
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;