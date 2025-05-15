"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Sidebar from "../../components/Admin_Dashboard/Sidebar/Sidebar"
import TopNavbar from "../../components/Admin_Dashboard/TopNavbar/TopNavbar"
import InvestmentList from "../../components/ManageInvestments/InvestmentList/InvestmentList"
import InvestmentDetailsModal from "../../components/ManageInvestments/InvestmentDetailsModal/InvestmentDetailsModal"
import FeedbackModal from "../../components/ManageInvestments/FeedbackModal/FeedbackModal"
import StatusFilter from "../../components/ManageInvestments/StatusFilter/StatusFilter"
import { Save, RefreshCw } from "lucide-react"
import "./ManageInvestments.css"

// Mock data for investments
const initialInvestments = [
  {
    id: 1,
    investorName: "Farhan",
    amount: 5000,
    program: "Stalls",
    startupId: 3,
    startupTitle: "Urban Market Stalls",
    entrepreneur: "Kamran Khan",
    investorEmail: "farhan@example.com",
    investorPhone: "+92 300 1234567",
    date: "May 10, 2024",
    description: "Investment in urban market stalls project for local vendors",
    attachments: ["payment_proof.pdf", "id_verification.jpg"],
    status: "pending",
    feedback: "",
  },
  {
    id: 2,
    investorName: "Ahmad",
    amount: 6000,
    program: "Shop",
    startupId: 5,
    startupTitle: "Smart Retail Shop",
    entrepreneur: "Ayesha Malik",
    investorEmail: "ahmad@example.com",
    investorPhone: "+92 321 9876543",
    date: "May 8, 2024",
    description: "Investment in smart retail shop with inventory management system",
    attachments: ["bank_transfer.pdf", "agreement_draft.docx"],
    status: "pending",
    feedback: "",
  },
  {
    id: 3,
    investorName: "Arslan",
    amount: 100,
    program: "-",
    startupId: null,
    startupTitle: "General Platform Donation",
    entrepreneur: "-",
    investorEmail: "arslan@example.com",
    investorPhone: "+92 333 5556677",
    date: "May 5, 2024",
    description: "Small donation to support the platform",
    attachments: ["donation_receipt.pdf"],
    status: "rejected",
    feedback: "Amount too small for investment consideration. Suggested to pool with other investors.",
  },
  {
    id: 4,
    investorName: "Faizan",
    amount: 5000,
    program: "Stalls",
    startupId: 3,
    startupTitle: "Urban Market Stalls",
    entrepreneur: "Kamran Khan",
    investorEmail: "faizan@example.com",
    investorPhone: "+92 311 2223344",
    date: "May 1, 2024",
    description: "Investment in urban market stalls project focusing on food vendors",
    attachments: ["transaction_receipt.pdf", "investment_agreement.pdf"],
    status: "approved",
    feedback: "Investment approved. Welcome to the Urban Market Stalls project!",
  },
  {
    id: 5,
    investorName: "Usman",
    amount: 10000,
    program: "EcoPackage",
    startupId: 7,
    startupTitle: "Eco-Friendly Packaging Solutions",
    entrepreneur: "Zainab Khan",
    investorEmail: "usman@example.com",
    investorPhone: "+92 345 8889900",
    date: "April 28, 2024",
    description: "Major investment in eco-friendly packaging solutions startup",
    attachments: ["bank_statement.pdf", "investment_terms.pdf"],
    status: "approved",
    feedback: "Investment approved. Your contribution will help scale our eco-packaging solutions.",
  },
  {
    id: 6,
    investorName: "Bilal",
    amount: 3000,
    program: "FinLit",
    startupId: 9,
    startupTitle: "Financial Literacy App",
    entrepreneur: "Hassan Ali",
    investorEmail: "bilal@example.com",
    investorPhone: "+92 312 7778899",
    date: "May 12, 2024",
    description: "Investment in app teaching financial literacy to young adults",
    attachments: ["payment_confirmation.pdf"],
    status: "pending",
    feedback: "",
  },
]

