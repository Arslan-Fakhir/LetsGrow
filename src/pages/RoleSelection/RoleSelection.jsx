
import { Link } from "react-router-dom"
import "./RoleSelection.css"

const RoleSelection = () => {
  const roles = [
    {
      id: "entrepreneur",
      title: "Entrepreneur",
      description: "Access tools and resources to grow your business",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="role-icon"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
      path: "/dashboard",
    },
    {
      id: "investor",
      title: "Investor",
      description: "Discover and invest in promising opportunities",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="role-icon"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      path: "/investor-dashboard",
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage users, content, and platform settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="role-icon"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      path: "/admin",
    },
  ]

  return (
    <div className="role-selection-container">
      
      <div className="role-selection-content">
        <div className="role-selection-header">
          <h1>Select Your Role</h1>
          <p>Choose which user you want to login</p>
        </div>

        <div className="role-cards">
          {roles.map((role) => (
            <Link to={role.path} key={role.id} className="role-card">
              <div className="role-card-content">
                <div className="role-icon-wrapper">{role.icon}</div>
                <h2>{role.title}</h2>
                <p>{role.description}</p>
                <div className="role-card-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    
    </div>
  )
}

export default RoleSelection
