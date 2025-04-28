import React from 'react';
import { Bell } from 'lucide-react';

const WelcomeSection = () => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h3 mb-1">Welcome back, Entrepreneur!</h1>
          <p className="text-muted mb-0">Here's what's happening with your startup journey</p>
        </div>
        <div className="position-relative">
          <Bell className="text-secondary" style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;