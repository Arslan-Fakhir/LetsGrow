"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  UserPlus,
  Lightbulb,
  X,
  Globe,
  ChevronDown,
} from "lucide-react"
import "./TopNavbar.css"
import logo from "../../../assets/logo.svg";

const TopNavbar = ({ toggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("English")

  const navigate = useNavigate()
  const notificationRef = useRef(null)
  const profileRef = useRef(null)
  const logoutModalRef = useRef(null)
  const languageRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleLogoutClick = (e) => {
    e.preventDefault()
    setShowLogoutConfirm(true)
    setProfileOpen(false) // Close the profile dropdown
  }

  const handleLogoutConfirm = () => {
    // Perform logout actions here (clear tokens, etc.)
    // Then redirect to login page
    navigate("/login") // Redirect to your existing login page
    setShowLogoutConfirm(false)
  }

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false)
  }

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
    setLanguageOpen(false)
    // Implement language change functionality here
  }

  return (
    <>
      <header className="navbar-custom text-white py-2 px-3 d-flex align-items-center justify-content-between sticky-top">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn-navbar btn-sm d-md-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-decoration-none text-white brand-logo">
            <img src={logo} alt="Company Logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Navigation links moved to the right - Desktop */}
        <nav className="d-none d-md-flex align-items-center justify-content-end gap-4 ms-auto main-nav">
          <Link to="/" className="text-success text-decoration-none nav-link-hover">
            Home
          </Link>
          <Link to="/service" className="text-white text-decoration-none nav-link-hover">
            Service
          </Link>
          <Link to="/contact" className="text-white text-decoration-none nav-link-hover">
            Contact Us
          </Link>
          <Link to="/about" className="text-white text-decoration-none nav-link-hover">
            About Us
          </Link>
          <Link to="/help" className="text-white text-decoration-none nav-link-hover">
            Help & FAQs
          </Link>
        </nav>

        <div className="d-flex align-items-center gap-3 ms-3">
          {/* Language Selector */}
          <div className="position-relative d-none d-md-block" ref={languageRef}>
            <button
              className="btn-navbar p-0 d-flex align-items-center"
              onClick={() => setLanguageOpen(!languageOpen)}
              aria-label="Select language"
            >
              <Globe size={20} />
              <span className="ms-1 d-none d-lg-inline-block">{currentLanguage}</span>
              <ChevronDown size={16} className="ms-1" />
            </button>
            {languageOpen && (
              <div className="position-absolute end-0 mt-2 bg-white rounded shadow custom-dropdown-menu language-menu">
                <button
                  className={`dropdown-item ${currentLanguage === "English" ? "active" : ""}`}
                  onClick={() => changeLanguage("English")}
                >
                  English
                </button>
                <button
                  className={`dropdown-item ${currentLanguage === "Español" ? "active" : ""}`}
                  onClick={() => changeLanguage("Español")}
                >
                  Español
                </button>
                <button
                  className={`dropdown-item ${currentLanguage === "Français" ? "active" : ""}`}
                  onClick={() => changeLanguage("Français")}
                >
                  Français
                </button>
                <button
                  className={`dropdown-item ${currentLanguage === "中文" ? "active" : ""}`}
                  onClick={() => changeLanguage("中文")}
                >
                  中文
                </button>
              </div>
            )}
          </div>

          <div className="d-none d-md-block text-light">
            <small>
              {currentTime.toLocaleDateString()} |{" "}
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </small>
          </div>

          {/* Notification Dropdown */}
          <div className="position-relative" ref={notificationRef}>
            <button
              className="btn-navbar p-0 position-relative"
              onClick={() => setNotificationOpen(!notificationOpen)}
              aria-label="Notifications"
            >
              <Bell size={22} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
                2
              </span>
            </button>
            {notificationOpen && (
              <div className="position-absolute end-0 mt-2 bg-white rounded shadow custom-dropdown-menu notification-menu">
                <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
                  <span className="fw-medium text-dark">Notifications</span>
                  <a href="#" className="text-decoration-none small">
                    Mark all as read
                  </a>
                </div>
                <div className="notification-list">
                  <a href="#" className="notification-item">
                    <div className="d-flex gap-2">
                      <div className="notification-icon bg-success-soft">
                        <UserPlus size={16} className="text-success" />
                      </div>
                      <div>
                        <div className="fw-medium">New investor registered</div>
                        <div className="text-secondary small">2 minutes ago</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="notification-item">
                    <div className="d-flex gap-2">
                      <div className="notification-icon bg-primary-soft">
                        <Lightbulb size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="fw-medium">New idea submitted</div>
                        <div className="text-secondary small">1 hour ago</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="p-2 text-center border-top">
                  <a href="#" className="text-decoration-none small">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="position-relative" ref={profileRef}>
            <button className="btn-navbar p-0" onClick={() => setProfileOpen(!profileOpen)} aria-label="User profile">
              <img
                src="/placeholder-user.png"
                alt="User profile"
                className="rounded-circle profile-image"
                width="40"
                height="40"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/40"
                }}
              />
            </button>
            {profileOpen && (
              <div className="position-absolute end-0 mt-2 bg-white rounded shadow custom-dropdown-menu profile-menu">
                <div className="px-3 py-2 border-bottom">
                  <div className="fw-bold">John Doe</div>
                  <div className="text-secondary small">john.doe@example.com</div>
                </div>
                <a href="#" className="profile-menu-item">
                  <User size={16} className="me-2" /> <span>Profile</span>
                </a>
                <a href="#" className="profile-menu-item">
                  <Settings size={16} className="me-2" /> <span>Account Settings</span>
                </a>
                <a href="#" className="profile-menu-item">
                  <HelpCircle size={16} className="me-2" /> <span>Help Center</span>
                </a>
                <div className="dropdown-divider my-1"></div>
                <a
                  href="#"
                  className="profile-menu-item text-danger"
                  onClick={handleLogoutClick}
                  data-logout-trigger="true"
                >
                  <LogOut size={16} className="me-2" /> <span>Log Out</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? "show" : ""}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <img src="/images/logo.svg" alt="Company Logo" className="mobile-menu-logo" />
            <button className="btn-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"></button>
          </div>
          <div className="mobile-menu-body">
            <nav className="mobile-nav">
              <Link to="/" className="mobile-nav-item active" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/service" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Service
              </Link>
              <Link to="/contact" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Contact Us
              </Link>
              <Link to="/about" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/help" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Help & FAQs
              </Link>
            </nav>
            <div className="mobile-menu-footer">
              <div className="d-flex justify-content-between align-items-center">
                <span>Language</span>
                <select
                  className="form-select form-select-sm"
                  value={currentLanguage}
                  onChange={(e) => changeLanguage(e.target.value)}
                  style={{ width: "120px" }}
                >
                  <option value="English">English</option>
                  <option value="Español">Español</option>
                  <option value="Français">Français</option>
                  <option value="中文">中文</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-container" ref={logoutModalRef}>
            <div className="logout-modal-content">
              <h5 className="mb-3">Confirm Logout</h5>
              <p>Are you sure you want to logout?</p>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="btn btn-secondary" onClick={handleLogoutCancel}>
                  No
                </button>
                <button className="btn btn-danger" onClick={handleLogoutConfirm}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TopNavbar
