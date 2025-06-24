import { useState, useEffect } from "react";
import { Users, DollarSign } from "lucide-react";
import ProfileCard from "../../components/Investor/Dashboard/ProfileCard";
import BrowseStartupsCard from "../../components/Investor/Dashboard/BrowseStartupsCard";
import InvestmentPortfolioCard from "../../components/Investor/Dashboard/InvestmentPortfolioCard";
import StatsSection from "../../components/Investor/Dashboard/StatsSection";
import StartupsSection from "../../components/Investor/Dashboard/StartupsSection";
import { useAuth } from "../../context/AuthContext";
import "./InvestorDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [investedCount, setInvestedCount] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  
  useEffect(() => {
  const fetchInvestmentDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/investment/${auth.user._id}`
      );

      if (response.data.success && response.data.data && response.data.data.length > 0) {
        const mappedData = response.data.data.map(investment => ({
          id: investment.id,
          name: investment.name,
          entrepreneur: {
            id: investment.entrepreneur.id,
            name: investment.entrepreneur.name || "Unknown",
            email: investment.entrepreneur.email || "N/A",
            phone: investment.entrepreneur.phone || "N/A",
            location: {
              address: investment.entrepreneur.location?.address || "N/A",
              city: investment.entrepreneur.location?.city || "N/A",
              country: investment.entrepreneur.location?.country || "N/A"
            }
          },
          industry: investment.industry,
          description: investment.description,
          image: investment.image || "",
          investment: investment.investment,
          status: investment.status || "N/A",
          submissionDate: investment.investedAt || new Date().toISOString(),
          fundingRequired: investment.fundingRequired?.toLocaleString() || "N/A",
          fundingReceived: investment.fundingReceived?.toLocaleString() || "0",
          stage: investment.stage
        }));

        setStartups(mappedData);
        setInvestedCount(response.data.count || mappedData.length);
        setTotalInvested(response.data.totalInvested);
      } else {
        setStartups([]);
        setInvestedCount(0);
        setTotalInvested(0);
        setError("You have not invested in any startups yet");
      }
    } catch (err) {
      console.error("Failed to fetch investments:", err);
      setError(err.response?.data?.message || err.message || "Failed to load investment details");
      setStartups([]);
    } finally {
      setLoading(false);
    }
  };

  fetchInvestmentDetails();
}, [auth.user._id]);

  
  const investor = {
    name: auth.user.name,
    investedCount: investedCount,
    image:auth.user.profileImage.url
  }
  const stats = [
    {
      title: "Total Invested",
      value: "$"+totalInvested,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Startups",
      value: investedCount,
      icon: Users,
      color: "text-blue-600",
    },
  ]

  const handleBrowseStartups = () => {
    navigate("/browseStartups")
  }
  const handleInvestmentPortfolio = () => {
    navigate("/investmentPortfolio")
  }

  const handleViewDetails = (startup) => {
    console.log("View details for:", startup.name)
    // Add navigation logic here if needed
  }

  return (
    <div className="dashboard-container min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="dashboard-content container mx-auto px-4 py-8 space-y-8">
        

        {/* Stats Section */}
        <StatsSection stats={stats} />
        {/* Header Section */}
        <div className="header-section flex flex-col lg:flex-row gap-6">
          {/* Profile Card */}
          <InvestmentPortfolioCard  onPortfolioClick={handleInvestmentPortfolio}/>

          {/* Browse Startups Card */}
          <BrowseStartupsCard onBrowseClick={handleBrowseStartups} />
        </div>
        {/* Startups Section */}
        <StartupsSection startups={startups} onViewDetails={handleViewDetails} />
      </div>
    </div>
  )
}

export default InvestorDashboard