"use client"

import { Edit } from "lucide-react"
import "./ProfileHeader.css"
import { useEffect, useState } from "react"

const ProfileHeader = ({ userData, isEditing, onEditClick }) => {
  const [profileImage, setProfileImage] = useState("/placeholder-user.png")

  useEffect(() => {
    // Check if user has a profile image
    if (userData?.profileImage?.url) {
      // If it's a Cloudinary URL, we can use it directly
      if (userData.profileImage.url.includes('res.cloudinary.com')) {
        setProfileImage(userData.profileImage.url)
      } 
      // If it's a local file (during upload preview)
      else if (userData.profileImage.url.startsWith('blob:')) {
        setProfileImage(userData.profileImage.url)
      }
    } else {
      // Fallback to placeholder
      setProfileImage("/placeholder-user.png")
    }
  }, [userData?.profileImage])

  return (
    <div className="profile-header mb-4">
      <div className="d-flex align-items-center">
        <div className="profile-image-container">
          <img
            src={profileImage}
            alt="User profile"
            className="rounded-circle"
            width="76"
            height="76"
            style={{ 
              objectFit: "cover",
              border: "2px solid #e9ecef"
            }}
            onError={(e) => {
              e.target.src = "/placeholder-user.png"
              setProfileImage("/placeholder-user.png")
            }}
          />
        </div>
        <div className="ms-3">
          <h3 className="mb-0 fw-bold">{userData?.fullName || "User"}</h3>
          <p className="text-muted mb-0">{userData?.email || ""}</p>

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