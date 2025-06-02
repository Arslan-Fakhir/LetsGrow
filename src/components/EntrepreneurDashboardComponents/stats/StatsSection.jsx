import React from 'react';
import StatCard from './StatCard';
import { Building, Users, Calendar, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-6 col-lg-3">
        <StatCard
          icon={Building}
          title="Startup Status"
          value="Early Stage"
          bgColor="bg-primary bg-opacity-10"
          iconColor="text-primary"
        />
      </div>
      <div className="col-md-6 col-lg-3">
        <StatCard
          icon={Users}
          title="Team Members"
          value={12}
          bgColor="bg-success bg-opacity-10"
          iconColor="text-success"
        />
      </div>
      <div className="col-md-6 col-lg-3">
        <StatCard
          icon={Calendar}
          title="Active Days"
          value={45}
          bgColor="bg-warning bg-opacity-10"
          iconColor="text-warning"
        />
      </div>
      <div className="col-md-6 col-lg-3">
        <StatCard
          icon={TrendingUp}
          title="Growth Rate"
          value="+25%"
          bgColor="bg-info bg-opacity-10"
          iconColor="text-info"
        />
      </div>
    </div>
  );
};

export default StatsSection;