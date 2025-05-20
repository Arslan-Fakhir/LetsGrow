"use client"

import { useRef, useEffect } from "react"
import { User, Settings, HelpCircle, LogOut } from "lucide-react"
import "./ProfileDropdown.css"

const ProfileDropdown = ({ isOpen, setIsOpen, handleLogoutClick, closeAllDropdowns }) => {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.body.classList.add("dropdown-open")
    } else {
      document.body.classList.remove("dropdown-open")
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.body.classList.remove("dropdown-open")
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  const toggleDropdown = () => {
    if (!isOpen) {
      closeAllDropdowns()
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className="dropdown profile-dropdown-container" ref={dropdownRef}>
      <button className="btn btn-link p-0 profile-btn" onClick={toggleDropdown}>
        <img
          src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
          alt="Profile"
          className="rounded-circle"
          width="36"
          height="36"
        />
      </button>

      {isOpen && (
        <div className="dropdown-menu dropdown-menu-end shadow profile-dropdown show">
          <div className="profile-header">
            <div className="fw-bold">John Doe</div>
            <div className="small text-muted">john.doe@example.com</div>
          </div>

          <a href="/profile" className="dropdown-item profile-menu-item">
            <User size={16} className="profile-menu-icon" />
            <span>My Profile</span>
          </a>

          <a href="/settings" className="dropdown-item profile-menu-item">
            <Settings size={16} className="profile-menu-icon" />
            <span>Settings</span>
          </a>

          <a href="/help" className="dropdown-item profile-menu-item">
            <HelpCircle size={16} className="profile-menu-icon" />
            <span>Help Center</span>
          </a>

          <div className="dropdown-divider"></div>

          <a href="#" className="dropdown-item profile-menu-item danger text-danger" onClick={handleLogoutClick}>
            <LogOut size={16} className="profile-menu-icon" />
            <span>Logout</span>
          </a>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown
