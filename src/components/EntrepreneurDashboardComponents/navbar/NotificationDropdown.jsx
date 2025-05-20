"use client"

import { useRef, useEffect } from "react"
import { Bell, UserPlus, Lightbulb } from "lucide-react"
import "./NotificationDropdown.css"

const NotificationDropdown = ({ isOpen, setIsOpen, closeAllDropdowns }) => {
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

  const notifications = [
    {
      id: 1,
      icon: <UserPlus size={16} className="text-success" />,
      bgColor: "bg-success bg-opacity-10",
      title: "New investor registered",
      time: "2 minutes ago",
    },
    {
      id: 2,
      icon: <Lightbulb size={16} className="text-primary" />,
      bgColor: "bg-primary bg-opacity-10",
      title: "New idea submitted",
      time: "1 hour ago",
    },
  ]

  return (
    <div className="dropdown notification-dropdown-container" ref={dropdownRef}>
      <button className="btn btn-link text-white notification-btn" onClick={toggleDropdown}>
        <Bell size={20} />
        <span className="badge rounded-pill bg-danger notification-badge">2</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu dropdown-menu-end shadow notification-dropdown show">
          <div className="notification-header">
            <h6 className="mb-0">Notifications</h6>
            <button className="btn btn-link btn-sm text-decoration-none p-0">Mark all as read</button>
          </div>

          <div className="notification-list">
            {notifications.map((notification) => (
              <a key={notification.id} href="#" className="dropdown-item notification-item">
                <div className={`notification-icon ${notification.bgColor}`}>{notification.icon}</div>
                <div>
                  <div className="fw-medium">{notification.title}</div>
                  <small className="text-muted">{notification.time}</small>
                </div>
              </a>
            ))}
          </div>

          <div className="notification-footer">
            <a href="#" className="text-decoration-none small">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown
