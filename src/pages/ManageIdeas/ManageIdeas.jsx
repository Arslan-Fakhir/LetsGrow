"use client"

import { useEffect, useState } from "react"
import IdeaList from "../../components/Manage_Ideas/IdeaList/IdeaList"
import IdeaDetailsModal from "../../components/Manage_Ideas/IdeaDetailsModal/IdeaDetailsModal"
import FeedbackModal from "../../components/Manage_Ideas/FeedbackModal/FeedbackModal"
import DeleteConfirmModal from "../../components/Manage_Ideas/DeleteConfirmModal/DeleteConfirmModal"
import SearchBar from "../../components/Manage_Ideas/SearchBar/SearchBar"
import FilterTabs from "../../components/Manage_Ideas/FilterTabs/FilterTabs"
import { Save } from "lucide-react"
import "./ManageIdeas.css"

const baseURL = import.meta.env.VITE_API_BASE_URL

const ManageIdeas = () => {
  const [startupIdeas, setStartupIdeas] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [actionType, setActionType] = useState("")
  const [feedback, setFeedback] = useState("")
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [ideaToDelete, setIdeaToDelete] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all startup ideas
  const fetchIdeas = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch(`${baseURL}/api/startups/getIdeas`)
      if (!res.ok) throw new Error("Failed to fetch ideas")
      const data = await res.json()
      setStartupIdeas(data)
    } catch (err) {
      setError("Error fetching ideas. Please try again.")
      console.error("Error fetching ideas:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  // Filter ideas based on search and status
  const filteredIdeas = startupIdeas.filter((idea) => {
    const matchesSearch =
      idea.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase())
    return filterStatus === "all" ? matchesSearch : matchesSearch && idea.status === filterStatus
  })

  // View idea details modal
  const handleViewDetails = (idea) => {
    setSelectedIdea(idea)
    setShowDetailsModal(true)
  }

  // Approve or reject
  const handleAction = (idea, action) => {
    setSelectedIdea(idea)
    setActionType(action)
    setFeedback(idea.feedback || "")
    setShowFeedbackModal(true)
  }

  // Submit feedback with status update
  const handleFeedbackSubmit = async () => {
    try {
      const updatedStatus = actionType === "approve" ? "approved" : "rejected"
      const res = await fetch(`${baseURL}/api/startups/${selectedIdea._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updatedStatus, feedback }),
      })

      if (!res.ok) throw new Error("Failed to update startup")

      setShowFeedbackModal(false)
      setHasChanges(true)
      await fetchIdeas()
    } catch (err) {
      console.error("Failed to update idea status", err)
      alert("Failed to update idea. Try again.")
    }
  }

  // Open delete confirm
  const handleDeleteConfirm = (idea) => {
    setIdeaToDelete(idea)
    setShowDeleteConfirm(true)
  }

  // Delete idea
  const handleDelete = async () => {
    try {
      const res = await fetch(`${baseURL}/api/startups/${ideaToDelete._id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete startup")

      setShowDeleteConfirm(false)
      setHasChanges(true)
      await fetchIdeas()
    } catch (err) {
      console.error("Failed to delete idea", err)
      alert("Failed to delete idea. Try again.")
    }
  }

  // Save all changes (visual feedback only)
  const handleSaveChanges = () => {
    setSaveSuccess(true)
    setHasChanges(false)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const pendingCount = startupIdeas.filter((idea) => idea.status === "pending").length
  const approvedCount = startupIdeas.filter((idea) => idea.status === "approved").length
  const rejectedCount = startupIdeas.filter((idea) => idea.status === "rejected").length

  return (
    <div className="manage-ideas-container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Manage Startup Ideas</h2>
          <p className="text-muted">Review, approve, or reject startup ideas submitted by entrepreneurs</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FilterTabs
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        rejectedCount={rejectedCount}
        totalCount={startupIdeas.length}
      />

      {isLoading ? (
        <p className="text-center mt-4">Loading ideas...</p>
      ) : (
        <IdeaList
          filteredIdeas={filteredIdeas}
          handleViewDetails={handleViewDetails}
          handleAction={handleAction}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      )}

      {hasChanges && (
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-success d-flex align-items-center gap-2" onClick={handleSaveChanges}>
            <Save size={18} />
            Save Changes
          </button>
        </div>
      )}

      {saveSuccess && (
        <div className="save-success-message mt-3">
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <div>Changes saved successfully!</div>
          </div>
        </div>
      )}

      {/* Modals */}
      <IdeaDetailsModal
        showDetailsModal={showDetailsModal}
        selectedIdea={selectedIdea}
        setShowDetailsModal={setShowDetailsModal}
        handleAction={handleAction}
      />

      <FeedbackModal
        showFeedbackModal={showFeedbackModal}
        selectedIdea={selectedIdea}
        actionType={actionType}
        feedback={feedback}
        setFeedback={setFeedback}
        setShowFeedbackModal={setShowFeedbackModal}
        handleFeedbackSubmit={handleFeedbackSubmit}
      />

      <DeleteConfirmModal
        showDeleteConfirm={showDeleteConfirm}
        ideaToDelete={ideaToDelete}
        setShowDeleteConfirm={setShowDeleteConfirm}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default ManageIdeas
