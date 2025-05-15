"use client"

import { useState } from "react"
import IdeaList from "../../components/Manage_Ideas/IdeaList/IdeaList"
import IdeaDetailsModal from "../../components/Manage_Ideas/IdeaDetailsModal/IdeaDetailsModal"
import FeedbackModal from "../../components/Manage_Ideas/FeedbackModal/FeedbackModal"
import DeleteConfirmModal from "../../components/Manage_Ideas/DeleteConfirmModal/DeleteConfirmModal"
import SearchBar from "../../components/Manage_Ideas/SearchBar/SearchBar"
import FilterTabs from "../../components/Manage_Ideas/FilterTabs/FilterTabs"
import { Save } from "lucide-react"
import "./ManageIdeas.css"

// Mock data for startup ideas
const initialStartupIdeas = [
  {
    id: 1,
    title: "Aqua Pure",
    entrepreneur: "Farhan Ahmed",
    email: "farhan@example.com",
    contact: "+92 300 1234567",
    date: "November 2, 2024",
    industry: "Clean Technology",
    subject: "Water Purification Solution",
    description:
      "Affordable water purification system for rural areas using solar power and advanced filtration technology.",
    attachments: ["business_plan.pdf", "prototype_image.jpg"],
    status: "pending",
    feedback: "",
  },
  {
    id: 2,
    title: "UrbanGrow",
    entrepreneur: "Kamran Khan",
    email: "kamran@example.com",
    contact: "+92 321 9876543",
    date: "June 12, 2023",
    industry: "Agriculture",
    subject: "Urban Vertical Farming",
    description:
      "Vertical farming solution for urban areas to grow organic vegetables using hydroponics and IoT monitoring.",
    attachments: ["financial_projection.xlsx", "demo_video.mp4"],
    status: "approved",
    feedback: "Great concept with solid market potential. Approved for investor review.",
  },
  {
    id: 3,
    title: "Med Care",
    entrepreneur: "Abdul Basit",
    email: "basit@example.com",
    contact: "+92 333 5556677",
    date: "January 12, 2022",
    industry: "Healthcare",
    subject: "Mobile Healthcare Platform",
    description:
      "Mobile application connecting patients with doctors for remote consultations and prescription delivery.",
    attachments: ["app_mockups.pdf", "market_research.pdf"],
    status: "rejected",
    feedback: "Similar solutions already exist in the market. Need more differentiation and unique value proposition.",
  },
  {
    id: 4,
    title: "EcoPackage",
    entrepreneur: "Ayesha Malik",
    email: "ayesha@example.com",
    contact: "+92 311 2223344",
    date: "March 15, 2024",
    industry: "Sustainability",
    subject: "Biodegradable Packaging",
    description: "Eco-friendly packaging solutions made from agricultural waste that decompose within 30 days.",
    attachments: ["product_samples.jpg", "patent_application.pdf"],
    status: "pending",
    feedback: "",
  },
  {
    id: 5,
    title: "FinLit",
    entrepreneur: "Usman Ali",
    email: "usman@example.com",
    contact: "+92 345 8889900",
    date: "April 5, 2024",
    industry: "Education",
    subject: "Financial Literacy Platform",
    description:
      "Interactive platform teaching financial literacy to young adults through gamification and real-world scenarios.",
    attachments: ["platform_demo.mp4", "curriculum_outline.pdf"],
    status: "pending",
    feedback: "",
  },
]

const ManageIdeas = () => {
  const [startupIdeas, setStartupIdeas] = useState(initialStartupIdeas)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [actionType, setActionType] = useState("")
  const [feedback, setFeedback] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [ideaToDelete, setIdeaToDelete] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Filter ideas based on search query and status
  const filteredIdeas = startupIdeas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.entrepreneur.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.industry.toLowerCase().includes(searchQuery.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && idea.status === filterStatus
  })

  // Handle view details
  const handleViewDetails = (idea) => {
    setSelectedIdea(idea)
    setShowDetailsModal(true)
  }

  // Handle action (approve/reject)
  const handleAction = (idea, action) => {
    setSelectedIdea(idea)
    setActionType(action)
    setFeedback(idea.feedback || "")
    setShowFeedbackModal(true)
  }

  // Submit feedback and update status
  const handleFeedbackSubmit = () => {
    const updatedIdeas = startupIdeas.map((idea) => {
      if (idea.id === selectedIdea.id) {
        return {
          ...idea,
          status: actionType === "approve" ? "approved" : "rejected",
          feedback: feedback,
        }
      }
      return idea
    })

    setStartupIdeas(updatedIdeas)
    setShowFeedbackModal(false)
    setHasChanges(true)

    // In a real application, you would send a notification to the entrepreneur here
    console.log(`Notification sent to ${selectedIdea.entrepreneur} about ${actionType} status`)
  }

  // Handle delete confirmation
  const handleDeleteConfirm = (idea) => {
    setIdeaToDelete(idea)
    setShowDeleteConfirm(true)
  }

  // Delete idea
  const handleDelete = () => {
    const updatedIdeas = startupIdeas.filter((idea) => idea.id !== ideaToDelete.id)
    setStartupIdeas(updatedIdeas)
    setShowDeleteConfirm(false)
    setHasChanges(true)
  }

  // Save changes
  const handleSaveChanges = () => {
    // In a real application, you would save changes to a database here
    console.log("Saving changes to startup ideas:", startupIdeas)

    // Show success message
    setSaveSuccess(true)
    setHasChanges(false)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  // Count ideas by status
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

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filter Tabs */}
      <FilterTabs
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        rejectedCount={rejectedCount}
        totalCount={startupIdeas.length}
      />

      {/* Ideas List */}
      <IdeaList
        filteredIdeas={filteredIdeas}
        handleViewDetails={handleViewDetails}
        handleAction={handleAction}
        handleDeleteConfirm={handleDeleteConfirm}
      />

      {/* Save Changes Button */}
      {hasChanges && (
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-success d-flex align-items-center gap-2" onClick={handleSaveChanges}>
            <Save size={18} />
            Save Changes
          </button>
        </div>
      )}

      {/* Success Message */}
      {saveSuccess && (
        <div className="save-success-message">
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <div>Changes saved successfully!</div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      <IdeaDetailsModal
        showDetailsModal={showDetailsModal}
        selectedIdea={selectedIdea}
        setShowDetailsModal={setShowDetailsModal}
        handleAction={handleAction}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        showFeedbackModal={showFeedbackModal}
        selectedIdea={selectedIdea}
        actionType={actionType}
        feedback={feedback}
        setFeedback={setFeedback}
        setShowFeedbackModal={setShowFeedbackModal}
        handleFeedbackSubmit={handleFeedbackSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        showDeleteConfirm={showDeleteConfirm}
        ideaToDelete={ideaToDelete}
        setShowDeleteConfirm={setShowDeleteConfirm}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default ManageIdeas;
