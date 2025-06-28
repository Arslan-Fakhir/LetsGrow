"use client"
import "./InvestmentPortfolioCard.css"

const InvestmentPortfolioCard = ({ onPortfolioClick }) => {
  return (
    <div className="portfolio-card">
      <div className="portfolio-header">
        <h3 className="portfolio-title">
          <span className="portfolio-icon">📊</span>
          Monitor Your Investments
        </h3>
      </div>
      <div className="portfolio-content">
        <p className="portfolio-description">Track and manage your current investment portfolio</p>
        <button className="portfolio-button" onClick={onPortfolioClick}>
          View Portfolio
        </button>
      </div>
    </div>
  )
}

export default InvestmentPortfolioCard