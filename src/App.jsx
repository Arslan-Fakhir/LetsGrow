import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import TopNavbar from "./components/TopNavbar";
// import Home from "./pages/HomePage/HomePage";
//import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Role from "./pages/RoleSelection/RoleSelection";
import ManageIdeas from "./pages/ManageIdeas/ManageIdeas";
import ManageInvestments from "./pages/ManageInvestments/ManageInvestments";
// import Admin from "./pages/Admin/Admin"
//import Sidebar from "./components/Sidebar";
import Admin from "./pages/Admin/Admin";
//import { Sidebar } from "lucide-react";
//import './assets/GlobalDashboard.css';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <main className="flex-grow-1">
          <Routes>
            <Route index element={<Role />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/manage-ideas" element={<ManageIdeas />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-investment" element={<ManageInvestments />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
