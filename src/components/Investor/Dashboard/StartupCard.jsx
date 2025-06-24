"use client"
import "./StartupCard.css"

const StartupCard = ({ startup, onViewDetails }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "status-active"
      case "Growing":
        return "status-growing"
      default:
        return "status-expanding"
    }
  }

  return (
    <div className="startup-card">
      <div className="startup-image-container">
        <img
          src={startup.image || "/placeholder.svg?height=192&width=384"}
          alt={startup.entrepreneur.name}
          className="startup-image"
        />
        <div className="startup-status">
          <span className={`status-badge ${getStatusClass(startup.status)}`}>
            {startup.status}
          </span>
        </div>
      </div>

      <div className="startup-content">
        <div className="startup-info">
          <div className="startup-header">
            <h3 className="startup-name">{startup.name}</h3>
            <p className="startup-founder">
              Founder: <span className="founder-name">{startup.entrepreneur.name}</span>
            </p>
          </div>

          <p className="startup-description">{startup.description}</p>

          <div className="startup-investment">
            <div className="investment-info">
              <p className="investment-label">Investment</p>
              <p className="investment-amount">{startup.investment}</p>
            </div>
          </div>

          <button 
            className="view-details-button" 
            onClick={() => onViewDetails(startup)}
          >
            <span className="button-icon">👁️</span>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartupCard