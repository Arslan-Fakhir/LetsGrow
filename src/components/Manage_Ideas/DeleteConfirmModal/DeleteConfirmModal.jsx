"use client"

import "./DeleteConfirmModal.css"

const DeleteConfirmModal = ({ showDeleteConfirm, ideaToDelete, setShowDeleteConfirm, handleDelete }) => {
  if (!showDeleteConfirm || !ideaToDelete) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-sm">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Delete</h5>
          <button type="button" className="btn-close" onClick={() => setShowDeleteConfirm(false)}></button>
        </div>
        <div className="modal-body">
          <p>
            Are you sure you want to delete the startup idea: <strong>{ideaToDelete.title}</strong>?
          </p>
          <p className="text-danger">
            <small>This action cannot be undone.</small>
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal;
