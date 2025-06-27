import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/Sidebar/Sidebar"; 
import TopNavbar from "./components/TopNavbar/TopNavbar"; 
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
// Entrepreneur imports
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard/EntrepreneurDashboard";
import MyStartup from "./pages/MyStartup/StartupPage";
import StartupForm from "./components/Entrepreneur/forms/StartupForm";
import ManpowerForm from "./components/Entrepreneur/forms/ManpowerForm";
import MyStartupDetails from "./pages/MyStartup/MyStartupDetails";
import EditStartupForm from "./pages/MyStartup/EditStartupForm";
// Investor imports
import InvestorDashboard from "./pages/InvestorDashboard/InvestorDashboard";
import Transaction from "./pages/InvestorDashboard/Transaction";
import BrowseStartups from "./pages/InvestorDashboard/BrowseStartups";
import StartupDetailsPage from "./pages/InvestorDashboard/StartupDetails";
import ManageIdeas from "./pages/ManageIdeas/ManageIdeas";
import ManageInvestments from "./pages/ManageInvestments/ManageInvestments";
import UserProfile from "./pages/UserProfile/UserProfile";
import Admin from "./pages/Admin/Admin";
import Success from "./pages/InvestorDashboard/PaymentSuccess";
import Cancel from "./pages/InvestorDashboard/PaymentCancel";
import InvestorPortfolio from "./pages/InvestorPortfolio/InvestorPortfolio"

import Chatbot from "./pages/Chatbot/Chatbot";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext"; // Make sure this path is correct
import "./App.css";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { auth, isAdmin, isEntrepreneur, isInvestor } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (auth.loading) return;

    if (!auth.user) {
      navigate('/login', { state: { from: location }, replace: true });
      return;
    }

    const hasRequiredRole = allowedRoles.some(role => {
      if (role === 'admin') return isAdmin();
      if (role === 'entrepreneur') return isEntrepreneur();
      if (role === 'investor') return isInvestor();
      return false;
    });

    if (!hasRequiredRole) {
      const defaultRoute = isAdmin() ? '/admin' :
                         isEntrepreneur() ? '/dashboard' :
                         '/investor-dashboard';
      toast.error('You do not have permission to access this page');
      navigate(defaultRoute, { replace: true });
    }

    setCheckedAuth(true);
  }, [auth, allowedRoles, isAdmin, isEntrepreneur, isInvestor, location, navigate]);

  if (auth.loading || !checkedAuth) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return children;
};

const MainLayout = ({ children, toggleSidebar, sidebarExpanded }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="d-flex">
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
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={5000} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/*" element={
              <MainLayout 
                toggleSidebar={toggleSidebar} 
                sidebarExpanded={sidebarExpanded}
              >
                <Routes>
                  {/* Entrepreneur Routes */}
                  <Route path="/dashboard" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur']}>
                      <EntrepreneurDashboard />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/apply-startup" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur']}>
                      <StartupForm />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/request-manpower" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur']}>
                      <ManpowerForm />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/my-startup" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur']}>
                      <MyStartup />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/my-startup-details/:id" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur']}>
                      <MyStartupDetails />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/edit-startup/:id" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur']}>
                      <EditStartupForm/>
                    </RoleProtectedRoute>
                  } />

                  {/* Investor Routes */}
                  <Route path="/investor-dashboard" element={
                    <RoleProtectedRoute allowedRoles={['investor']}>
                      <InvestorDashboard />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/transaction" element={
                    <RoleProtectedRoute allowedRoles={['investor']}>
                      <Transaction />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/browseStartups" element={
                    <RoleProtectedRoute allowedRoles={['investor']}>
                      <BrowseStartups />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/viewDetails/:id" element={
                    <RoleProtectedRoute allowedRoles={['investor']}>
                      <StartupDetailsPage />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/success" element={
                    <RoleProtectedRoute allowedRoles={['investor']}>
                      <Success />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/cancel" element={
                    <RoleProtectedRoute allowedRoles={['investor']}>
                      <Cancel />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/investor-portfolio" element={
                    <RoleProtectedRoute allowedRoles={['investor']}>
                      <InvestorPortfolio/>
                    </RoleProtectedRoute>
                  } />

                  {/* Admin Routes */}
                  <Route path="/admin" element={
                    <RoleProtectedRoute allowedRoles={['admin']}>
                      <Admin />
                    </RoleProtectedRoute>
                  } />

                  {/* Shared Routes */}
                  <Route path="/manage-ideas" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur', 'admin']}>
                      <ManageIdeas />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/user-profile" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur', 'investor', 'admin']}>
                      <UserProfile />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/chatbot" element={
                    <RoleProtectedRoute allowedRoles={['entrepreneur', 'investor',]}>
                      <Chatbot/>
                    </RoleProtectedRoute>
                  } />
                  <Route path="/manage-investment" element={
                    <RoleProtectedRoute allowedRoles={['investor', 'admin']}>
                      <ManageInvestments />
                    </RoleProtectedRoute>
                  } />
                </Routes>
              </MainLayout>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;