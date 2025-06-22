"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  Search,
  LogOut,
  Home,
  FileText,
  Settings,
  PieChart,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Target,
  Users,
  DollarSign,
  Briefcase,
  User,
  AlertCircle,
} from "lucide-react"
import "./Sidebar.css"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

const getMenuItems = (role) => {
  const menuItems = {
    entrepreneur: {
      main: [
        { name: "Dashboard", icon: Home, path: "/dashboard" },
        { name: "My Startup", icon: Briefcase, path: "/my-startup" },
        { name: "Settings", icon: Settings, path: "/settings" },
      ],
      additional: [
        { name: "Analytics", icon: PieChart, path: "/analytics" },
        { name: "Startup Progress", icon: Target, path: "/progress" },
        { name: "Funding", icon: DollarSign, path: "/funding" },
      ],
    },
    investor: {
      main: [
        { name: "Dashboard", icon: Home, path: "/dashboard" },
        { name: "Investment Portfolio", icon: DollarSign, path: "/portfolio" },
        { name: "Startup Discovery", icon: Target, path: "/discover" },
        { name: "Due Diligence", icon: FileText, path: "/due-diligence" },
        { name: "Settings", icon: Settings, path: "/settings" },
      ],
      additional: [{ name: "Analytics", icon: PieChart, path: "/analytics" }],
    },
    admin: {
      main: [
        { name: "Dashboard", icon: Home, path: "/dashboard" },
        { name: "Manage Users", icon: Users, path: "/users" },
        { name: "Manage Startups", icon: Briefcase, path: "/startups" },
        { name: "Manage Investments", icon: DollarSign, path: "/investments" },
        { name: "Reports", icon: FileText, path: "/reports" },
        { name: "Settings", icon: Settings, path: "/settings" },
      ],
      additional: [{ name: "System Logs", icon: PieChart, path: "/logs" }],
    },
  }

  return menuItems[role]
}

