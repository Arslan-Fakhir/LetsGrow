import "./ProfileCard.css"

const ProfileCard = ({ investor }) => {
  return (
    <div className="profile-card">
      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-avatar">
            <img src="/placeholder.svg?height=80&width=80" alt="Investor Profile" className="avatar-image" />
          </div>
          <div className="profile-details">
            <h2 className="investor-name">{investor.name}</h2>
            <div className="investor-stats">
              <p className="stat-item">
                <span className="stat-label">Category:</span> {investor.category}
              </p>
              <p className="stat-item">
                <span className="stat-label">Invested Startups:</span> {investor.investedCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
