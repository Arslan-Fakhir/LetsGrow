"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, User, Building, Mail, Calendar, DollarSign, FileText, Star, Phone, MapPin, Edit, Trash2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import "./MyStartupDetails.css"

const MyStartupDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [startup, setStartup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { auth } = useAuth()

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/startups/${id}`
        )
        
        const mappedData = {
          id: response.data._id,
          name: response.data.startupName,
          entrepreneur: response.data.entrepreneurId?.name || "Unknown",
          industry: response.data.industry,
          email: response.data.entrepreneurId?.email,
          phone: response.data.entrepreneurId?.contactNumber,
          location: response.data.entrepreneurId?.location,
          submissionDate: response.data.createdAt,
          fundingRequired: response.data.fundingRequired?.toLocaleString(),
          fundingReceived: response.data.fundingReceived?.toLocaleString() || "0",
          description: response.data.description,
          rating: response.data.rating || 0,
          image: response.data.startupImage?.url || "",
          stage: response.data.stage,
          teamSize: response.data.teamSize || "1",
          revenue: response.data.revenue ? `$${response.data.revenue.toLocaleString()}` : "N/A",
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

  const handleEdit = () => {
    navigate(`/edit-startup/${id}`)
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this startup? This action cannot be undone.")) {
      return
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/startups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      navigate('/my-startup')
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete startup. Please try again.')
    }
  }

  function formatDate(dateString) {
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
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            <span>Back </span>
          </button>

          <div className="startup-details-card">
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
                {startup.image && (
                  <div className="header-right">
                    <img src={startup.image} alt={startup.name} className="startup-image" />
                  </div>
                )}
              </div>
            </div>

            <div className="startup-details-body">
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
                      <label className="info-label">Status</label>
                      <p className="info-value">{startup.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="section-separator" />

              <div className="section">
                <h2 className="section-title">
                  <FileText className="section-icon" />
                  Business Description
                </h2>
                <div className="description-content">
                  <p className="description-text">{startup.description}</p>
                </div>
              </div>

              <div className="action-buttons">
                <button className="edit-action" onClick={handleEdit}>
                  <Edit className="button-icon" />
                  Edit Startup
                </button>
                <button className="delete-action" onClick={handleDelete}>
                  <Trash2 className="button-icon" />
                  Delete Startup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyStartupDetails