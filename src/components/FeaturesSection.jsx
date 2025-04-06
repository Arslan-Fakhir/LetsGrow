import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import SectionHeader from "./SectionHeader";
import "./FeaturesSection.css";

const features = [
  {
    title: "Innovation",
    description:
      "Cutting-edge solutions that keep you ahead of the competition",
    icon: "🚀",
  },
  {
    title: "Expertise",
    description: "Industry veterans with proven track records of success",
    icon: "💡",
  },
  {
    title: "Support",
    description: "24/7 dedicated support to help you every step of the way",
    icon: "🤝",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <Container>
        <SectionHeader
          title="Our Features"
          subtitle="Discover what makes us different"
        />
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="feature-icon">{feature.icon}</div>
                  <Card.Title className="feature-title">
                    {feature.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
