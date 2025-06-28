import { TrendingUp } from 'lucide-react';
import "./UserCard.css";

const UserCard = ({ 
  icon: Icon, 
  title = "Total", 
  subtitle = "Users", 
  value = 1245, 
  percentChange = 12, 
  infoText = "New users this month",
  buttonText = "View Details",
  buttonVariant = "outline-primary",
  path = "#",
  iconColor = "primary"
}) => {
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClick = () => {
    if (path !== "#") {
      window.location.href = path;
    }
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <div className="user-card-body">
        <div className={`user-icon user-icon-${iconColor}`}>
          <Icon size={40} />
          <div className="user-icon-glow"></div>
        </div>
        
        <div className="user-content">
          <div className="user-header">
            <h3 className="user-title">{title}</h3>
            <h4 className="user-subtitle">{subtitle}</h4>
          </div>
          
          <div className="user-stats">
            <div className="user-value">{formatNumber(value)}</div>
            <div className="user-change">
              <TrendingUp size={16} />
              <span>{percentChange}%</span>
            </div>
          </div>
          
          <div className="user-info">
            {infoText}
          </div>
        </div>
      </div>
      
      <div className="user-card-footer">
        <button className={`user-btn user-btn-${buttonVariant}`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default UserCard;