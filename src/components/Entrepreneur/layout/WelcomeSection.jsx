import "./WelcomeSection.css"

const WelcomeSection = ({ userName = "Entrepreneur" }) => {
  const currentTime = new Date().getHours()
  const greeting = currentTime < 12 ? "Good Morning" : currentTime < 18 ? "Good Afternoon" : "Good Evening"

  return (
    <div className="welcome-section">
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="welcome-title mb-2">
                {greeting}, {userName}! 👋
              </h1>
              <p className="welcome-subtitle mb-0">
                Ready to take your startup to the next level? Here's your dashboard overview.
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="welcome-date">
                <small className="text-muted">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection
