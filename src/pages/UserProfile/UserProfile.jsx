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
  const { auth, logout } = useAuth()

  const getDashboardPath = () => {
    if (!auth.user) return "/login"
    switch(auth.user.role) {
      case "admin": return "/admin"
      case "entrepreneur": return "/dashboard"
      case "investor": return "/investor-dashboard"
      default: return "/login"
    }
  }

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          logout()
          navigate('/login')
          return
        }
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      if (data.ok) {
        setUserData({
          ...data.data,
          location: {
            address: data.data.location?.address || '',
            city: data.data.location?.city || '',
            country: data.data.location?.country || ''
          }
        })
      } else {
        throw new Error(data.message || 'Failed to fetch profile data')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError(error.message)
      if (error.message.includes('Unauthorized')) {
        logout()
        navigate('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (auth.user) {
      fetchUserProfile()
    } else if (auth.loading === false) {
      navigate('/login')
    }
  }, [auth.user, auth.loading, navigate])

  const handleProfileUpdate = async (formData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const formDataToSend = new FormData()
      
      // Append all profile data
      formDataToSend.append('name', formData.name)
      formDataToSend.append('contactNumber', formData.contactNumber)
      formDataToSend.append('cnic', formData.cnic)
      formDataToSend.append('address', formData.address)
      formDataToSend.append('city', formData.city)
      formDataToSend.append('country', formData.country)
      
      // Append password fields only if they exist
      if (formData.currentPassword) {
        formDataToSend.append('currentPassword', formData.currentPassword)
        formDataToSend.append('newPassword', formData.newPassword)
      }
      
      // Append image if it exists
      if (formData.profileImage instanceof File) {
        formDataToSend.append('profileImage', formData.profileImage)
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        body: formDataToSend // No Content-Type header - let browser set it with boundary
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update profile')
      }

      const data = await response.json()
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
        return true
      }
      return false
    } catch (error) {
      console.error('Error updating profile:', error)
      setError(error.message)
      if (error.message.includes('Unauthorized')) {
        logout()
        navigate('/login')
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  if (auth.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!auth.user) {
    return null
  }

  return (
    <div className="vh-100">
      <main className="overflow-auto bg-light">
        <div className="user-profile-container p-4">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <button 
                  className="btn btn-link text-decoration-none p-0 border-0 bg-transparent"
                  onClick={() => navigate(getDashboardPath())}
                >
                  Home
                </button>
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