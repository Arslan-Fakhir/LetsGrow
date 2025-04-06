import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import SectionHeader from "./SectionHeader";
import "./ServicesSection.css";

const services = [
  {
    title: "Idea Pitching",
    description:
      "A user-friendly interface for entrepreneurs to present and share their startup ideas with potential investors.",
    link: "/services/ideation",
  },
  {
    title: "Startup Discovery",
    description:
      "Access a curated list of verified startup ideas tailored to your investment preferences.",
    link: "/services/directory",
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section">
      <Container>
        <SectionHeader
          title="Our Services"
          subtitle="Comprehensive solutions for your business needs"
        />
        <Row>
          {services.map((service, index) => (
            <Col key={index} md={6} className="mb-4">
              <Card className="service-card">
                <Card.Body>
                  <Card.Title className="service-title">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="text-muted mb-4">
                    {service.description}
                  </Card.Text>
                  <a href={service.link} className="service-link">
                    Learn more
                    <ArrowRight className="ms-2" />
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ServicesSection;
