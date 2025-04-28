import React from 'react';
import WelcomeSection from '../../components/EntrepreneurDashboardComponents/layout/WelcomeSection';
import StatsSection from '../../components/EntrepreneurDashboardComponents/stats/StatsSection';
import ActionsSection from '../../components/EntrepreneurDashboardComponents/actions/ActionsSection';
import ActivitySection from '../../components/EntrepreneurDashboardComponents/activity/ActivitySection';

const EntrepreneurDashboard = () => {
  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        <WelcomeSection />
        <StatsSection />
        <ActionsSection />
        <ActivitySection />
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;