const ManageInvestments = () => {
  const location = useLocation()
  const [investments, setInvestments] = useState(initialInvestments)
  const [filteredInvestments, setFilteredInvestments] = useState(initialInvestments)
  const [selectedInvestment, setSelectedInvestment] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [actionType, setActionType] = useState("")
  const [feedback, setFeedback] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [hasChanges, setHasChanges] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState("Manage Investments")
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth < 768) {
        setSidebarExpanded(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on first render

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Apply filters when filterStatus changes
  useEffect(() => {
    applyFilters()
  }, [filterStatus, investments])

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  // Apply filters based on status
  const applyFilters = () => {
    let filtered = [...investments]

    if (filterStatus !== "all") {
      filtered = filtered.filter((investment) => investment.status === filterStatus)
    }

    setFilteredInvestments(filtered)
  }

  // Handle view details
  const handleViewDetails = (investment) => {
    setSelectedInvestment(investment)
    setShowDetailsModal(true)
  }

  // Handle action (approve/reject)
  const handleAction = (investment, action) => {
    setSelectedInvestment(investment)
    setActionType(action)
    setFeedback(investment.feedback || "")
    setShowFeedbackModal(true)
  }

  // Submit feedback and update status
  const handleFeedbackSubmit = () => {
    const updatedInvestments = investments.map((investment) => {
      if (investment.id === selectedInvestment.id) {
        return {
          ...investment,
          status: actionType === "approve" ? "approved" : "rejected",
          feedback: feedback,
        }
      }
      return investment
    })

    setInvestments(updatedInvestments)
    setShowFeedbackModal(false)
    setHasChanges(true)

    // In a real application, you would send a notification to the investor here
    console.log(`Notification sent to ${selectedInvestment.investorName} about ${actionType} status`)
  }

  // Save changes
  const handleSaveChanges = () => {
    // In a real application, you would save changes to a database here
    console.log("Saving changes to investments:", investments)

    // Show success message
    setSaveSuccess(true)
    setHasChanges(false)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  // Refresh investments
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate fetching new data
    setTimeout(() => {
      // In a real application, you would fetch fresh data from the server
      // For demo, we'll just randomize the order
      const shuffled = [...initialInvestments].sort(() => 0.5 - Math.random())
      setInvestments(shuffled)
      setIsRefreshing(false)
    }, 1000)
  }

  // Count investments by status
  const pendingCount = investments.filter((investment) => investment.status === "pending").length
  const approvedCount = investments.filter((investment) => investment.status === "approved").length
  const rejectedCount = investments.filter((investment) => investment.status === "rejected").length

  return (
    <div className="d-flex vh-100">
      <Sidebar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        sidebarExpanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column transition-all"
        style={{
          marginLeft: windowWidth >= 768 ? (sidebarExpanded ? "250px" : "80px") : "0",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <TopNavbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-grow-1 overflow-auto bg-light">
          <div className="manage-investments-container p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="mb-1">Manage Investments</h2>
                <p className="text-muted">Review, approve, or reject investment requests from investors</p>
              </div>
            </div>

            {/* Filter Section */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <StatusFilter
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    pendingCount={pendingCount}
                    approvedCount={approvedCount}
                    rejectedCount={rejectedCount}
                    totalCount={investments.length}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary d-flex align-items-center gap-2"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw size={16} className={isRefreshing ? "spin" : ""} />
                    Refresh
                  </button>
                  {hasChanges && (
                    <button className="btn btn-success d-flex align-items-center gap-2" onClick={handleSaveChanges}>
                      <Save size={16} />
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Investments List */}
            <InvestmentList
              investments={filteredInvestments}
              handleViewDetails={handleViewDetails}
              handleAction={handleAction}
            />

            {/* Success Message */}
            {saveSuccess && (
              <div className="save-success-message">
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <div>Changes saved successfully!</div>
                </div>
              </div>
            )}

            {/* View Details Modal */}
            <InvestmentDetailsModal
              showDetailsModal={showDetailsModal}
              selectedInvestment={selectedInvestment}
              setShowDetailsModal={setShowDetailsModal}
              handleAction={handleAction}
            />

            {/* Feedback Modal */}
            <FeedbackModal
              showFeedbackModal={showFeedbackModal}
              selectedInvestment={selectedInvestment}
              actionType={actionType}
              feedback={feedback}
              setFeedback={setFeedback}
              setShowFeedbackModal={setShowFeedbackModal}
              handleFeedbackSubmit={handleFeedbackSubmit}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default ManageInvestments
