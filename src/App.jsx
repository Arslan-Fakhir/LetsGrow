import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Navbar from "./components/Navbar";
//import Home from "./pages/HomePage/HomePage";
//import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import EntrepreneurDashboard from "./pages/Dashboard/EntrepreneurDashboard";
import Role from "./pages/RoleSelection/RoleSelection";
import StartupForm from "./components/EntrepreneurDashboardComponents/forms/StartupForm"
import ManpowerForm from "./components/EntrepreneurDashboardComponents/forms/ManpowerForm"
import FundingForm from "./components/EntrepreneurDashboardComponents/forms/FundingForm";

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        {/*<Navbar />*/}
        <main className="flex-grow-1">
          <Routes>
            <Route index element={<Role />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<EntrepreneurDashboard />} />
            <Route path="/apply-startup" element={<StartupForm />} />
            <Route path="/request-manpower" element={<ManpowerForm />} />
            <Route path="/apply-funding" element={<FundingForm />} />
          </Routes>
        </main>
        {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;
