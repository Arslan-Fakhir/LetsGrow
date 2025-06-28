import "./ManagementCard.css";

const ManagementCard = ({ 
  icon: Icon, 
  title, 
  color = "primary", 
  totalLabel = "Total", 
  totalValue, 
  pendingLabel = "Pending", 
  pendingValue, 
  pendingColor = "warning",
  leftLabel = "Approved",
  leftValue,
  rightLabel = "Rejected",
  rightValue,
  progressPercent = 75,
  path = "#"
}) => {
  // Format number with commas
  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClick = () => {
    if (path !== "#") {
      window.location.href = path;
    }
  };

  return (
    <div className="management-card" onClick={handleClick}>
      <div className="management-card-body">
        <div className="management-header">
          <div className={`management-icon management-icon-${color}`}>
            <Icon size={32} />
            <div className="management-icon-bg"></div>
          </div>
          <h3 className="management-title">{title}</h3>
        </div>
        
        <div className="management-stats">
          <div className="management-stat">
            <span className="management-stat-label">{totalLabel}</span>
            <span className="management-stat-value">{formatNumber(totalValue)}</span>
          </div>
          <div className="management-stat">
            <span className="management-stat-label">{pendingLabel}</span>
            <span className={`management-stat-value management-stat-${pendingColor}`}>
              {formatNumber(pendingValue)}
            </span>
          </div>
        </div>
        
        <div className="management-progress">
          <div className="management-progress-bar">
            <div 
              className={`management-progress-fill management-progress-${color}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="management-progress-labels">
            <span>{leftLabel}: {formatNumber(leftValue)}</span>
            <span>{rightLabel}: {formatNumber(rightValue)}</span>
          </div>
        </div>
        
        <button className={`management-btn management-btn-${color}`}>
          <span>{title}</span>
          <div className="management-btn-arrow">→</div>
        </button>
      </div>
    </div>
  );
};

export default ManagementCard;