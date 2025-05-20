"use client"

import { useEffect, useRef } from "react"
import "./LogoutConfirmModal.css"

const LogoutConfirmModal = ({ onConfirm, onCancel }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel()
      }
    }

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onCancel()
      }
    }

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [onCancel])

  return (
    <div className="modal-backdrop">
      <div className="modal-wrapper">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content logout-modal-content" ref={modalRef}>
            <div className="modal-header logout-modal-header">
              <h5 className="modal-title">Confirm Logout</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">Are you sure you want to logout?</div>
            <div className="modal-footer logout-modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger logout-btn" onClick={onConfirm}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirmModal
