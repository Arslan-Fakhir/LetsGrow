import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import SectionHeader from "./SectionHeader";
import "./FeaturesSection.css";

const features = [
  {
    title: "Innovation",
    description: "Cutting-edge solutions that keep you ahead of the competition",
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
    <section className="py-5 bg-light">
      <Container>
        <SectionHeader
          title="Our Features"
          subtitle="Discover what makes us different"
        />
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="display-4 mb-3">{feature.icon}</div>
                  <Card.Title className="fw-bold mb-3">
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