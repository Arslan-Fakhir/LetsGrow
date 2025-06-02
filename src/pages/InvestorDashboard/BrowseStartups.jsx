import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./BrowseStartups.css";

const startups = [
  {
    id: 1,
    name: "Sustainable Waterplants",
    entrepreneur: "Saad",
    description: "A smart solution to grow aquatic plants sustainably in urban environments.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDggk-iYVfU3dzfVcT8ipg-GSFg6mdhOT1g&s",
    rating: 3,
  },
  // ... other startup data
];

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
  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <Container>
        <h1 className="text-center mb-5">🌱 Browse Startup Ideas</h1>

        <Row className="g-4">
          {startups.map(({ id, name, entrepreneur, description, image, rating }) => (
            <Col key={id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src={image} className="object-fit-cover" style={{ height: "160px" }} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Founder: {entrepreneur}
                  </Card.Subtitle>
                  <Card.Text className="flex-grow-1">{description}</Card.Text>
                  <StarRating count={rating} />
                  <Button variant="success" className="mt-3">View Details</Button>
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