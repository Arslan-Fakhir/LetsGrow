"use client"

import { useState, useEffect } from "react"
import "./ProfileForm.css"

const ProfileForm = ({ userData, isEditing, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    contact: "",
    currentPassword: "",
    newPassword: "",
  })

  const [errors, setErrors] = useState({})

  // Update form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        address: userData.address || "",
        contact: userData.contact || "",
        currentPassword: "",
        newPassword: "",
      })
    }
  }, [userData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (formData.newPassword && !formData.currentPassword) {
      newErrors.currentPassword = "Current password is required to set a new password"
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Filter out password fields if they're empty
      const dataToSubmit = { ...formData }
      if (!dataToSubmit.currentPassword) {
        delete dataToSubmit.currentPassword
        delete dataToSubmit.newPassword
      }

      onSubmit(dataToSubmit)
    }
  }

  // Render form fields in view mode
  const renderViewMode = () => {
    return (
      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-medium">Full Name</label>
            <div className="form-control-static">{userData.fullName || "-"}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-medium">Email</label>
            <div className="form-control-static">{userData.email || "-"}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-medium">Address</label>
            <div className="form-control-static">{userData.address || "-"}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-medium">Contact</label>
            <div className="form-control-static">{userData.contact || "-"}</div>
          </div>
        </div>
      </div>
    )
  }

  // Render form fields in edit mode
  const renderEditMode = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                id="fullName"
                name="fullName"
                placeholder="Your name here..."
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                placeholder="Your email here..."
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Your full address here..."
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact"
                placeholder="Your Phone No..."
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.currentPassword ? "is-invalid" : ""}`}
                id="currentPassword"
                name="currentPassword"
                placeholder="Type your current password..."
                value={formData.currentPassword}
                onChange={handleChange}
              />
              {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                id="newPassword"
                name="newPassword"
                placeholder="Type your new password..."
                value={formData.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
            </div>
          </div>

          <div className="col-12 mt-4 d-flex justify-content-center gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success px-4">
              Save
            </button>
          </div>
        </div>
      </form>
    )
  }

  return <div className="profile-form mt-4">{isEditing ? renderEditMode() : renderViewMode()}</div>
}

export default ProfileForm;
