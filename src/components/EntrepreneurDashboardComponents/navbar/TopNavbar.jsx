"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import DesktopNav from "./DesktopNav"
import NotificationDropdown from "./NotificationDropdown"
import ProfileDropdown from "./ProfileDropdown"
import MobileMenu from "./MobileMenu"
import LogoutConfirmModal from "./LogoutConfirmModal"
import "./TopNavbar.css"

const TopNavbar = ({ toggleSidebar }) => {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigate = useNavigate()

  const closeAllDropdowns = () => {
    setNotificationOpen(false)
    setProfileOpen(false)
  }

  const handleLogoutClick = (e) => {
    e.preventDefault()
    setShowLogoutConfirm(true)
    setProfileOpen(false)
  }

  const handleLogoutConfirm = () => {
    navigate("/login")
    setShowLogoutConfirm(false)
  }

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top navbar-custom">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-link text-white d-lg-none me-3 mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <a href="/" className="navbar-brand d-flex align-items-center">
              <img src="/logo.svg" alt="Company Logo" height="40" />
            </a>
          </div>

          <DesktopNav />

          <div className="d-flex align-items-center">
            <NotificationDropdown
              isOpen={notificationOpen}
              setIsOpen={setNotificationOpen}
              closeAllDropdowns={closeAllDropdowns}
            />

            <ProfileDropdown
              isOpen={profileOpen}
              setIsOpen={setProfileOpen}
              handleLogoutClick={handleLogoutClick}
              closeAllDropdowns={closeAllDropdowns}
            />
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />

      {showLogoutConfirm && <LogoutConfirmModal onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />}
    </>
  )
}

export default TopNavbar