const Sidebar = ({
  activeMenuItem: propActiveMenuItem,
  setActiveMenuItem: propSetActiveMenuItem,
  sidebarExpanded,
  toggleSidebar,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  // Create internal state if prop is not provided
  const [internalActiveMenuItem, internalSetActiveMenuItem] = useState("Dashboard")
  const activeMenuItem = propActiveMenuItem !== undefined ? propActiveMenuItem : internalActiveMenuItem
  const setActiveMenuItem = propSetActiveMenuItem !== undefined ? propSetActiveMenuItem : internalSetActiveMenuItem

  // API Functions
  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      const data = await response.json()

      if (data.ok && data.data) {
        setUserData(data.data)
      } else {
        throw new Error(data.message || "Failed to fetch user data")
      }
    } catch (err) {
      console.error("Error fetching user data:", err)
      setError(err.message)

      if (err.message.includes("unauthorized") || err.message.includes("token") || err.message.includes("Invalid")) {
        navigate("/login")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    if (isLoggingOut) return

    try {
      setIsLoggingOut(true)

      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      const data = await response.json()

      if (data.ok) {
        setUserData(null)
        navigate("/login")
        console.log("Logged out successfully")
      } else {
        throw new Error(data.message || "Logout failed")
      }
    } catch (err) {
      console.error("Logout error:", err)
      setUserData(null)
      navigate("/login")
    } finally {
      setIsLoggingOut(false)
    }
  }

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const authResponse = await fetch(`${API_BASE_URL}/auth/checklogin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })

        const authData = await authResponse.json()

        if (authData.ok) {
          await fetchUserData()
        } else {
          navigate("/login")
        }
      } catch (err) {
        console.error("Auth check error:", err)
        navigate("/login")
      }
    }

    initializeUser()
  }, [navigate])

  const userRole = userData?.role || "entrepreneur"
  const { main: menuItems, additional: additionalMenuItems } = getMenuItems(userRole)

  useEffect(() => {
    const path = location.pathname
    const menuItem =
      menuItems.find((item) => item.path === path) || additionalMenuItems.find((item) => item.path === path)

    if (menuItem) {
      setActiveMenuItem(menuItem.name)
    }
  }, [location, menuItems, additionalMenuItems, setActiveMenuItem])

  const filteredMainItems = menuItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredAdditionalItems = additionalMenuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <>
        <button
          className="sidebar-toggle-btn d-md-none"
          onClick={toggleSidebar}
          aria-label={sidebarExpanded ? "Close menu" : "Open menu"}
        >
          {sidebarExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>

        <aside className={`sidebar ${sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
          <div className="sidebar-content">
            <div className="d-flex flex-column h-100 justify-content-center align-items-center">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              {sidebarExpanded && <p className="mt-2 text-muted">Loading user data...</p>}
            </div>
          </div>
        </aside>
      </>
    )
  }

  if (error && !userData) {
    return (
      <>
        <button
          className="sidebar-toggle-btn d-md-none"
          onClick={toggleSidebar}
          aria-label={sidebarExpanded ? "Close menu" : "Open menu"}
        >
          {sidebarExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>

        <aside className={`sidebar ${sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
          <div className="sidebar-content">
            <div className="d-flex flex-column h-100 justify-content-center align-items-center p-3">
              <div className="text-danger mb-2">
                <AlertCircle size={48} />
              </div>
              {sidebarExpanded && (
                <div className="text-center">
                  <p className="text-danger mb-1">Error loading sidebar</p>
                  <small className="text-muted d-block mb-3">{error}</small>
                  <button className="btn btn-sm btn-outline-success" onClick={fetchUserData}>
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>
      </>
    )
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sidebar-toggle-btn d-md-none"
        onClick={toggleSidebar}
        aria-label={sidebarExpanded ? "Close menu" : "Open menu"}
      >
        {sidebarExpanded ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {sidebarExpanded && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={toggleSidebar}
          role="button"
          aria-label="Close menu"
          tabIndex={0}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}
        aria-expanded={sidebarExpanded}
      >
        <div className="sidebar-content">
          {/* Header */}
          <div className="sidebar-header">
            <Link to="/dashboard" className="sidebar-brand">
              <div className="brand-icon">
                <Briefcase size={24} className="text-success" />
              </div>
              {sidebarExpanded && <span className="brand-text">let's grow</span>}
            </Link>
            <button
              className="sidebar-collapse-btn d-none d-md-flex"
              onClick={toggleSidebar}
              aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>

          {/* Search */}
          <div className="sidebar-search">
            <div className="search-wrapper">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder={sidebarExpanded ? "Search..." : ""}
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            {/* Role Badge */}
            {sidebarExpanded && userData?.role && (
              <div className="role-badge-container">
                <span
                  className={`role-badge ${
                    userData.role === "admin"
                      ? "role-admin"
                      : userData.role === "investor"
                        ? "role-investor"
                        : "role-entrepreneur"
                  }`}
                >
                  {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                </span>
              </div>
            )}

            {/* Main Menu Items */}
            <div className="nav-section">
              {filteredMainItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-item ${activeMenuItem === item.name ? "nav-item-active" : ""}`}
                  onClick={() => setActiveMenuItem(item.name)}
                >
                  <item.icon size={20} className="nav-icon" />
                  {sidebarExpanded && <span className="nav-text">{item.name}</span>}
                </Link>
              ))}
            </div>

            {/* Additional Menu Items */}
            {filteredAdditionalItems.length > 0 && (
              <div className="nav-section">
                {sidebarExpanded && <div className="nav-section-title">GROWTH & PROGRESS</div>}
                {filteredAdditionalItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-item ${activeMenuItem === item.name ? "nav-item-active" : ""}`}
                    onClick={() => setActiveMenuItem(item.name)}
                  >
                    <item.icon size={20} className="nav-icon" />
                    {sidebarExpanded && <span className="nav-text">{item.name}</span>}
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {searchQuery &&
              filteredMainItems.length === 0 &&
              filteredAdditionalItems.length === 0 &&
              sidebarExpanded && (
                <div className="no-results">
                  <Search size={32} className="no-results-icon" />
                  <p className="no-results-text">No menu items found</p>
                </div>
              )}
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            {/* Profile */}
            <Link
              to="/user-profile"
              className={`nav-item ${activeMenuItem === "Profile" ? "nav-item-active" : ""}`}
              onClick={() => setActiveMenuItem("Profile")}
            >
              <div className="profile-avatar">
                {userData?.profileImage?.url ? (
                  <img
                    src={userData.profileImage.url || "/placeholder.svg"}
                    alt="Profile"
                    className="profile-image"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://via.placeholder.com/32"
                    }}
                  />
                ) : (
                  <div className="profile-placeholder">
                    <User size={16} />
                  </div>
                )}
              </div>
              {sidebarExpanded && userData && (
                <div className="profile-info">
                  <span className="profile-name">{userData.name}</span>
                  <span className="profile-email">{userData.email}</span>
                </div>
              )}
            </Link>

            {/* Logout */}
            <button className="nav-item nav-item-logout" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? (
                <div className="spinner-border spinner-border-sm text-danger" role="status">
                  <span className="visually-hidden">Logging out...</span>
                </div>
              ) : (
                <LogOut size={20} className="nav-icon" />
              )}
              {sidebarExpanded && <span className="nav-text">{isLoggingOut ? "Logging out..." : "Logout"}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
