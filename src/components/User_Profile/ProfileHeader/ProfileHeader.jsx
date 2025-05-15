"use client"

import { Edit } from "lucide-react"
import "./ProfileHeader.css"

const ProfileHeader = ({ userData, isEditing, onEditClick }) => {
  return (
    <div className="profile-header mb-4">
      <div className="d-flex align-items-center">
        <div className="profile-image-container">
          <img
              src="/placeholder-user.png"
              alt="User profile"
              className="rounded-circle"
              width="76"
              height="76"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/40"
              }}
            />
        </div>
        <div className="ms-3">
          <h3 className="mb-0 fw-bold">{userData.fullName}</h3>
          <p className="text-muted mb-0">{userData.email}</p>

          {!isEditing && (
            <button
              className="btn btn-sm btn-outline-success mt-2 d-flex align-items-center gap-1"
              onClick={onEditClick}
            >
              <Edit size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
