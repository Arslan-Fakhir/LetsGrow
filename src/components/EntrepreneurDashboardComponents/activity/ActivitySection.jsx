import React from 'react';
import ActivityItem from './ActivityItem';
import { Users, Rocket, DollarSign } from 'lucide-react';

const ActivitySection = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="h5 mb-4">Recent Activity</h3>
        
        <ActivityItem
          icon={Users}
          title="New Team Member Joined"
          description="Sarah Johnson joined as Lead Developer"
          time="2 hours ago"
          bgColor="bg-success bg-opacity-10"
          iconColor="text-success"
        />
        
        <ActivityItem
          icon={Rocket}
          title="Milestone Achieved"
          description="Successfully completed MVP development"
          time="1 day ago"
          bgColor="bg-primary bg-opacity-10"
          iconColor="text-primary"
        />
        
        <ActivityItem
          icon={DollarSign}
          title="Funding Update"
          description="Received seed funding proposal"
          time="3 days ago"
          bgColor="bg-warning bg-opacity-10"
          iconColor="text-warning"
        />
      </div>
    </div>
  );
};

export default ActivitySection;