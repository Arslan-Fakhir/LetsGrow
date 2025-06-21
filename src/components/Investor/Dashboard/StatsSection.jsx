import "./StatsSection.css"

const StatsSection = ({ stats }) => {
  return (
    <div className="stats-section">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-title">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
                <p className={`stat-change ${stat.color}`}>{stat.change} from last month</p>
              </div>
              <div className={`stat-icon-container ${stat.color}`}>
                <span className="stat-icon">
                  <IconComponent size={20} />
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsSection