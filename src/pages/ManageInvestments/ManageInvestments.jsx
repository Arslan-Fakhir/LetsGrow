"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import InvestmentList from "../../components/ManageInvestments/InvestmentList/InvestmentList"
import InvestmentDetailsModal from "../../components/ManageInvestments/InvestmentDetailsModal/InvestmentDetailsModal"
import FeedbackModal from "../../components/ManageInvestments/FeedbackModal/FeedbackModal"
import StatusFilter from "../../components/ManageInvestments/StatusFilter/StatusFilter"
import { Save, RefreshCw } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"
import "./ManageInvestments.css"

const ManageInvestments = () => {
  const { auth } = useAuth()
  const location = useLocation()
  const [investments, setInvestments] = useState([])
  const [filteredInvestments, setFilteredInvestments] = useState([])
  const [selectedInvestment, setSelectedInvestment] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [actionType, setActionType] = useState("")
  const [feedback, setFeedback] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [hasChanges, setHasChanges] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch investments from backend
  const fetchInvestments = async () => {
    try {
      console.log(auth.user._id)
      setIsLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/investment/all/${auth.user._id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
      setInvestments(response.data.data)
      setFilteredInvestments(response.data.data)
      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching investments:", err)
      setError(err.response?.data?.message || "Failed to fetch investments")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInvestments()
  }, [])

  // Apply filters when filterStatus changes
  useEffect(() => {
    applyFilters()
  }, [filterStatus, investments])

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
  const handleFeedbackSubmit = async () => {
    try {
      const updatedStatus = actionType === "approve" ? "approved" : "rejected"
      
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/investment/status/${selectedInvestment._id}`,
        { 
          status: updatedStatus,
          feedback: feedback 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      // Update local state
      const updatedInvestments = investments.map((investment) => {
        if (investment._id === selectedInvestment._id) {
          return {
            ...investment,
            status: updatedStatus,
            feedback: feedback,
          }
        }
        return investment
      })

      setInvestments(updatedInvestments)
      setShowFeedbackModal(false)
      setHasChanges(false) // No need to save since we updated backend directly
      setSaveSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)

    } catch (err) {
      console.error("Error updating investment status:", err)
      setError(err.response?.data?.message || "Failed to update investment status")
    }
  }

  // Refresh investments
  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchInvestments().finally(() => setIsRefreshing(false))
  }

  // Count investments by status
  const pendingCount = investments.filter((investment) => investment.status === "pending").length
  const approvedCount = investments.filter((investment) => investment.status === "approved").length
  const rejectedCount = investments.filter((investment) => investment.status === "rejected").length

  if (isLoading) {
    return <div className="manage-investments-container p-4">Loading investments...</div>
  }

  if (error) {
    return <div className="manage-investments-container p-4 text-danger">{error}</div>
  }

  return (
    <div className="manage-investments-container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Manage Investments</h2>
          {/*<p className="text-muted">Review, approve, or reject investment requests from investors</p>*/}
        </div>
      </div>

      {/* Filter Section */}
      <div className="card border-0 shadow-sm mb-4">
       {/*} <div className="card-body d-flex justify-content-between align-items-center">
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
          </div>
        </div>*/}
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
  )
}

export default ManageInvestments