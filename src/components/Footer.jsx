import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"; // Import the CSS file
import logo from "../assets/logo.svg";

function Footer() {
  return (
    <footer className="footer-custom">
      <Container>
        <Row className="gy-4">
          <Col md={3}>
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Let's Grow" height="50" className="me-2" />
            </Link>
            <p className="footer-description">
              Empowering startups to reach their full potential through
              innovative solutions.
            </p>
          </Col>

          <Col md={3}>
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h5 className="footer-heading">Services</h5>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link to="/services/ideation" className="footer-link">
                  Idea Pitching
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/services/directory" className="footer-link">
                  Startup Discovery
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-list">
              <li className="footer-contact-info">
                Email: contact@letsgrow.com
              </li>
              <li className="footer-contact-info">Phone: (555) 123-4567</li>
              <li className="footer-contact-info">
                Address: 123 Startup Street, Innovation City
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <div className="text-center">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Let's Grow. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
