import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import logo from "../assets/logo.svg";

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="g-4">
          <Col md={3}>
            <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
              <img src={logo} alt="Let's Grow" height="50" className="me-2" />
            </Link>
            <p className="text-secondary mt-3">
              Empowering startups to reach their full potential through
              innovative solutions.
            </p>
          </Col>

          <Col md={3}>
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none hover-light">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-secondary text-decoration-none hover-light">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-secondary text-decoration-none hover-light">
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-secondary text-decoration-none hover-light">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h5 className="fw-bold mb-3">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/services/ideation" className="text-secondary text-decoration-none hover-light">
                  Idea Pitching
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services/directory" className="text-secondary text-decoration-none hover-light">
                  Startup Discovery
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="text-secondary mb-2">Email: contact@letsgrow.com</li>
              <li className="text-secondary mb-2">Phone: (555) 123-4567</li>
              <li className="text-secondary mb-2">
                Address: 123 Startup Street, Innovation City
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 bg-secondary" />

        <div className="text-center">
          <p className="text-secondary mb-0">
            &copy; {new Date().getFullYear()} Let's Grow. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;