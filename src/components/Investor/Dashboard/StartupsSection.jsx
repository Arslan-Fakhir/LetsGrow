import StartupCard from "./StartupCard"
import "./StartupsSection.css"

const StartupsSection = ({ startups, onViewDetails }) => {
  return (
    <div className="startups-section">
      <div className="startups-header">
        <h2 className="section-title">Invested Startups</h2>
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
