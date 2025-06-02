import React from 'react';
import { ChevronRight } from 'lucide-react';

const ActionCard = ({
  icon: Icon,
  title,
  description,
  bgColor,
  iconColor,
  buttonColor,
  onClick,
}) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className={`rounded p-3 align-self-start ${bgColor}`}>
          <Icon className={iconColor} style={{ width: '24px', height: '24px' }} />
        </div>
        <h3 className="h5 mt-3 mb-2">{title}</h3>
        <p className="text-muted flex-grow-1">{description}</p>
        <button
          onClick={onClick}
          className={`btn ${buttonColor} d-flex align-items-center justify-content-center mt-3`}
        >
          Apply Now <ChevronRight className="ms-1" style={{ width: '16px', height: '16px' }} />
        </button>
      </div>
    </div>
  );
};

export default ActionCard;