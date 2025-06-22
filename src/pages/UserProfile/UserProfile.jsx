"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ProfileCard from "../../components/User_Profile/ProfileCard/ProfileCard"
import { useAuth } from "../../context/AuthContext"
import "./UserProfile.css"

const UserProfile = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const { auth } = useAuth()

  // Function to determine dashboard path based on user role
  const getDashboardPath = () => {
    if (!auth.user) return "/"
    switch(auth.user.role) {
      case "admin":
        return "/admin"
      case "entrepreneur":
        return "/dashboard"
      case "investor":
        return "/investor-dashboard"
      default:
        return "/"
    }
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }

        const data = await response.json()
        if (data.ok) {
          setUserData({
            ...data.data,
            // Ensure location fields exist
            location: {
              address: data.data.location?.address || '',
              city: data.data.location?.city || '',
              country: data.data.location?.country || ''
            }
          })
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (auth.user) {
      fetchUserProfile()
    }
  }, [auth.user])

  const handleProfileUpdate = async (formData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Separate image upload if exists
      if (formData.profileImage instanceof File) {
        const imageFormData = new FormData()
        imageFormData.append('profileImage', formData.profileImage)
        
        const imageResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile/image`, {
          method: 'PUT',
          credentials: 'include',
          body: imageFormData
        })

        if (!imageResponse.ok) {
          throw new Error('Failed to update profile image')
        }
      }

      // Prepare profile update data
      const profileData = {
        name: formData.name,
        contactNumber: formData.contactNumber,
        cnic: formData.cnic,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }

      // Remove empty password fields
      if (!profileData.currentPassword) {
        delete profileData.currentPassword
        delete profileData.newPassword
      }

      const profileResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      })

      if (!profileResponse.ok) {
        throw new Error('Failed to update profile')
      }

      const data = await profileResponse.json()
      if (data.ok) {
        setUserData(prev => ({
          ...prev,
          ...data.data,
          location: {
            address: data.data.location?.address || prev.location?.address || '',
            city: data.data.location?.city || prev.location?.city || '',
            country: data.data.location?.country || prev.location?.country || ''
          }
        }))
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="vh-100">
      <main className="overflow-auto bg-light">
        <div className="user-profile-container p-4">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a 
                  href="#" 
                  className="text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(getDashboardPath())
                  }}
                >
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                My Profile
              </li>
            </ol>
          </nav>

          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : userData ? (
            <ProfileCard 
              userData={userData} 
              onUpdate={handleProfileUpdate} 
              error={error}
            />
          ) : (
            <div className="alert alert-danger">
              {error || 'Failed to load profile data'}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default UserProfile