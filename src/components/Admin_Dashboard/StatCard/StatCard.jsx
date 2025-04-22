import { useEffect, useState } from "react";
import "./StatCard.css";

const StatCard = ({ icon: Icon, title, value, percentChange, isPositive = true, progressPercent = 75, color = "primary" }) => {
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
    <div className="card border-0 shadow-sm h-100 stat-card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className={`bg-${color} bg-opacity-10 rounded-3 p-2`}>
            <Icon size={24} className={`text-${color}`} />
          </div>
          <span className={`badge bg-${isPositive ? 'success' : 'danger'}`}>
            {isPositive ? '+' : '-'}{Math.abs(percentChange)}% {isPositive ? '↑' : '↓'}
          </span>
        </div>
        <h6 className="text-muted mb-1">{title}</h6>
        <h3 className="fw-bold mb-0 counter-value">
          {title.includes("Revenue") ? "$" : ""}{formatNumber(displayValue)}
        </h3>
        <div className="progress mt-3" style={{ height: "4px" }}>
          <div 
            className={`progress-bar bg-${color}`} 
            style={{ width: `${progressPercent}%` }} 
            role="progressbar"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;