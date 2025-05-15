"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Sidebar from "../../components/Admin_Dashboard/Sidebar/Sidebar"
import TopNavbar from "../../components/Admin_Dashboard/TopNavbar/TopNavbar"
import ProfileCard from "../../components/User_Profile/ProfileCard/ProfileCard"
import "./UserProfile.css"

const UserProfile = () => {
  const location = useLocation()
  const [activeMenuItem, setActiveMenuItem] = useState("My Profile")
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isLoading, setIsLoading] = useState(true)

  // Mock user data
  const [userData, setUserData] = useState({
    id: 1,
    fullName: "Ahmad Nadeem",
    email: "ahmad311@gmail.com",
    address: "123 Main Street, Lahore, Pakistan",
    contact: "+92 300 1234567",
    profileImage: "/placeholder-user.jpg",
  })

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth < 768) {
        setSidebarExpanded(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on first render

    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  // Handle profile update
  const handleProfileUpdate = (updatedData) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setUserData({
        ...userData,
        ...updatedData,
      })
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        sidebarExpanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column transition-all"
        style={{
          marginLeft: windowWidth >= 768 ? (sidebarExpanded ? "250px" : "80px") : "0",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <TopNavbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-grow-1 overflow-auto bg-light">
          <div className="user-profile-container p-4">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/" className="text-decoration-none">
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
            ) : (
              <ProfileCard userData={userData} onUpdate={handleProfileUpdate} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserProfile;
