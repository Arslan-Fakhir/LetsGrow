import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import "./InvestorPortfolio.css"

const InvestorPortfolio = () => {
  const { auth } = useAuth()
  const [portfolioData, setPortfolioData] = useState({
    totalInvestments: 0,
    totalAmount: 0,
    activeInvestments: 0,
    portfolioValue: 0,
    investments: [],
    industryBreakdown: {},
    recentActivity: [],
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (!auth.user?._id) {
          throw new Error("User information not available")
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/portfolio/${auth.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token || localStorage.getItem('token')}`,
            },
          }
        )

        if (response.data) {
          setPortfolioData({
            totalInvestments: response.data.totalInvestments || 0,
            totalAmount: response.data.totalAmount || 0,
            activeInvestments: response.data.activeInvestments || 0,
            portfolioValue: response.data.portfolioValue || 0,
            investments: response.data.investments || [],
            industryBreakdown: response.data.industryBreakdown || {},
            recentActivity: response.data.recentActivity || [],
          })
        }
      } catch (err) {
        console.error("Failed to fetch portfolio data:", err)
        setError(err.response?.data?.message || err.message || "Failed to load portfolio data")
      } finally {
        setLoading(false)
      }
    }

    if (auth.user?._id) {
      fetchPortfolioData()
    } else {
      setLoading(false)
      setError("Please login to view your portfolio")
    }
  }, [auth.user?._id, auth.token])

  // Formatting functions remain the same...
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: "badge bg-success",
      pending: "badge bg-warning",
      failed: "badge bg-danger",
      refunded: "badge bg-secondary",
    }
    return statusClasses[status?.toLowerCase()] || "badge bg-secondary"
  }

  const getStageColor = (stage) => {
    const stageColors = {
      "Pre-Seed": "text-info",
      "Seed": "text-primary",
      "Series A": "text-success",
      "Series B": "text-warning",
      "Series C": "text-danger",
    }
    return stageColors[stage] || "text-secondary"
  }

  // Loading and error states remain the same...
  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid py-4 investor-portfolio">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-1">Investment Portfolio</h1>
              <p className="text-muted mb-0">Track your startup investments and performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card metric-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="metric-icon bg-primary">
                  <i className="bi bi-graph-up text-white"></i>
                </div>
                <div className="ms-3">
                  <h3 className="metric-value mb-1">{formatCurrency(portfolioData.portfolioValue)}</h3>
                  <p className="metric-label mb-0">Portfolio Value</p>
                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i> +14% from last month
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card metric-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="metric-icon bg-success">
                  <i className="bi bi-currency-dollar text-white"></i>
                </div>
                <div className="ms-3">
                  <h3 className="metric-value mb-1">{formatCurrency(portfolioData.totalAmount)}</h3>
                  <p className="metric-label mb-0">Total Invested</p>
                  <small className="text-muted">Across {portfolioData.totalInvestments} investments</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card metric-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="metric-icon bg-info">
                  <i className="bi bi-building text-white"></i>
                </div>
                <div className="ms-3">
                  <h3 className="metric-value mb-1">{portfolioData.activeInvestments}</h3>
                  <p className="metric-label mb-0">Active Investments</p>
                  <small className="text-muted">Currently performing</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card metric-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="metric-icon bg-warning">
                  <i className="bi bi-percent text-white"></i>
                </div>
                <div className="ms-3">
                  <h3 className="metric-value mb-1">0%</h3>
                  <p className="metric-label mb-0">Average ROI</p>
                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i> Above market average
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-tabs portfolio-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <i className="bi bi-grid-3x3-gap me-2"></i>Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "investments" ? "active" : ""}`}
                onClick={() => setActiveTab("investments")}
              >
                <i className="bi bi-list-ul me-2"></i>Investments
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "analytics" ? "active" : ""}`}
                onClick={() => setActiveTab("analytics")}
              >
                <i className="bi bi-bar-chart me-2"></i>Analytics
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="row">
          {/* Recent Activity */}
          <div className="col-lg-8 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Recent Activity</h5>
              </div>
              <div className="card-body">
                <div className="activity-timeline">
                  {portfolioData.recentActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <i className={`bi ${activity.type === "investment" ? "bi-plus-circle" : "bi-info-circle"}`}></i>
                      </div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <strong>{activity.startup}</strong>
                          <span className="activity-date">{formatDate(activity.date)}</span>
                        </div>
                        <div className="activity-description">
                          {activity.type === "investment"
                            ? `New investment of ${formatCurrency(activity.amount)}`
                            : activity.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Industry Breakdown */}
          <div className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Industry Breakdown</h5>
              </div>
              <div className="card-body">
                {Object.entries(portfolioData.industryBreakdown).map(([industry, percentage]) => (
                  <div key={industry} className="industry-item mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="industry-name">{industry}</span>
                      <span className="industry-percentage">{percentage}%</span>
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "investments" && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Investment Portfolio</h5>
                  <div className="d-flex gap-2">
                    <select className="form-select form-select-sm" style={{ width: "auto" }}>
                      <option>All Industries</option>
                      {Object.keys(portfolioData.industryBreakdown).map((industry) => (
                        <option key={industry}>{industry}</option>
                      ))}
                    </select>
                    <select className="form-select form-select-sm" style={{ width: "auto" }}>
                      <option>All Stages</option>
                      <option>Seed</option>
                      <option>Series A</option>
                      <option>Series B</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Startup</th>
                        <th>Industry</th>
                        <th>Stage</th>
                        <th>Investment</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Performance</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioData.investments.map((investment) => (
                        <tr key={investment._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={investment.startupDetails?.startupImage?.url || "/placeholder.svg"}
                                alt={investment.startupDetails?.startupName}
                                className="startup-logo me-3"
                              />
                              <div>
                                <div className="fw-semibold">{investment.startupDetails?.startupName || "Unknown Startup"}</div>
                                <small className="text-muted">
                                  {investment.startupDetails?.teamSize || 0} team members
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark">
                              {investment.startupDetails?.industry || "N/A"}
                            </span>
                          </td>
                          <td>
                            <span className={`fw-semibold ${getStageColor(investment.startupDetails?.stage)}`}>
                              {investment.startupDetails?.stage || "N/A"}
                            </span>
                          </td>
                          <td className="fw-semibold">{formatCurrency(investment.amount)}</td>
                          <td>
                            <span className={getStatusBadge(investment.paymentStatus)}>
                              {investment.paymentStatus}
                            </span>
                          </td>
                          <td>{formatDate(investment.createdAt)}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="rating-stars me-2">
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`bi ${i < Math.floor(investment.startupDetails?.rating || 0) ? "bi-star-fill" : "bi-star"} text-warning`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-success fw-semibold">+12%</span>
                            </div>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button className="btn btn-outline-primary" title="View Details">
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-outline-secondary" title="Download Report">
                                <i className="bi bi-download"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Portfolio Analytics</h5>
              </div>
              <div className="card-body">
                <div className="text-center py-5">
                  <i className="bi bi-bar-chart display-1 text-muted"></i>
                  <h4 className="mt-3">Analytics Dashboard</h4>
                  <p className="text-muted">Detailed analytics and performance metrics coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvestorPortfolio