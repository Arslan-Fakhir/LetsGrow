import { Users, DollarSign } from "lucide-react"
import ProfileCard from "../../components/Investor/Dashboard/ProfileCard"
import BrowseStartupsCard from "../../components/Investor/Dashboard/BrowseStartupsCard"
import StatsSection from "../../components/Investor/Dashboard/StatsSection"
import StartupsSection from "../../components/Investor/Dashboard/StartupsSection"
import "./InvestorDashboard.css"
import { useNavigate } from "react-router-dom"

const InvestorDashboard = () => {
  const navigate = useNavigate()

  const investor = {
    name: "Rayyan Azhar",
    category: "All",
    investedCount: 3,
  }

  const startups = [
    {
      id: 1,
      name: "EcoBite",
      entrepreneur: "Arslan Fakhir",
      description: "This startup specializes in sustainable food delivery.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkORMChqnlSIaSE30NBizeKUSbWoBbGixzQ&s",
      investment: "$25,000",
      growth: "+12%",
      status: "Active",
    },
    {
      id: 2,
      name: "ChainIQ",
      entrepreneur: "Ahmad Nadeem",
      description: "An AI-powered supply chain optimization solution.",
      image:
        "https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2023/04/14003540/The-role-of-AI-in-logistics-and-supply-chain-banner.png",
      investment: "$15,000",
      growth: "+8%",
      status: "Growing",
    },
    {
      id: 3,
      name: "Harvestly",
      entrepreneur: "Kamran Sajjad",
      description: "A farm-to-table organic produce logistics app.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNcrEdEnYlInpgb0B5GqBt8fx8J-slr8xMA&s",
      investment: "$30,000",
      growth: "+15%",
      status: "Expanding",
    },
  ]

  const stats = [
    {
      title: "Total Invested",
      value: "$70,000",
      icon: DollarSign,
      change: "+5.2%",
      color: "text-green-600",
    },
    {
      title: "Active Startups",
      value: "3",
      icon: Users,
      change: "+1",
      color: "text-blue-600",
    },
  ]

  const handleBrowseStartups = () => {
    navigate("/browseStartups")
  }

  const handleViewDetails = (startup) => {
    console.log("View details for:", startup.name)
    // Add navigation logic here if needed
  }

  return (
    <div className="dashboard-container min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="dashboard-content container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="header-section flex flex-col lg:flex-row gap-6">
          {/* Profile Card */}
          <ProfileCard investor={investor} />

          {/* Browse Startups Card */}
          <BrowseStartupsCard onBrowseClick={handleBrowseStartups} />
        </div>

        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Startups Section */}
        <StartupsSection startups={startups} onViewDetails={handleViewDetails} />
      </div>
    </div>
  )
}

export default InvestorDashboard