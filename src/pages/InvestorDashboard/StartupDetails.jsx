"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, User, Building, Mail, Calendar, DollarSign, FileText, Star, Phone, MapPin } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import "./StartupDetails.css"

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={20}
          className={`star ${index < rating ? "star-filled" : "star-empty"}`}
          fill={index < rating ? "#fbbf24" : "none"}
        />
      ))}
      <span className="rating-text">({rating}/5)</span>
    </div>
  )
}

const StartupDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [startup, setStartup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/startups/${id}`
        )
        
        // Map the response data to match our expected structure
        const mappedData = {
          id: response.data._id,
          name: response.data.startupName,
          entrepreneur: response.data.entrepreneurId?.name || "Unknown",
          industry: response.data.industry,
          email: response.data.entrepreneurId?.email || "",
          phone: response.data.entrepreneurId?.phone || "",
          location: response.data.location || "",
          submissionDate: response.data.createdAt,
          fundingRequired: response.data.fundingRequired?.toLocaleString() || "N/A",
          description: response.data.description,
          rating: response.data.rating || 0,
          image: response.data.imageUrl || "/placeholder.svg",
          stage: response.data.stage,
          teamSize: response.data.teamSize || "N/A",
          revenue: response.data.revenue || "N/A",
          status: response.data.status || "N/A"
        }

        setStartup(mappedData)
      } catch (err) {
        console.error("Failed to fetch startup:", err)
        setError(err.response?.data?.message || err.message || "Failed to load startup details")
      } finally {
        setLoading(false)
      }
    }

    fetchStartupDetails()
  }, [id])

  const handleBack = () => navigate(-1)
  const handleInvest = () => console.log("Invest in:", startup.name)
  const handleContact = () => console.log("Contact:", startup.entrepreneur)

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading startup details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Startup</h3>
        <p>{error}</p>
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>
      </div>
    )
  }

  if (!startup) {
    return (
      <div className="not-found-container">
        <h3>Startup Not Found</h3>
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>
      </div>
    )
  }

  return (
    <div className="startup-details-container">
      <div className="startup-details-wrapper">
        <div className="startup-details-content">
          {/* Back Button */}
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            <span>Back to Browse</span>
          </button>

          {/* Main Card */}
          <div className="startup-details-card">
            {/* Header Section */}
            <div className="startup-details-header">
              <div className="header-content">
                <div className="header-left">
                  <h1 className="startup-name">{startup.name}</h1>
                  <div className="header-badges">
                    <span className="industry-badge">{startup.industry}</span>
                    <span className="stage-badge">{startup.stage}</span>
                    {startup.status && (
                      <span className={`status-badge ${startup.status.toLowerCase()}`}>
                        {startup.status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="header-right">
                  <img src={startup.image} alt={startup.name} className="startup-image" />
                </div>
              </div>
            </div>

            {/* Body Section */}
            <div className="startup-details-body">
              {/* Entrepreneur Info Section */}
              <div className="section">
                <h2 className="section-title">
                  <User className="section-icon" />
                  Entrepreneur Information
                </h2>
                <div className="info-grid">
                  <div className="info-column">
                    <div className="info-item">
                      <label className="info-label">
                        <User size={16} className="label-icon" />
                        Name
                      </label>
                      <p className="info-value name-value">{startup.entrepreneur}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">
                        <Mail size={16} className="label-icon" />
                        Email
                      </label>
                      <p className="info-value email-value">{startup.email}</p>
                    </div>
                  </div>
                  <div className="info-column">
                    <div className="info-item">
                      <label className="info-label">
                        <Phone size={16} className="label-icon" />
                        Phone
                      </label>
                      <p className="info-value">{startup.phone}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">
                        <MapPin size={16} className="label-icon" />
                        Location
                      </label>
                      <p className="info-value">{startup.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="section-separator" />

              {/* Business Info Section */}
              <div className="section">
                <h2 className="section-title">
                  <Building className="section-icon" />
                  Business Information
                </h2>
                <div className="info-grid">
                  <div className="info-column">
                    <div className="info-item">
                      <label className="info-label">
                        <Building size={16} className="label-icon" />
                        Industry
                      </label>
                      <p className="info-value">{startup.industry}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">
                        <Calendar size={16} className="label-icon" />
                        Submission Date
                      </label>
                      <p className="info-value">{formatDate(startup.submissionDate)}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">
                        <DollarSign size={16} className="label-icon" />
                        Funding Required
                      </label>
                      <p className="info-value funding-value">${startup.fundingRequired}</p>
                    </div>
                  </div>
                  <div className="info-column">
                    <div className="info-item">
                      <label className="info-label">Team Size</label>
                      <p className="info-value">{startup.teamSize}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">Monthly Revenue</label>
                      <p className="info-value">{startup.revenue}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">Rating</label>
                      <StarRating rating={startup.rating} />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="section-separator" />

              {/* Description Section */}
              <div className="section">
                <h2 className="section-title">
                  <FileText className="section-icon" />
                  Business Description
                </h2>
                <div className="description-content">
                  <p className="description-text">{startup.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="primary-action" onClick={handleInvest}>
                  <DollarSign className="button-icon" />
                  Invest Now
                </button>
                <button className="secondary-action" onClick={handleContact}>
                  <Mail className="button-icon" />
                  Contact Entrepreneur
                </button>
              </div>

              {/* Additional Actions */}
              <div className="additional-actions">
                <button className="additional-button">
                  <FileText size={16} />
                  Download Pitch Deck
                </button>
                <button className="additional-button">
                  <Star size={16} />
                  Add to Watchlist
                </button>
                <button className="additional-button">
                  <User size={16} />
                  View Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartupDetails