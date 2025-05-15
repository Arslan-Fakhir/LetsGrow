"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import {
  Search,
  LogOut,
  Home,
  Lightbulb,
  Users,
  Award,
  FileText,
  Settings,
  PieChart,
  TrendingUp,
  MessageSquare,
  Calendar,
  Lock,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
} from "lucide-react"
import "./Sidebar.css"

const Sidebar = ({ activeMenuItem, setActiveMenuItem, sidebarExpanded, toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Manage Ideas", icon: Lightbulb, path: "/manage-ideas" },
    { name: "Manage Users", icon: Users, path: "/manage-users" },
    { name: "Our Leadership", icon: Award, path: "/leadership" },
    { name: "Latest News & Events", icon: FileText, path: "/news-events" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ]

  const additionalMenuItems = [
    { name: "Analytics", icon: PieChart, path: "/analytics" },
    { name: "Investments", icon: TrendingUp, path: "/investments" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Security", icon: Lock, path: "/security" },
  ]

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        className="d-md-none position-fixed bottom-0 end-0 m-3 btn btn-success rounded-circle z-3 shadow"
        style={{ width: "50px", height: "50px" }}
        onClick={toggleSidebar}
        aria-label={sidebarExpanded ? "Close menu" : "Open menu"}
      >
        {sidebarExpanded ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarExpanded && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 z-2"
          onClick={toggleSidebar}
          role="button"
          aria-label="Close menu"
          tabIndex={0}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`position-fixed d-flex flex-column h-100 bg-white shadow transition-all ${
          sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
        style={{
          width: sidebarExpanded ? "250px" : "80px",
          left: sidebarExpanded || window.innerWidth >= 768 ? "0" : "-80px",
          zIndex: 1030,
          transition: "all 0.3s ease-in-out",
        }}
        aria-expanded={sidebarExpanded}
      >
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <Link to="/" className="text-decoration-none text-dark d-flex align-items-center gap-2" aria-label="Home">
            <div style={{ width: "32px", height: "32px" }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 6.5C12 6.5 10 3 7 3C4 3 2 5 2 8C2 11 4 13 12 20C20 13 22 11 22 8C22 5 20 3 17 3C14 3 12 6.5 12 6.5Z"
                  fill="#4ade80"
                  stroke="#4ade80"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {sidebarExpanded && <h1 className="fs-5 fw-bold mb-0">let's grow</h1>}
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
            <label htmlFor="sidebar-search" className="visually-hidden">
              Search
            </label>
            <Search
              className="position-absolute"
              style={{
                top: "10px",
                left: sidebarExpanded ? "12px" : "8px",
                color: "#6c757d",
              }}
              size={16}
              aria-hidden="true"
            />
            <input
              id="sidebar-search"
              type="text"
              placeholder={sidebarExpanded ? "Search..." : ""}
              className="form-control"
              style={{
                paddingLeft: sidebarExpanded ? "35px" : "30px",
                transition: "all 0.3s ease",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search menu items"
            />
          </div>
        </div>

        <nav className="mt-2 overflow-auto" aria-label="Main navigation">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`btn btn-link text-decoration-none text-dark w-100 text-start py-2 px-3 border-0 menu-item ${
                activeMenuItem === item.name ? "active-menu-item" : ""
              }`}
              onClick={() => setActiveMenuItem(item.name, item.path)}
              aria-current={activeMenuItem === item.name ? "page" : undefined}
            >
              <div className="d-flex align-items-center gap-3">
                <item.icon
                  size={20}
                  className={activeMenuItem === item.name ? "text-success" : "text-secondary"}
                  aria-hidden="true"
                />
                {sidebarExpanded && <span>{item.name}</span>}
              </div>
            </Link>
          ))}

          {sidebarExpanded && (
            <div className="px-3 py-2 small text-muted" aria-hidden="true">
              ADDITIONAL FEATURES
            </div>
          )}

          {additionalMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`btn btn-link text-decoration-none text-dark w-100 text-start py-2 px-3 border-0 menu-item ${
                activeMenuItem === item.name ? "active-menu-item" : ""
              }`}
              onClick={() => setActiveMenuItem(item.name, item.path)}
              aria-current={activeMenuItem === item.name ? "page" : undefined}
            >
              <div className="d-flex align-items-center gap-3">
                <item.icon
                  size={20}
                  className={activeMenuItem === item.name ? "text-success" : "text-secondary"}
                  aria-hidden="true"
                />
                {sidebarExpanded && <span>{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-3 border-top">
          {sidebarExpanded && (
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-light p-1" style={{ width: "40px", height: "40px" }}>
                <img
                  src="/placeholder-user.jpg"
                  alt="Admin profile"
                  className="rounded-circle w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40"
                  }}
                />
              </div>
              <div className="ms-2">
                <div className="fw-medium">Admin User</div>
                <div className="text-muted small">Super Admin</div>
              </div>
            </div>
          )}

          <Link
            to="/logout"
            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 menu-item"
          >
            <LogOut size={18} aria-hidden="true" />
            {sidebarExpanded && <span>Log Out</span>}
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Sidebar;
