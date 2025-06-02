import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import './ManpowerForm.css';

const ManpowerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position: '',
    requirements: '',
    count: '',
    timeline: '',
    employmentType: 'full-time',
    location: 'on-site',
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
      console.log('Manpower form submitted:', formData);
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
                      <div className="success-icon success">
                        <Check size={32} className="check-icon" />
                      </div>
                    </div>
                    <h2 className="success-title">Request Submitted!</h2>
                    <p className="success-message">
                      Your manpower request has been successfully submitted. 
                      Our team will start working on finding the right candidates.
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
                        <ArrowLeft className="text-success" />
                      </button>
                      <h1 className="h3 mb-0">Request Manpower</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="position" className="form-label">Position Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="requirements" className="form-label">Requirements</label>
                        <textarea
                          className="form-control"
                          id="requirements"
                          name="requirements"
                          rows="4"
                          value={formData.requirements}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                        <div className="form-text">List the key skills and qualifications needed</div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="count" className="form-label">Number of Positions</label>
                          <input
                            type="number"
                            className="form-control"
                            id="count"
                            name="count"
                            min="1"
                            value={formData.count}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="timeline" className="form-label">Timeline</label>
                          <input
                            type="text"
                            className="form-control"
                            id="timeline"
                            name="timeline"
                            placeholder="e.g., Immediate, 3 months"
                            value={formData.timeline}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label htmlFor="employmentType" className="form-label">Employment Type</label>
                          <select
                            className="form-select"
                            id="employmentType"
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="location" className="form-label">Work Location</label>
                          <select
                            className="form-select"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          >
                            <option value="on-site">On Site</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
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
                          className="btn btn-success"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="spinner me-2" size={16} />
                              Submitting...
                            </>
                          ) : (
                            'Submit Request'
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

export default ManpowerForm;