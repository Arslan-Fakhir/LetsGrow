import StartupCard from "./StartupCard(unknown)"
import "./StartupsSection.css"

const StartupsSection = ({ startups, onViewDetails }) => {
  return (
    <div className="startups-section">
      <div className="startups-header">
        <h2 className="section-title">Invested Startups</h2>
        <p className="section-subtitle">Explore and monitor the performance of startups in your investment portfolio</p>
      </div>

      <div className="startups-grid">
        {startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  )
}

export default StartupsSection
