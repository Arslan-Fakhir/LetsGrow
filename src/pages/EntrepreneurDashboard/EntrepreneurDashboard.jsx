import { useState, useEffect } from "react"
import WelcomeSection from '../../components/Entrepreneur/layout/WelcomeSection';
import StatsSection from '../../components/Entrepreneur/stats/StatsSection';
import ActionsSection from '../../components/Entrepreneur/actions/ActionsSection';
import ActivitySection from '../../components/Entrepreneur/activity/ActivitySection';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EntrepreneurDashboard.css"

const EntrepreneurDashboard = () => {
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        //console.log(data.data.name)
        setUserName(data.data.name); // Set the actual user's name from the API response
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // You might want to handle this error, perhaps by redirecting to login
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [])

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="entrepreneur-dashboard">
      <div className="container-fluid px-4 py-3">
        {/* Welcome Section */}
        <WelcomeSection userName={userName} />

        {/* Stats Overview */}
        <div className="dashboard-section mb-5">
          <div className="section-header mb-4">
            <h2 className="section-title">Performance Overview</h2>
            <p className="section-subtitle text-muted">Track your startup's key metrics and performance indicators</p>
          </div>
          <StatsSection />
        </div>

        {/* Main Content Grid */}
        <div className="row g-4">
          {/* Quick Actions */}
          <div className="col-lg-8">
            <div className="dashboard-card">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="section-header mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="section-title mb-1">Quick Actions</h3>
                        <p className="section-subtitle text-muted mb-0">Take action to grow your startup</p>
                      </div>
                      <button className="btn btn-outline-primary btn-sm">View All Actions</button>
                    </div>
                  </div>
                  <ActionsSection />
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="col-lg-4">
            <div className="dashboard-card">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <ActivitySection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntrepreneurDashboard