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
  
  // Enhanced format function that handles both numbers and strings
  const formatNumber = (num) => {
    // If value is already formatted (like currency strings), return as-is
    if (typeof num === 'string' && num.includes('$')) {
      return num;
    }
    
    const number = typeof num === 'string' ? parseFloat(num) : num;
    
    // Handle currency values
    if (title.includes("Investment") || title.includes("Revenue")) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(number);
    }
    
    // Regular number formatting
    return new Intl.NumberFormat('en-US').format(number);
  };
  
  // Animation effect
  useEffect(() => {
    // Skip animation if value is already formatted (like currency strings)
    if (typeof value === 'string' && value.includes('$')) {
      setDisplayValue(value);
      return;
    }
    
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      setDisplayValue(Math.floor(progress * numericValue));
      
      if (currentStep === steps) {
        clearInterval(interval);
      }
    }, stepTime);
    
    return () => clearInterval(interval);
  }, [value]);

  // Determine the final displayed value
  const finalDisplayValue = typeof value === 'string' && value.includes('$') 
    ? value 
    : formatNumber(displayValue);

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
            {finalDisplayValue}
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