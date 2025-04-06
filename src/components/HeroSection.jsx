import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HeroSection.css";
import hero from "../assets/hero.svg";
const HeroSection = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h1 className="hero-title">
              Empowering <span className="text-custom">Startups</span>,
              <br />
              Elevating <span className="text-custom">Success</span>!
            </h1>
            <p className="hero-description">
              Your startup's growth partner. We provide innovative solutions and
              expert guidance to help your business thrive.
            </p>
            <Button className="btn-custom mt-4">Get Started</Button>
          </Col>
          <Col lg={6}>
            <img src={hero} alt="Hero" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
