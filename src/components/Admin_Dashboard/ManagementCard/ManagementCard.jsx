import { Link } from "react-router-dom";
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
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Link to={path} className="text-decoration-none">
      <div className="card h-100 border-0 shadow-sm management-card">
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <div className={`bg-${color} bg-opacity-10 rounded-circle p-3 d-inline-block mb-3`}>
              <Icon size={36} className={`text-${color}`} />
            </div>
            <h3 className="fs-5 fw-bold">{title}</h3>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div className="text-muted small">{totalLabel}</div>
              <div className="fw-bold">{formatNumber(totalValue)}</div>
            </div>
            <div>
              <div className="text-muted small">{pendingLabel}</div>
              <div className={`fw-bold text-${pendingColor}`}>{formatNumber(pendingValue)}</div>
            </div>
          </div>
          <div className="progress mb-3" style={{ height: "6px" }}>
            <div
              className={`progress-bar bg-${color}`}
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
            ></div>
          </div>
          <div className="d-flex justify-content-between small text-muted mb-3">
            <span>{leftLabel}: {formatNumber(leftValue)}</span>
            <span>{rightLabel}: {formatNumber(rightValue)}</span>
          </div>
          <button className={`btn btn-${color} w-100`}>{title}</button>
        </div>
      </div>
    </Link>
  );
};

export default ManagementCard;