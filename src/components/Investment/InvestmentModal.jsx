import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import './InvestmentModal.css';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ 
  amount, 
  startupId, 
  onSuccess, 
  onClose,
  setErrorMessage 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!stripe || !elements) {
      setErrorMessage('Payment system not ready. Please try again.');
      setLoading(false);
      return;
    }

    try {
      // 1. Create payment intent on backend
      const { data } = await axios.post('/api/investment/create-investment', {
        amount: Math.round(amount * 100), // Convert to cents
        startupId,
        currency: 'usd'
      });

      // 2. Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: "Investor" // You can customize this
            }
          }
        }
      );

      if (error) {
        throw error;
      }

      if (paymentIntent.status === 'succeeded') {
        // 3. Confirm investment on your backend
        await axios.post('/api/investment/confirm-investment', {
          investmentId: data.investmentId,
          paymentIntentId: paymentIntent.id
        });

        setPaymentCompleted(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage(err.message || 'Payment failed. Please check your card details and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentCompleted) {
    return (
      <div className="payment-success">
        <CheckCircle2 size={48} className="success-icon" />
        <h3>Payment Successful!</h3>
        <p>Thank you for your investment of ${amount.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="investment-form">
      <div className="form-group">
        <label>Investment Amount</label>
        <div className="amount-display">${amount.toFixed(2)}</div>
      </div>
      
      <div className="form-group">
        <label>Card Details</label>
        <div className="card-element-wrapper">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                  padding: '10px 12px',
                },
                invalid: {
                  color: '#dc2626',
                },
              },
              hidePostalCode: true
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="form-actions">
        <button 
          type="button" 
          onClick={onClose}
          className="cancel-button"
          disabled={loading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={!stripe || loading}
          className="submit-button"
        >
          {loading ? (
            <>
              <Loader2 className="loading-spinner" />
              Processing...
            </>
          ) : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const InvestmentModal = ({ 
  startupId, 
  startupName, 
  onClose, 
  onSuccess 
}) => {
  const [amount, setAmount] = useState(100);
  const [step, setStep] = useState('amount');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAmountSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      setStep('payment');
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid amount');
    }
  };

  return (
    <div className="investment-modal-overlay">
      <div className="investment-modal">
        <button onClick={onClose} className="close-button">
          <X size={20} />
        </button>

        <h2>Invest in {startupName}</h2>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {step === 'amount' ? (
          <form onSubmit={handleAmountSubmit} className="amount-form">
            <div className="form-group">
              <label>Investment Amount (USD)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <button type="submit" className="continue-button">
              Continue to Payment
            </button>
          </form>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={amount}
              startupId={startupId}
              onSuccess={onSuccess}
              onClose={onClose}
              setErrorMessage={setErrorMessage}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default InvestmentModal;