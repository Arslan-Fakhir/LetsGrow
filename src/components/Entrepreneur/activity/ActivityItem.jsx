import React from 'react';

const ActivityItem = ({
  icon: Icon,
  title,
  description,
  time,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="d-flex align-items-start py-3 border-bottom">
      <div className={`rounded p-2 me-3 ${bgColor}`}>
        <Icon className={iconColor} style={{ width: '20px', height: '20px' }} />
      </div>
      <div>
        <h6 className="mb-1">{title}</h6>
        <p className="text-muted mb-1 small">{description}</p>
        <span className="text-muted smaller">{time}</span>
      </div>
    </div>
  );
};

export default ActivityItem;