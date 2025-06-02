import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import './FundingForm.css';

const FundingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    timeline: '',
    equity: '',
    useOfFunds: '',
    currentValuation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Funding form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Navigate after showing success animation
      setTimeout(() => {
        navigate('/dashboard'); // Updated to navigate to dashboard
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                {isSuccess ? (
                  <div className="success-animation">
                    <div className="success-icon-container">
                      <div className="success-icon warning">
                        <Check size={32} className="check-icon" />
                      </div>
                    </div>
                    <h2 className="success-title">Application Submitted!</h2>
                    <p className="success-message">
                      Your funding application has been successfully submitted. 
                      We'll review your request and get back to you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="d-flex align-items-center mb-4">
                      <button 
                        onClick={() => navigate('/dashboard')} // Updated to navigate to dashboard
                        className="btn btn-link text-decoration-none p-0 me-3"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="text-warning" />
                      </button>
                      <h1 className="h3 mb-0">Apply for Funding</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="amount" className="form-label">Amount Required (USD)</label>
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              type="number"
                              className="form-control"
                              id="amount"
                              name="amount"
                              value={formData.amount}
                              onChange={handleChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="currentValuation" className="form-label">Current Valuation (USD)</label>
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              type="number"
                              className="form-control"
                              id="currentValuation"
                              name="currentValuation"
                              value={formData.currentValuation}
                              onChange={handleChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="purpose" className="form-label">Purpose of Funding</label>
                        <textarea
                          className="form-control"
                          id="purpose"
                          name="purpose"
                          rows="3"
                          value={formData.purpose}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                        <div className="form-text">Briefly describe why you need the funding</div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="useOfFunds" className="form-label">Use of Funds</label>
                        <textarea
                          className="form-control"
                          id="useOfFunds"
                          name="useOfFunds"
                          rows="3"
                          value={formData.useOfFunds}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                        <div className="form-text">Provide a breakdown of how the funds will be used</div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label htmlFor="timeline" className="form-label">Timeline</label>
                          <input
                            type="text"
                            className="form-control"
                            id="timeline"
                            name="timeline"
                            placeholder="e.g., 6 months, 1 year"
                            value={formData.timeline}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="equity" className="form-label">Equity Offered (%)</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
                              id="equity"
                              name="equity"
                              min="0"
                              max="100"
                              value={formData.equity}
                              onChange={handleChange}
                              required
                              disabled={isSubmitting}
                            />
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate('/dashboard')} // Updated to navigate to dashboard
                          className="btn btn-light"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-warning"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="spinner me-2" size={16} />
                              Submitting...
                            </>
                          ) : (
                            'Submit Application'
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingForm;