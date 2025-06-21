import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import "./BrowseStartups.css";

const StarRating = ({ count }) => (
  <div className="d-flex mb-2">
    {[...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-warning ${index < count ? "opacity-100" : "opacity-25"}`}
      >
        ★
      </span>
    ))}
  </div>
);

const BrowseStartups = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/startups/startups`);
        setStartups(response.data);
      } catch (err) {
        console.error("API error:", err.response?.data || err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const handleViewDetails = (startupId) => {
    navigate(`/viewDetails/${startupId}`);
  };

  if (loading) {
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

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <Container>
        <h1 className="text-center mb-5">🌱 Browse Startup Ideas</h1>

        <Row className="g-4">
          {startups.map(({ _id, startupName, entrepreneurId, description, imageUrl, rating }) => (
            <Col key={_id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                {imageUrl && (
                  <Card.Img 
                    variant="top" 
                    src={imageUrl} 
                    className="object-fit-cover" 
                    style={{ height: "160px" }} 
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{startupName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Founder: {entrepreneurId?.name || "Unknown"}
                  </Card.Subtitle>
                  <Card.Text className="flex-grow-1">{description}</Card.Text>
                  <StarRating count={rating || 0} />
                  <Button 
                    variant="success" 
                    className="mt-3"
                    onClick={() => handleViewDetails(_id)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Button variant="success" size="lg" className="rounded-pill px-4">
            Next
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default BrowseStartups;