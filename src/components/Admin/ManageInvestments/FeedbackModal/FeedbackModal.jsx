"use client"

import "./FeedbackModal.css"

const FeedbackModal = ({
  showFeedbackModal,
  selectedInvestment,
  actionType,
  feedback,
  setFeedback,
  setShowFeedbackModal,
  handleFeedbackSubmit,
}) => {
  if (!showFeedbackModal || !selectedInvestment) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h5 className="modal-title">{actionType === "approve" ? "Approve Investment" : "Reject Investment"}</h5>
          <button type="button" className="btn-close" onClick={() => setShowFeedbackModal(false)}></button>
        </div>
        <div className="modal-body">
          <p>
            You are about to <strong>{actionType === "approve" ? "approve" : "reject"}</strong> the investment of{" "}
            <strong>{selectedInvestment.amount} PKR</strong> by <strong>{selectedInvestment.investorName}</strong>
            {selectedInvestment.program !== "-" ? ` for the program "${selectedInvestment.program}"` : ""}.
          </p>

          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">
              {actionType === "approve"
                ? "Provide feedback or comments (optional)"
                : "Provide feedback explaining the reason for rejection"}
            </label>
            <textarea
              id="feedback"
              className="form-control"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                actionType === "approve"
                  ? "Enter any comments or feedback for the investor..."
                  : "Explain why this investment is being rejected..."
              }
              required={actionType === "reject"}
            ></textarea>
            {actionType === "reject" && !feedback && (
              <div className="text-danger small mt-1">Feedback is required when rejecting an investment</div>
            )}
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="notifyInvestor" defaultChecked />
            <label className="form-check-label" htmlFor="notifyInvestor">
              Send notification to investor
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowFeedbackModal(false)}>
            Cancel
          </button>
          <button
            className={`btn ${actionType === "approve" ? "btn-success" : "btn-danger"}`}
            onClick={handleFeedbackSubmit}
            disabled={actionType === "reject" && !feedback}
          >
            {actionType === "approve" ? "Approve" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal