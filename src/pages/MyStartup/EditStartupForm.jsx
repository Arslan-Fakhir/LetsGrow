"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Check, Loader2, AlertCircle } from "lucide-react"
import { toast } from "react-toastify"
import axios from "axios"
import { useAuth } from "../../context/AuthContext";
import "./EditStartupForm.css"

const EditStartupForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    startupName: "",
    description: "",
    industry: "",
    fundingRequired: "",
    stage: "idea",
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { auth } = useAuth();

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/startups/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        
        const startup = response.data
        setFormData({
          startupName: startup.startupName,
          description: startup.description,
          industry: startup.industry,
          fundingRequired: startup.fundingRequired,
          stage: startup.stage,
        })
        
        if (startup.startupImage?.url) {
          setPreviewImage(startup.startupImage.url)
        }
        
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch startup:", err)
        setError(err.response?.data?.message || err.message || "Failed to load startup details")
        setLoading(false)
      }
    }

    fetchStartupData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB")
        e.target.value = ""
        return
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPEG, JPG, or PNG files are allowed")
        e.target.value = ""
        return
      }

      setSelectedFile(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("startupName", formData.startupName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("industry", formData.industry);
      formDataToSend.append("fundingRequired", formData.fundingRequired);
      formDataToSend.append("stage", formData.stage);

      if (selectedFile) {
        formDataToSend.append("startupImage", selectedFile);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/startups/${id}`,
        formDataToSend,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      toast.success("Startup updated successfully");
      navigate(`/my-startup-details/${id}`);
      
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update startup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
        <div className="text-center">
          <Loader2 className="spinner me-2" size={32} />
          <p>Loading startup data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
        <div className="card shadow-sm p-4 text-center">
          <AlertCircle className="text-danger mb-3" size={48} />
          <h2 className="mb-3">Error Loading Startup</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate(`my-startup-details/${id}`)}
            className="btn btn-primary"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-link text-decoration-none p-0 me-3"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="text-primary" />
                  </button>
                  <h1 className="h3 mb-0">Edit Startup</h1>
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
                  </div>

                  <div className="mb-3">
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

                  <div className="mb-4">
                    <label htmlFor="startupImage" className="form-label">
                      Startup Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="startupImage"
                      name="startupImage"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                    />
                    {previewImage && (
                      <div className="mt-3">
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="img-thumbnail" 
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="btn btn-light"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="spinner me-2" size={16} />
                          Updating...
                        </>
                      ) : (
                        "Update Startup"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditStartupForm