"use client"

import "./FeedbackModal.css"

const FeedbackModal = ({
  showFeedbackModal,
  selectedIdea,
  actionType,
  feedback,
  setFeedback,
  setShowFeedbackModal,
  handleFeedbackSubmit,
}) => {
  if (!showFeedbackModal || !selectedIdea) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h5 className="modal-title">{actionType === "approve" ? "Approve Startup Idea" : "Reject Startup Idea"}</h5>
          <button type="button" className="btn-close" onClick={() => setShowFeedbackModal(false)}></button>
        </div>
        <div className="modal-body">
          <p>
            You are about to <strong>{actionType === "approve" ? "approve" : "reject"}</strong> the startup idea:
            <strong> {selectedIdea.title}</strong>
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
                  ? "Enter any comments or feedback for the entrepreneur..."
                  : "Explain why this startup idea is being rejected..."
              }
              required={actionType === "reject"}
            ></textarea>
            {actionType === "reject" && !feedback && (
              <div className="text-danger small mt-1">Feedback is required when rejecting a startup idea</div>
            )}
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="notifyEntrepreneur" defaultChecked />
            <label className="form-check-label" htmlFor="notifyEntrepreneur">
              Send notification to entrepreneur
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
