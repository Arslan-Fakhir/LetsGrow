"use client"

import { Check, X, FileText, User, Mail, Phone, Calendar, DollarSign, Briefcase, Tag } from "lucide-react"
import "./InvestmentDetailsModal.css"

const InvestmentDetailsModal = ({ showDetailsModal, selectedInvestment, setShowDetailsModal, handleAction }) => {
  if (!showDetailsModal || !selectedInvestment) return null

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

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
      <div className="modal-container investment-details-modal">
        <div className="modal-header">
          <h5 className="modal-title">Investment Details</h5>
          <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
        </div>

        <div className="modal-body">
          {/* Title and Status Section */}
          <div className="investment-title-section">
            <h3 className="investment-title">Investment by {selectedInvestment.investorName}</h3>
            {selectedInvestment.status !== "pending" && (
              <span className={`badge ${getStatusBadgeClass(selectedInvestment.status)}`}>
                {selectedInvestment.status.charAt(0).toUpperCase() + selectedInvestment.status.slice(1)}
              </span>
            )}
          </div>

          <div className="investment-amount mb-4">
            <DollarSign size={20} className="me-2 text-success" />
            <span className="fs-4 fw-bold">{formatCurrency(selectedInvestment.amount)}</span>
          </div>

          {/* Info Cards */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="info-card">
                <div className="info-card-icon">
                  <User size={20} />
                </div>
                <div className="info-card-content">
                  <h6 className="info-card-label">Investor</h6>
                  <p className="info-card-value">{selectedInvestment.investorName}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="info-card">
                <div className="info-card-icon">
                  <Briefcase size={20} />
                </div>
                <div className="info-card-content">
                  <h6 className="info-card-label">Program</h6>
                  <p className="info-card-value">{selectedInvestment.program || "-"}</p>
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
                  <p className="info-card-value">{selectedInvestment.investorEmail}</p>
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
                  <p className="info-card-value">{selectedInvestment.investorPhone}</p>
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
                  <p className="info-card-value">{selectedInvestment.date}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="info-card">
                <div className="info-card-icon">
                  <Tag size={20} />
                </div>
                <div className="info-card-content">
                  <h6 className="info-card-label">Startup</h6>
                  <p className="info-card-value">{selectedInvestment.startupTitle || "-"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="investment-description-section">
            <h5 className="section-title">Description</h5>
            <div className="investment-description p-3">{selectedInvestment.description}</div>
          </div>

          {/* Attachments Section */}
          <div className="attachments-section mt-4">
            <h5 className="section-title">Payment Proof & Attachments</h5>
            <div className="attachments-list">
              {selectedInvestment.attachments.map((attachment, index) => (
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
          {selectedInvestment.feedback && (
            <div className="feedback-section mt-4">
              <h5 className="section-title">Feedback</h5>
              <div className="feedback-content p-3">{selectedInvestment.feedback}</div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {selectedInvestment.status === "pending" && (
            <>
              <button
                className="btn btn-success"
                onClick={() => {
                  setShowDetailsModal(false)
                  handleAction(selectedInvestment, "approve")
                }}
              >
                <Check size={16} className="me-1" /> Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowDetailsModal(false)
                  handleAction(selectedInvestment, "reject")
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

export default InvestmentDetailsModal;