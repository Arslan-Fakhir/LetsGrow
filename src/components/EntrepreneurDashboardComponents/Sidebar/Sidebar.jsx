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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

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
  toggleSidebar 
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
      
      const response = await fetch(`${API_BASE_URL}/auth/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await response.json()

      if (data.ok && data.data) {
        setUserData(data.data)
      } else {
        throw new Error(data.message || 'Failed to fetch user data')
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError(err.message)
      
      // If it's an auth error, redirect to login
      if (err.message.includes('unauthorized') || err.message.includes('token') || err.message.includes('Invalid')) {
        navigate('/login')
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
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await response.json()

      if (data.ok) {
        setUserData(null)
        navigate('/login')
        console.log('Logged out successfully')
      } else {
        throw new Error(data.message || 'Logout failed')
      }
    } catch (err) {
      console.error('Logout error:', err)
      // Even if logout fails on server, clear local state and redirect
      setUserData(null)
      navigate('/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Check authentication status and fetch user data on component mount
  useEffect(() => {
    const initializeUser = async () => {
      try {
        // First check if user is authenticated
        const authResponse = await fetch(`${API_BASE_URL}/auth/checklogin`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        const authData = await authResponse.json()

        if (authData.ok) {
          // User is authenticated, fetch user data
          await fetchUserData()
        } else {
          // User is not authenticated, redirect to login
          navigate('/login')
        }
      } catch (err) {
        console.error('Auth check error:', err)
        navigate('/login')
      }
    }

    initializeUser()
  }, [navigate])

  // Get menu items based on user role
  const userRole = userData?.role || 'entrepreneur'
  const { main: menuItems, additional: additionalMenuItems } = getMenuItems(userRole)

  // Set active menu item based on current path
  useEffect(() => {
    const path = location.pathname
    const menuItem =
      menuItems.find((item) => item.path === path) || 
      additionalMenuItems.find((item) => item.path === path)

    if (menuItem) {
      setActiveMenuItem(menuItem.name)
    }
  }, [location, menuItems, additionalMenuItems, setActiveMenuItem])

  // Filter menu items based on search query
  const filteredMainItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredAdditionalItems = additionalMenuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Loading state
  if (isLoading) {
    return (
      <>
        <button
          className="d-md-none position-fixed bottom-0 end-0 m-3 btn btn-success rounded-circle z-3 shadow"
          style={{ width: "50px", height: "50px" }}
          onClick={toggleSidebar}
          aria-label={sidebarExpanded ? "Close menu" : "Open menu"}
        >
          {sidebarExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>

        <aside className={sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}>
          <div className="sidebar-content d-flex flex-column h-100 justify-content-center align-items-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            {sidebarExpanded && <p className="mt-2 text-muted">Loading user data...</p>}
          </div>
        </aside>
      </>
    )
  }

  // Error state
  if (error && !userData) {
    return (
      <>
        <button
          className="d-md-none position-fixed bottom-0 end-0 m-3 btn btn-success rounded-circle z-3 shadow"
          style={{ width: "50px", height: "50px" }}
          onClick={toggleSidebar}
          aria-label={sidebarExpanded ? "Close menu" : "Open menu"}
        >
          {sidebarExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>

        <aside className={sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}>
          <div className="sidebar-content d-flex flex-column h-100 justify-content-center align-items-center">
            <div className="text-danger">
              <AlertCircle size={48} />
            </div>
            {sidebarExpanded && (
              <div className="text-center mt-2">
                <p className="text-danger">Error loading sidebar</p>
                <small className="text-muted d-block mb-2">{error}</small>
                <button 
                  className="btn btn-sm btn-outline-success" 
                  onClick={fetchUserData}
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </aside>
      </>
    )
  }

  return (
    <>
      <button
        className="d-md-none position-fixed bottom-0 end-0 m-3 btn btn-success rounded-circle z-3 shadow"
        style={{ width: "50px", height: "50px" }}
        onClick={toggleSidebar}
        aria-label={sidebarExpanded ? "Close menu" : "Open menu"}
      >
        {sidebarExpanded ? <X size={24} /> : <Menu size={24} />}
      </button>

      {sidebarExpanded && (
        <div
          className="sidebar-overlay show d-md-none"
          onClick={toggleSidebar}
          role="button"
          aria-label="Close menu"
          tabIndex={0}
        />
      )}

      <aside className={sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"} aria-expanded={sidebarExpanded}>
        <div className="sidebar-content d-flex flex-column h-100">
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <Link to="/dashboard" className="text-decoration-none text-dark d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
              >
                <Briefcase size={24} className="text-success" />
              </div>
              {sidebarExpanded && <span className="fs-5 fw-bold">let's grow</span>}
            </Link>
            <button
              className="btn btn-sm btn-light d-none d-md-flex"
              onClick={toggleSidebar}
              aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>

          {/* Search */}
          <div className="p-3">
            <div className="position-relative">
              <Search
                className="position-absolute"
                style={{
                  top: "10px",
                  left: sidebarExpanded ? "12px" : "8px",
                  color: "#6c757d",
                }}
                size={16}
              />
              <input
                type="text"
                placeholder={sidebarExpanded ? "Search..." : ""}
                className="form-control"
                style={{
                  paddingLeft: sidebarExpanded ? "35px" : "30px",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="sidebar-nav flex-grow-1">
            {/* Role-based badge */}
            {sidebarExpanded && userData?.role && (
              <div className="px-3 pb-2">
                <span className={`badge ${
                  userData.role === 'admin' ? 'bg-danger' : 
                  userData.role === 'investor' ? 'bg-primary' : 'bg-success'
                }`}>
                  {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                </span>
              </div>
            )}

            {/* Main Menu Items */}
            {filteredMainItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`btn btn-link text-decoration-none text-dark w-100 text-start py-2 px-3 border-0 menu-item ${
                  activeMenuItem === item.name ? "active-menu-item" : ""
                }`}
                onClick={() => setActiveMenuItem(item.name)}
              >
                <div className="d-flex align-items-center gap-3">
                  <item.icon size={20} className={activeMenuItem === item.name ? "text-success" : "text-secondary"} />
                  {sidebarExpanded && <span>{item.name}</span>}
                </div>
              </Link>
            ))}

            {/* Additional Menu Items */}
            {filteredAdditionalItems.length > 0 && (
              <>
                {sidebarExpanded && <div className="px-3 py-2 mt-3 small text-muted">GROWTH & PROGRESS</div>}
                {filteredAdditionalItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`btn btn-link text-decoration-none text-dark w-100 text-start py-2 px-3 border-0 menu-item ${
                      activeMenuItem === item.name ? "active-menu-item" : ""
                    }`}
                    onClick={() => setActiveMenuItem(item.name)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <item.icon size={20} className={activeMenuItem === item.name ? "text-success" : "text-secondary"} />
                      {sidebarExpanded && <span>{item.name}</span>}
                    </div>
                  </Link>
                ))}
              </>
            )}

            {/* No search results */}
            {searchQuery && filteredMainItems.length === 0 && filteredAdditionalItems.length === 0 && sidebarExpanded && (
              <div className="px-3 py-4 text-center text-muted">
                <Search size={32} className="mb-2 opacity-50" />
                <p className="small">No menu items found</p>
              </div>
            )}
          </nav>

          {/* User Profile and Logout Section */}
          <div className="border-top mt-auto">
            {/* Profile Section */}
            <Link
              to="/profile"
              className={`btn btn-link text-decoration-none text-dark w-100 text-start py-2 px-3 border-0 menu-item ${
                activeMenuItem === "Profile" ? "active-menu-item" : ""
              }`}
              onClick={() => setActiveMenuItem("Profile")}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center bg-success text-white rounded-circle"
                  style={{ width: "20px", height: "20px", fontSize: "12px" }}
                >
                  {userData?.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "20px", height: "20px" }}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
                      }}
                    />
                  ) : (
                    <User size={12} />
                  )}
                </div>
                {sidebarExpanded && userData && (
                  <div className="d-flex flex-column">
                    <span className="small fw-medium">{userData.name}</span>
                    <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                      {userData.email}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Logout Button */}
            <button
              className="btn btn-link text-decoration-none text-danger w-100 text-start py-2 px-3 border-0 menu-item"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <div className="d-flex align-items-center gap-3">
                {isLoggingOut ? (
                  <div className="spinner-border spinner-border-sm text-danger" role="status">
                    <span className="visually-hidden">Logging out...</span>
                  </div>
                ) : (
                  <LogOut size={20} />
                )}
                {sidebarExpanded && (
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                )}
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar