"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import "./StartupForm.css"

const StartupForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    startupName: "",
    description: "",
    industry: "",
    fundingRequired: "",
    stage: "idea",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { startupName, description, industry, fundingRequired, stage } = formData;

  if (!startupName || !description || !industry || !fundingRequired || !stage) {
    toast.error("All fields are required!");
    return;
  }

  setIsSubmitting(true);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/startups/sendForm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // No need to include entrepreneurId
      credentials: "include", // This sends cookies with the request
    });


      const data = await response.json()
      console.log("Startup form response:", data)

      if (response.ok) {
        toast.success("Submitted successfully")
        setIsSuccess(true)

        setTimeout(() => {
          navigate("/dashboard")
        }, 2000)
      } else {
        toast.error(data.message || "Submission failed")
      }
    } catch (error) {
      console.error("Submit Error:", error)
      toast.error("An error occurred while submitting")
    } finally {
      setIsSubmitting(false)
    }
  }

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
                      <div className="success-icon primary">
                        <Check size={32} className="check-icon" />
                      </div>
                    </div>
                    <h2 className="success-title">Application Submitted!</h2>
                    <p className="success-message">
                      Your startup application has been successfully submitted. Our team will review your information
                      and contact you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="d-flex align-items-center mb-4">
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="btn btn-link text-decoration-none p-0 me-3"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="text-primary" />
                      </button>
                      <h1 className="h3 mb-0">Apply for Startup</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="startupName" className="form-label">
                          Startup Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="startupName"
                          name="startupName"
                          value={formData.startupName}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          rows="4"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                        <div className="form-text">Describe your startup's mission and vision</div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="industry" className="form-label">
                          Industry
                        </label>
                        <select
                          className="form-select"
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        >
                          <option value="">Select an industry</option>
                          <option value="technology">Technology</option>
                          <option value="healthcare">Healthcare & Biotech</option>
                          <option value="fintech">Financial Technology (FinTech)</option>
                          <option value="ecommerce">E-commerce & Retail</option>
                          <option value="education">Education Technology (EdTech)</option>
                          <option value="food">Food & Beverage</option>
                          <option value="transportation">Transportation & Logistics</option>
                          <option value="real-estate">Real Estate & PropTech</option>
                          <option value="energy">Energy & Sustainability</option>
                          <option value="entertainment">Entertainment & Media</option>
                          <option value="agriculture">Agriculture & AgTech</option>
                          <option value="manufacturing">Manufacturing & Industrial</option>
                          <option value="travel">Travel & Hospitality</option>
                          <option value="fitness">Fitness & Wellness</option>
                          <option value="fashion">Fashion & Beauty</option>
                          <option value="gaming">Gaming & Esports</option>
                          <option value="cybersecurity">Cybersecurity</option>
                          <option value="ai-ml">Artificial Intelligence & Machine Learning</option>
                          <option value="blockchain">Blockchain & Cryptocurrency</option>
                          <option value="iot">Internet of Things (IoT)</option>
                          <option value="saas">Software as a Service (SaaS)</option>
                          <option value="marketplace">Marketplace & Platform</option>
                          <option value="social">Social Media & Networking</option>
                          <option value="consulting">Consulting & Professional Services</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="form-text">Choose the industry that best describes your startup</div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="fundingRequired" className="form-label">
                          Funding Required
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            id="fundingRequired"
                            name="fundingRequired"
                            value={formData.fundingRequired}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            step="1000"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="form-text">Enter the amount of funding you're seeking (USD)</div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="stage" className="form-label">
                          Current Stage
                        </label>
                        <select
                          className="form-select"
                          id="stage"
                          name="stage"
                          value={formData.stage}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        >
                          <option value="idea">Idea Stage</option>
                          <option value="mvp">MVP</option>
                          <option value="early">Early Traction</option>
                          <option value="growth">Growth Stage</option>
                        </select>
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate("/dashboard")}
                          className="btn btn-light"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="spinner me-2" size={16} />
                              Submitting...
                            </>
                          ) : (
                            "Submit Application"
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
  )
}

export default StartupForm
