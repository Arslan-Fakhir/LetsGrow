import { Users } from 'lucide-react';
import "./RegisteredUsersCard.css";

const RegisteredUsersCard = ({ 
  title = "Registered Users", 
  users = [
    { initial: "A", color: "warning" },
    { initial: "R", color: "info" },
  ],
  totalMembers = 17,
  userGrowth = 12,
  progressPercent = 75
}) => {
  return (
    <div className="card border-0 shadow-sm mb-4 hover-card">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Users size={20} className="text-primary me-2" />
          <h5 className="mb-0 fw-bold">{title}</h5>
        </div>
        <span className="badge bg-primary">Active</span>
      </div>
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="d-flex">
            {users.map((user, index) => (
              <div
                key={index}
                className={`rounded-circle bg-${user.color} d-flex align-items-center justify-content-center text-white fw-bold border border-2 border-white`}
                style={{ 
                  width: "36px", 
                  height: "36px", 
                  marginRight: index < users.length - 1 ? "-8px" : "0", 
                  zIndex: users.length - index 
                }}
              >
                {user.initial}
              </div>
            ))}
            <div
              className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold border border-2 border-white"
              style={{ width: "36px", height: "36px", zIndex: "1" }}
            >
              +
            </div>
          </div>
          <span className="small">{totalMembers} members, arslan, rayyan, more</span>
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="small">User Growth</span>
            <span className="small text-success">+{userGrowth}% this month</span>
          </div>
          <div className="progress" style={{ height: "6px" }}>
            <div className="progress-bar bg-primary" style={{ width: `${progressPercent}%` }} role="progressbar"></div>
          </div>
        </div>
        <button className="btn btn-dark w-100">Check Community now</button>
      </div>
    </div>
  );
};

export default RegisteredUsersCard;