"use client"
import "./BrowseStartupsCard.css"

const BrowseStartupsCard = ({ onBrowseClick }) => {
  return (
    <div className="browse-card">
      <div className="browse-header">
        <h3 className="browse-title">
          <span className="browse-icon">👁️</span>
          Discover New Opportunities
        </h3>
      </div>
      <div className="browse-content">
        <p className="browse-description">Explore innovative startups looking for investment</p>
        <button className="browse-button" onClick={onBrowseClick}>
          Browse Startups
        </button>
      </div>
    </div>
  )
}

export default BrowseStartupsCard
