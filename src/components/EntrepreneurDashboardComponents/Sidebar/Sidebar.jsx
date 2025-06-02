"use client"

import { Link, useLocation } from "react-router-dom"
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
} from "lucide-react"
import "./Sidebar.css"

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

  return menuItems[role] || menuItems.entrepreneur
}

const Sidebar = ({ activeMenuItem, setActiveMenuItem, sidebarExpanded, toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const location = useLocation()
  const userRole = "entrepreneur"

  // Mock user data - replace with actual user data from your auth system
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null, // You can add avatar URL here
  }

  const { main: menuItems, additional: additionalMenuItems } = getMenuItems(userRole)

  useEffect(() => {
    const path = location.pathname
    const menuItem =
      menuItems.find((item) => item.path === path) || additionalMenuItems.find((item) => item.path === path)

    if (menuItem) {
      setActiveMenuItem(menuItem.name)
    }
  }, [location, setActiveMenuItem])

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...")
    // Example: clear tokens, redirect to login, etc.
    // localStorage.removeItem('authToken');
    // navigate('/login');
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
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <Link to="/" className="text-decoration-none text-dark d-flex align-items-center gap-2">
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

          <nav className="sidebar-nav flex-grow-1">
            {menuItems.map((item) => (
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

            {sidebarExpanded && <div className="px-3 py-2 mt-3 small text-muted">GROWTH & PROGRESS</div>}

            {additionalMenuItems.map((item) => (
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
                  {userData.avatar ? (
                    <img
                      src={userData.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    <User size={12} />
                  )}
                </div>
                {sidebarExpanded && (
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
            >
              <div className="d-flex align-items-center gap-3">
                <LogOut size={20} />
                {sidebarExpanded && <span>Logout</span>}
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
