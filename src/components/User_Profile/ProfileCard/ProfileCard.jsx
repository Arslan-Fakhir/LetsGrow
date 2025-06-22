"use client"

import { useState } from "react"
import ProfileForm from "../ProfileForm/ProfileForm"
import ProfileHeader from "../ProfileHeader/ProfileHeader"
import "./ProfileCard.css"

const ProfileCard = ({ userData, onUpdate, error }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSubmit = async (formData) => {
    try {
      await onUpdate(formData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      setIsEditing(false)
    } catch (err) {
      console.error('Update error:', err)
    }
  }

  return (
    <div className="card border-0 shadow-sm profile-card">
      <div className="card-body p-4">
        <ProfileHeader 
          userData={userData} 
          isEditing={isEditing} 
          onEditClick={() => setIsEditing(true)} 
        />

        <ProfileForm
          userData={userData}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSubmit}
        />

        {saveSuccess && (
          <div className="alert alert-success mt-3">
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCard