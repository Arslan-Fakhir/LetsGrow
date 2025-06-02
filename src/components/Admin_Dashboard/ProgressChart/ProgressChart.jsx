import "./ProgressChart.css";

const ProgressChart = ({ percentage = 85, color = "#198754", size = 100, label = "Completed" }) => {
  // Calculate the circumference and the offset
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="position-relative" style={{ width: `${size}px`, height: `${size}px` }}>
      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <span className="fs-3 fw-bold d-block">{percentage}%</span>
          <span className="small text-muted">{label}</span>
        </div>
      </div>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius} 
          fill="none" 
          stroke="#e9ecef" 
          strokeWidth="8" 
        />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>
    </div>
  );
};

export default ProgressChart;