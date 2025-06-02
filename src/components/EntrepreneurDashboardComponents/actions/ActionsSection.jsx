import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionCard from './ActionCard';
import { Rocket, Users } from 'lucide-react';

const ActionsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-6">
        <ActionCard
          icon={Rocket}
          title="Apply for Startup"
          description="Register your startup and get access to our extensive network and resources."
          bgColor="bg-primary bg-opacity-10"
          iconColor="text-primary"
          buttonColor="btn-primary"
          onClick={() => navigate('/apply-startup')}
        />
      </div>
      <div className="col-md-6">
        <ActionCard
          icon={Users}
          title="Request Manpower"
          description="Find and hire talented individuals to help grow your startup team."
          bgColor="bg-success bg-opacity-10"
          iconColor="text-success"
          buttonColor="btn-success"
          onClick={() => navigate('/request-manpower')}
        />
      </div>
    </div>
  );
};

export default ActionsSection;