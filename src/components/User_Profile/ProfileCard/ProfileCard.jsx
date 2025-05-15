"use client"

import { useState } from "react"
import ProfileForm from "../ProfileForm/ProfileForm"
import ProfileHeader from "../ProfileHeader/ProfileHeader"
import "./ProfileCard.css"

const ProfileCard = ({ userData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSubmit = (formData) => {
    // Call the parent component's update function
    onUpdate(formData)

    // Show success message
    setSaveSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)

    // Exit edit mode
    setIsEditing(false)
  }

  return (
    <div className="card border-0 shadow-sm profile-card">
      <div className="card-body p-4">
        <ProfileHeader userData={userData} isEditing={isEditing} onEditClick={() => setIsEditing(true)} />

        <ProfileForm
          userData={userData}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSubmit}
        />

        {/* Success Message */}
        {saveSuccess && (
          <div className="save-success-message">
            <div className="alert alert-success d-flex align-items-center" role="alert">
              <div>Profile updated successfully!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCard
