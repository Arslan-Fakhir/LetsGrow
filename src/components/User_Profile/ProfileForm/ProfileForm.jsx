"use client"

import { useState, useEffect } from "react"
import { Upload, X } from "lucide-react"
import "./ProfileForm.css"

const ProfileForm = ({ userData, isEditing, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnic: "",
    contactNumber: "",
    address: "",
    city: "",
    country: "",
    currentPassword: "",
    newPassword: "",
    profileImage: null,
  })

  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)

  // Update form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || userData.fullName || "",
        email: userData.email || "",
        cnic: userData.cnic || "",
        contactNumber: userData.contactNumber || userData.contact || "",
        address: userData.location?.address || "",
        city: userData.location?.city || "",
        country: userData.location?.country || "",
        currentPassword: "",
        newPassword: "",
        profileImage: null,
      })

      // Set image preview if user has profile image
      if (userData.profileImage?.url) {
        setImagePreview(userData.profileImage.url)
      }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors({
          ...errors,
          profileImage: "Please select a valid image file",
        })
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          profileImage: "Image size should be less than 5MB",
        })
        return
      }

      setFormData({
        ...formData,
        profileImage: file,
      })

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)

      // Clear any previous errors
      if (errors.profileImage) {
        setErrors({
          ...errors,
          profileImage: "",
        })
      }
    }
  }

  const removeImage = () => {
    setFormData({
      ...formData,
      profileImage: null,
    })
    setImagePreview(userData.profileImage?.url || null)

    // Clear file input
    const fileInput = document.getElementById("profileImage")
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // CNIC validation
    if (formData.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC format should be XXXXX-XXXXXXX-X"
    }

    // Contact number validation
    if (formData.contactNumber && !/^(\+92|0)[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid Pakistani phone number"
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

  // In the handleSubmit function:
const handleSubmit = (e) => {
  e.preventDefault()

  if (validateForm()) {
    // Prepare data to submit
    const dataToSubmit = { 
      ...formData,
      address: formData.address // Ensure address is included
    }

    // Remove password fields if they're empty
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
            <div className="form-control-static">{userData.name || userData.fullName || "-"}</div>
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
            <label className="form-label fw-medium">CNIC</label>
            <div className="form-control-static">{userData.cnic || "-"}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-medium">Contact Number</label>
            <div className="form-control-static">{userData.contactNumber || userData.contact || "-"}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-medium">City</label>
            <div className="form-control-static">{userData.location?.city || "-"}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-medium">Country</label>
            <div className="form-control-static">{userData.location?.country || "-"}</div>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <label className="form-label fw-medium">Address</label>
            <div className="form-control-static">{userData.location?.address || "-"}</div>
          </div>
        </div>

        {userData.role && (
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label fw-medium">Role</label>
              <div className="form-control-static">
                <span className="badge bg-primary">{userData.role}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render form fields in edit mode
  const renderEditMode = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Profile Image Upload */}
          <div className="col-12">
            <div className="form-group">
              <label className="form-label">Profile Image</label>
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <img
                    src={imagePreview || "/placeholder-user.png"}
                    alt="Profile preview"
                    className="rounded-circle"
                    width="80"
                    height="80"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80"
                    }}
                  />
                  {formData.profileImage && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle p-1"
                      onClick={removeImage}
                      style={{ width: "24px", height: "24px" }}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    className="d-none"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profileImage" className="btn btn-outline-primary btn-sm">
                    <Upload size={16} className="me-1" />
                    Choose Image
                  </label>
                  <div className="text-muted small mt-1">Max size: 5MB</div>
                </div>
              </div>
              {errors.profileImage && <div className="text-danger small mt-1">{errors.profileImage}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                placeholder="Your full name..."
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                disabled
                style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
              />
              <div className="text-muted small">Email cannot be changed</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="cnic" className="form-label">
                CNIC
              </label>
              <input
                type="text"
                className={`form-control ${errors.cnic ? "is-invalid" : ""}`}
                id="cnic"
                name="cnic"
                placeholder="XXXXX-XXXXXXX-X"
                value={formData.cnic}
                onChange={handleChange}
              />
              {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
                id="contactNumber"
                name="contactNumber"
                placeholder="+92 300 1234567"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="Your city..."
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                className="form-control"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                placeholder="Your full address..."
                value={formData.address}
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
              Save Changes
            </button>
          </div>
        </div>
      </form>
    )
  }

  return <div className="profile-form mt-4">{isEditing ? renderEditMode() : renderViewMode()}</div>
}

export default ProfileForm
