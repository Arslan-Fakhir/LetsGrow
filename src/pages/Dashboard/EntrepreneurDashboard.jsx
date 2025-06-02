import React from 'react';
import WelcomeSection from '../../components/EntrepreneurDashboardComponents/layout/WelcomeSection';
import StatsSection from '../../components/EntrepreneurDashboardComponents/stats/StatsSection';
import ActionsSection from '../../components/EntrepreneurDashboardComponents/actions/ActionsSection';
import ActivitySection from '../../components/EntrepreneurDashboardComponents/activity/ActivitySection';

const EntrepreneurDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="row g-4">
        <div className="col-12">
          <WelcomeSection />
        </div>
        
        <div className="col-12">
          <div className="card shadow-sm mb-4">
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-md-4 p-4 bg-success bg-opacity-10 border-end">
                  <h3 className="h5 mb-3 text-success">Quick Stats</h3>
                  <p className="mb-0 text-muted">
                    Track your startup's progress and key metrics at a glance
                  </p>
                </div>
                <div className="col-md-8 p-4">
                  <StatsSection />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h5 mb-0">Quick Actions</h3>
                <button className="btn btn-sm btn-outline-success">
                  View All Actions
                </button>
              </div>
              <ActionsSection />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h5 mb-0">Recent Activity</h3>
                <button className="btn btn-sm btn-outline-secondary">
                  View All
                </button>
              </div>
              <ActivitySection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;