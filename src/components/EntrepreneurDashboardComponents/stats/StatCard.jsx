import React from 'react';

const StatCard = ({ icon: Icon, title, value, bgColor, iconColor }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className={`rounded p-3 me-3 ${bgColor}`}>
            <Icon className={iconColor} style={{ width: '24px', height: '24px' }} />
          </div>
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h4 className="mb-0">{value}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;