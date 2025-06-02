import { User, Briefcase, TrendingUp } from 'lucide-react'; // Added TrendingUp import
import { Link } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ 
  icon: Icon = User, 
  title = "Total", 
  subtitle = "Entrepreneur", 
  value = 1245, 
  percentChange = 12, 
  infoText = "124 new entrepreneurs this month",
  buttonText = "View Details",
  buttonVariant = "outline-primary",
  path = "#",
  iconColor = "primary"
}) => {
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="card border-0 shadow-sm h-100 hover-card">
      <div className="card-body p-4 text-center">
        <div
          className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm border"
          style={{ width: "80px", height: "80px" }}
        >
          <Icon size={36} className={`text-${iconColor}`} />
        </div>
        <h2 className="fs-4 fw-bold mb-1">{title}</h2>
        <h3 className="fs-4 fw-bold mb-3">{subtitle}</h3>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span className="fs-3 fw-bold text-success">{formatNumber(value)}</span>
          <span className="badge bg-success d-flex align-items-center">
            <TrendingUp size={14} className="me-1" /> {percentChange}%
          </span>
        </div>
        <div className="mt-3 text-muted small">
          {infoText}
        </div>
      </div>
      <div className="card-footer bg-transparent border-0 p-3">
        <Link to={path} className={`btn btn-${buttonVariant} w-100`}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default UserCard;