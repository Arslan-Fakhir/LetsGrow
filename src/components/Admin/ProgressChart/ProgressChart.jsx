import "./ProgressChart.css";

const ProgressChart = ({ 
  percentage = 85, 
  color = "#198754", 
  size = 120, 
  label = "Completed" 
}) => {
  // Calculate the circumference and the offset
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-chart" style={{ width: `${size}px`, height: `${size}px` }}>
      <div className="progress-chart-content">
        <div className="progress-chart-text">
          <span className="progress-chart-percentage">{percentage}%</span>
          <span className="progress-chart-label">{label}</span>
        </div>
      </div>
      <svg 
        className="progress-chart-svg" 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id={`gradient-${percentage}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius} 
          fill="none" 
          stroke="#e9ecef" 
          strokeWidth="8"
          className="progress-chart-bg"
        />
        
        {/* Progress circle */}
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          fill="none"
          stroke={`url(#gradient-${percentage})`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          className="progress-chart-progress"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
};

export default ProgressChart;