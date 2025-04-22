import { Star } from 'lucide-react';
import "./FeedbackCard.css";

const FeedbackCard = ({ 
  title = "Feedbacks", 
  newCount = 24, 
  rating = 4.8, 
  satisfactionRate = 94 
}) => {
  return (
    <div className="card border-0 shadow-sm mb-4 hover-card">
      <div className="card-header bg-secondary text-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">{title}</h5>
        <span className="badge bg-light text-dark">{newCount} New</span>
      </div>
      <div className="card-body p-4">
        <p className="mb-1">check reviews</p>
        <p className="mb-3">Completed tasks</p>
        <div className="d-flex align-items-center mb-3">
          <div className="me-3">
            <div className="d-flex align-items-center mb-1">
              <Star size={16} className="text-warning me-1" />
              <Star size={16} className="text-warning me-1" />
              <Star size={16} className="text-warning me-1" />
              <Star size={16} className="text-warning me-1" />
              <Star size={16} className="text-warning" />
            </div>
            <div className="small text-muted">{rating}/5 average rating</div>
          </div>
          <div className="ms-auto">
            <span className="fs-4 fw-bold text-success">{satisfactionRate}%</span>
            <div className="small text-muted">Satisfaction rate</div>
          </div>
        </div>
        <button className="btn btn-dark w-100">Reviews</button>
      </div>
    </div>
  );
};

export default FeedbackCard;