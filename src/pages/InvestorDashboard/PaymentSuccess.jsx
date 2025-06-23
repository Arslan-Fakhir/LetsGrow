import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFill, ArrowLeft } from 'react-bootstrap-icons';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-success-container">
            <div className="payment-success-card">
                <CheckCircleFill className="success-icon" />
                <h1>Payment Successful!</h1>
                <p className="confirmation-message">
                    Thank you for your investment.
                </p>
                <button 
                    className="back-to-dashboard-btn"
                    onClick={() => navigate('/investor-dashboard')}
                >
                    <ArrowLeft className="me-2" />
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;