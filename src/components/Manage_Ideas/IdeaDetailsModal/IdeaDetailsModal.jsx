"use client"

import { Check, X, FileText, User, Mail, Phone, Calendar, Briefcase, Tag } from "lucide-react"
import "./IdeaDetailsModal.css"

const IdeaDetailsModal = ({ showDetailsModal, selectedIdea, setShowDetailsModal, handleAction }) => {
  if (!showDetailsModal || !selectedIdea) return null

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-success"
      case "rejected":
        return "bg-danger"
      default:
        return "bg-warning"
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container idea-details-modal">
        <div className="modal-header">
          <h5 className="modal-title">Startup Idea Details</h5>
          <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
        </div>

        <div className="modal-body">
          {/* Title and Status Section */}
          <div className="idea-title-section">
            <h3 className="idea-title">{selectedIdea.title}</h3>
            {selectedIdea.status !== "pending" && (
              <span className={`badge ${getStatusBadgeClass(selectedIdea.status)}`}>
                {selectedIdea.status.charAt(0).toUpperCase() + selectedIdea.status.slice(1)}
              </span>
            )}
          </div>

          <div className="idea-subject mb-4">
            <Tag size={16} className="me-2 text-primary" />
            {selectedIdea.subject}
          </div>

          {/* Info Cards */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="info-card">
                <div className="info-card-icon">
                  <User size={20} />
                </div>
                <div className="info-card-content">
                  <h6 className="info-card-label">Entrepreneur</h6>
                  <p className="info-card-value">{selectedIdea.entrepreneur}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="info-card">
                <div className="info-card-icon">
                  <Briefcase size={20} />
                </div>
                <div className="info-card-content">
                  <h6 className="info-card-label">Industry</h6>
                  <p className="info-card-value">{selectedIdea.industry}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="info-card">
                <div className="info-card-icon">
                  <Mail size={20} />
                </div>
                <div className="info-card-content">
                  <h6 className="info-card-label">Email</h6>
                  <p className="info-card-value">{selectedIdea.email}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="info-card">
                <div className="info-card-icon">
                  <Phone size={20} />
                </div>
                <div className="info-card-content">
                  <h6 className="info-card-label">Contact</h6>
                  <p className="info-card-value">{selectedIdea.contact}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="info-card">
                <div className="info-card-icon">
                  <Calendar size={20} />
                </div>
                <div className="info-card-content">
                  <h6 className="info-card-label">Submission Date</h6>
                  <p className="info-card-value">{selectedIdea.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="idea-description-section">
            <h5 className="section-title">Description</h5>
            <div className="idea-description p-3">{selectedIdea.description}</div>
          </div>

          {/* Attachments Section */}
          <div className="attachments-section mt-4">
            <h5 className="section-title">Attachments</h5>
            <div className="attachments-list">
              {selectedIdea.attachments.map((attachment, index) => (
                <div key={index} className="attachment-item">
                  <FileText size={16} className="me-2" />
                  <a href="#" className="text-decoration-none">
                    {attachment}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          {selectedIdea.feedback && (
            <div className="feedback-section mt-4">
              <h5 className="section-title">Feedback</h5>
              <div className="feedback-content p-3">{selectedIdea.feedback}</div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {selectedIdea.status === "pending" && (
            <>
              <button
                className="btn btn-success"
                onClick={() => {
                  setShowDetailsModal(false)
                  handleAction(selectedIdea, "approve")
                }}
              >
                <Check size={16} className="me-1" /> Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowDetailsModal(false)
                  handleAction(selectedIdea, "reject")
                }}
              >
                <X size={16} className="me-1" /> Reject
              </button>
            </>
          )}
          <button className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default IdeaDetailsModal;
