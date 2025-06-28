import { useEffect, useState } from "react";
import "./StatCard.css";

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  percentChange, 
  isPositive = true, 
  progressPercent = 75, 
  color = "primary" 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Animate the counter
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      setDisplayValue(Math.floor(progress * value));
      
      if (currentStep === steps) {
        clearInterval(interval);
      }
    }, stepTime);
    
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="stat-card">
      <div className="stat-card-body">
        <div className="stat-card-header">
          <div className={`stat-icon stat-icon-${color}`}>
            <Icon size={28} />
          </div>
          <div className={`stat-badge stat-badge-${isPositive ? 'positive' : 'negative'}`}>
            <span className="stat-badge-text">
              {isPositive ? '+' : '-'}{Math.abs(percentChange)}%
            </span>
            <span className="stat-badge-arrow">
              {isPositive ? '↗' : '↘'}
            </span>
          </div>
        </div>
        
        <div className="stat-content">
          <h6 className="stat-title">{title}</h6>
          <h2 className="stat-value">
            {title.includes("Investment") || title.includes("Revenue") ? "$" : ""}
            {formatNumber(displayValue)}
          </h2>
        </div>
        
        <div className="stat-progress">
          <div className="stat-progress-bar">
            <div 
              className={`stat-progress-fill stat-progress-${color}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="stat-progress-text">{progressPercent}% of target</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;