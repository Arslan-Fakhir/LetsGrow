import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircleFill, ArrowLeft, XCircleFill } from 'react-bootstrap-icons';
import axios from 'axios';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState('verifying');
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            const sessionId = searchParams.get('session_id');
            if (!sessionId) {
                setPaymentStatus('failed');
                setError('No session ID provided');
                return;
            }

            try {
                console.log("success page session id: ",sessionId)
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/investment/verify-payment`,
                    {
                        params: { session_id: sessionId },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.data.success) {
                    setPaymentStatus('success');
                } else {
                    setPaymentStatus('failed');
                    setError(response.data.message || 'Payment verification failed');
                }
            } catch (err) {
                setPaymentStatus('failed');
                setError(err.response?.data?.message || err.message || 'Failed to verify payment');
            }
        };

        verifyPayment();
    }, [searchParams]);

    if (paymentStatus === 'verifying') {
        return (
            <div className="payment-success-container">
                <div className="payment-success-card">
                    <div className="spinner"></div>
                    <p>Verifying your payment...</p>
                </div>
            </div>
        );
    }

    if (paymentStatus === 'failed') {
        return (
            <div className="payment-success-container">
                <div className="payment-success-card">
                    <XCircleFill className="error-icon" />
                    <h1>Payment Verification Failed</h1>
                    <p className="error-message">{error}</p>
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
    }

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