import React from "react";
import "./InvestorDashboard.css";

const startups = [
  {
    id: 1,
    name: "EcoBite",
    entrepreneur: "Arslan Fakhir",
    description: "This startup specializes in sustainable food delivery.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkORMChqnlSIaSE30NBizeKUSbWoBbGixzQ&s",
  },
  {
    id: 2,
    name: "ChainIQ",
    entrepreneur: "Ahmad Nadeem",
    description: "An AI-powered supply chain optimization solution.",
    image: "https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2023/04/14003540/The-role-of-AI-in-logistics-and-supply-chain-banner.png",
  },
  {
    id: 3,
    name: "Harvestly",
    entrepreneur: "Kamran Sajjad",
    description: "A farm-to-table organic produce logistics app.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNcrEdEnYlInpgb0B5GqBt8fx8J-slr8xMA&s",
  },
];

const InvestorDashboard = () => {
  return (
    <div className="investor-dashboard-container">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
          <div className="d-flex align-items-center gap-4">
            <img
              src=""
              alt="Investor Profile"
              className="profile-image"
            />
            <div>
              <h2 className="investor-name">Rayyan Azhar</h2>
              <p className="investor-location">Lahore, Pakistan</p>
              <div className="mt-3">
                <p className="mb-1">
                  <span className="fw-semibold">Category:</span> All
                </p>
                <p className="mb-0">
                  <span className="fw-semibold">Invested Startups:</span> 3
                </p>
              </div>
            </div>
          </div>

          <div className="meeting-card">
            <h3 className="meeting-title">Today's Meeting</h3>
            <p className="meeting-detail">
              <span className="fw-semibold">Startup:</span> ChainIQ
            </p>
            <p className="meeting-detail mb-0">
              <span className="fw-semibold">Time:</span> 3:00 PM – 5:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Startups Section */}
      <div className="startups-header">
        <h2 className="section-title">Invested Startups</h2>
        <p className="section-subtitle">
          Explore the startups you've invested in.
        </p>
      </div>

      <div className="row g-4">
        {startups.map(({ id, name, entrepreneur, description, image }) => (
          <div key={id} className="col-12 col-sm-6 col-lg-4">
            <div className="startup-card h-100">
              <img
                src={image}
                alt={name}
                className="startup-image"
                loading="lazy"
              />
              <div className="startup-content">
                <h4 className="startup-name">{name}</h4>
                <p className="startup-founder">
                  Founder: {entrepreneur}
                </p>
                <p className="startup-description">{description}</p>
                <button className="view-button">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorDashboard;