import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import { ArrowLeft, Star, User, Calendar } from "lucide-react";
import axios from "axios";
import "./StartupPage.css";
import { useAuth } from "../../context/AuthContext";

const StarRating = ({ count }) => (
  <div className="d-flex mb-2">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`me-1 ${index < count ? "text-warning" : "text-secondary"}`}
        fill={index < count ? "#fbbf24" : "none"}
      />
    ))}
    <span className="ms-1 small text-muted">({count || 0}/5)</span>
  </div>
);

const StartupPage = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        if (auth.user?._id && auth.user?.role === "entrepreneur") {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/startups/entrepreneur/${auth.user._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
              }
            }
          );
          setStartups(response.data);
        } else {
          setStartups([]);
        }
      } catch (err) {
        console.error("API error:", err);
        setError(err.response?.data?.message || err.message || "Failed to load startups");
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, [auth]);

  const handleViewDetails = (startupId) => {
  navigate(`/my-startup-details/${startupId}`);
};


  const handleBack = () => navigate('/dashboard');

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (auth.loading || loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-danger">Error: {error}</div>
      </Container>
    );
  }

  if (!auth.user?.role === "entrepreneur") {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-warning">Access Restricted: This page is only available for entrepreneurs.</div>
      </Container>
    );
  }

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <Container>
        <button className="back-button mb-4" onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-center mb-5">🌱 My Submitted Startups</h1>

        {startups.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <img 
                src="/empty-state.svg" 
                alt="No startups" 
                style={{ height: "150px", opacity: 0.7 }} 
              />
            </div>
            <h4 className="mb-3">No Startups Submitted Yet</h4>
            <p className="text-muted mb-4">You haven't submitted any startup ideas yet.</p>
            <Button 
              variant="success" 
              size="lg" 
              onClick={() => navigate("/apply-startup")}
            >
              Submit Your First Startup
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {startups.map((startup) => (
              <Col key={startup._id} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0">
                  {startup.startupImage?.url && (
                    <Card.Img 
                      variant="top" 
                      src={startup.startupImage.url} 
                      className="object-fit-cover" 
                      style={{ height: "160px" }} 
                      alt={startup.startupName}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="mb-0">{startup.startupName}</Card.Title>
                      <Badge 
                        pill 
                        bg={
                          startup.status === 'approved' ? 'success' : 
                          startup.status === 'rejected' ? 'danger' : 'warning'
                        }
                        className="text-capitalize"
                      >
                        {startup.status}
                      </Badge>
                    </div>
                    
                    <div className="d-flex align-items-center text-muted small mb-2">
                      <User size={14} className="me-1" />
                      <span>{startup.entrepreneurId?.name || "Unknown"}</span>
                    </div>
                    
                    <div className="d-flex align-items-center text-muted small mb-3">
                      <Calendar size={14} className="me-1" />
                      <span>{formatDate(startup.createdAt)}</span>
                    </div>
                    
                    <Card.Text className="flex-grow-1 mb-3 text-truncate-3">
                      {startup.description}
                    </Card.Text>
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="text-muted small">Funding: </span>
                        <span className="fw-bold">
                          ${startup.fundingReceived?.toLocaleString() || 0} / ${startup.fundingRequired?.toLocaleString()}
                        </span>
                      </div>
                      <StarRating count={startup.rating || 0} />
                    </div>
                    
                    <Button 
                      variant="success" 
                      className="mt-3"
                      onClick={() => handleViewDetails(startup._id)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default StartupPage;