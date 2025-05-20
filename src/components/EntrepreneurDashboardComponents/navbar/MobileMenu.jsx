"use client"

import { useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import "./MobileMenu.css"

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/service", label: "Service" },
    { path: "/contact", label: "Contact Us" },
    { path: "/about", label: "About Us" },
    { path: "/help", label: "Help & FAQs" },
  ]

  return (
    <div className="mobile-menu-overlay">
      <div ref={menuRef} className="mobile-menu-container">
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <img src="/logo.svg" alt="Company Logo" height="32" />
            <button className="btn-close btn-close-white" onClick={() => setIsOpen(false)}></button>
          </div>

          <div className="mobile-menu-body">
            <div className="mobile-menu-nav">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mobile-menu-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
