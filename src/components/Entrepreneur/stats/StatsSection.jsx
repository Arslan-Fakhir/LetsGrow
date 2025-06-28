import React from 'react';
import StatCard from './StatCard';
import { Lightbulb, Users, CheckCircle, DollarSign } from 'lucide-react';

const StatsSection = () => {
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-6 col-lg-3">
        <StatCard
          icon={Lightbulb}
          title="Total Startup Ideas"
          value={4}
          bgColor="bg-primary bg-opacity-10"
          iconColor="text-primary"
        />
      </div>
      <div className="col-md-6 col-lg-3">
        <StatCard
          icon={Users}
          title="Team Members"
          value={1}
          bgColor="bg-success bg-opacity-10"
          iconColor="text-success"
        />
      </div>
      <div className="col-md-6 col-lg-3">
        <StatCard
          icon={CheckCircle}
          title="Total Approved Ideas"
          value={3}
          bgColor="bg-warning bg-opacity-10"
          iconColor="text-warning"
        />
      </div>
      <div className="col-md-6 col-lg-3">
        <StatCard
          icon={DollarSign}
          title="Total Funding Received"
          value="$2000"
          bgColor="bg-info bg-opacity-10"
          iconColor="text-info"
        />
      </div>
    </div>
  );
};

export default StatsSection;