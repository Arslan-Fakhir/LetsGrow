import { useNavigate } from 'react-router-dom';
import { XCircleFill, ArrowLeft } from 'react-bootstrap-icons';
import './PaymentCancel.css';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-cancel-container">
            <div className="payment-cancel-card">
                <XCircleFill className="cancel-icon" />
                <h1>Payment Cancelled</h1>
                <p className="message">
                    Your payment was not completed. You can return to your dashboard.
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

export default PaymentCancel;