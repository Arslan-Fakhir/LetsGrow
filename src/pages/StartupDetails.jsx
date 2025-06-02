import "./startupDetails.css"

export default function StartupDetails() {
  // Sample data that would come from the submitted form
  const startupData = {
    firstName: "Saad",
    lastName: "Mehmood",
    email: "saad.mehmood@example.com",
    cnic: "12345-1234567-1",
    industry: "Eco-friendly",
    ideaSubject: "Sustainable waterplants",
    description:
      "Our innovative approach focuses on developing sustainable water treatment solutions using eco-friendly plant-based filtration systems. We aim to provide clean water access while maintaining environmental sustainability through natural purification processes that can be implemented in both urban and rural settings.",
    videoUploaded: true,
    submissionDate: "December 15, 2024",
  }

  return (
    <div className="startup-container">
      <div className="startup-wrapper">
        <div className="startup-content">
          <div className="startup-card">
            <div className="startup-header">
              <div className="header-content">
                <div>
                  <h1 className="startup-title">{startupData.ideaSubject}</h1>
                  <div className="header-badges">
                    <span className="industry-badge">{startupData.industry}</span>
                    <span className="submission-date">Submitted on {startupData.submissionDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="startup-body">
              {/* Entrepreneur Information */}
              <div className="section entrepreneur-section">
                <h3 className="section-title">
                  <span className="section-icon">👤</span>
                  Entrepreneur Information
                </h3>
                <div className="info-grid">
                  <div className="info-column">
                    <div className="info-item">
                      <label className="info-label">Full Name</label>
                      <p className="info-value name-value">
                        {startupData.firstName} {startupData.lastName}
                      </p>
                    </div>
                    <div className="info-item">
                      <label className="info-label email-label">
                        <span className="label-icon">✉️</span>
                        Email Address
                      </label>
                      <p className="info-value">{startupData.email}</p>
                    </div>
                  </div>
                  <div className="info-column">
                    <div className="info-item">
                      <label className="info-label cnic-label">
                        <span className="label-icon">🆔</span>
                        CNIC
                      </label>
                      <p className="info-value cnic-value">{startupData.cnic}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label industry-label">
                        <span className="label-icon">🏢</span>
                        Industry
                      </label>
                      <p className="info-value">{startupData.industry}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="section-separator" />

              {/* Startup Idea Details */}
              <div className="section idea-section">
                <h3 className="section-title">
                  <span className="section-icon">💡</span>
                  Startup Idea
                </h3>
                <div className="idea-content">
                  <div className="idea-subject">
                    <label className="info-label">Idea Subject</label>
                    <p className="idea-title">{startupData.ideaSubject}</p>
                  </div>
                  <div className="description-section">
                    <label className="info-label description-label">
                      <span className="label-icon">📄</span>
                      Description
                    </label>
                    <div className="description-content">
                      <p className="description-text">{startupData.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="section-separator" />

              {/* Media Section */}
              {startupData.videoUploaded && (
                <div className="section media-section">
                  <h3 className="section-title">
                    <span className="section-icon">🎥</span>
                    Presentation Video
                  </h3>
                  <div className="video-placeholder">
                    <span className="video-icon">🎬</span>
                    <p className="video-text">Video presentation available</p>
                    <button className="video-button">View Video</button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="primary-action">
                  <span className="button-icon">📞</span>
                  Contact Entrepreneur
                </button>
                <button className="secondary-action">
                  <span className="button-icon">💰</span>
                  Express Interest to Invest
                </button>
              </div>

              {/* Additional Actions */}
              <div className="additional-actions">
                <button className="additional-button">❤️ Save to Favorites</button>
                <button className="additional-button">📤 Share Profile</button>
                <button className="additional-button">ℹ️ Request More Information</button>
                <button className="additional-button">📅 Schedule Meeting</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
