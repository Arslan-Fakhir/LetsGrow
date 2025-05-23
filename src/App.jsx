import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Footer from "./components/Footer";
import InvestorDashboard from "./pages/InvestorDashboard";
import Transaction from "./pages/Transaction";
import BrowseStartups from "./pages/BrowseStartups";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investordashboard" element={<InvestorDashboard />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/startups" element={<BrowseStartups />} />
            <Route path="/form" element={<FormPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
