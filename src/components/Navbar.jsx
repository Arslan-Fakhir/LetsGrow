import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css"; // Import the CSS file
import logo from "../assets/logo.svg";

function Navbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar expanded={expanded} expand="md" className="navbar-custom">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-container">
          <img src={logo} alt="Let's Grow" height="50" className="me-2" />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/home"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              Services
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/signup"
              className="btn-custom ms-md-2 btn-signup"
              onClick={() => setExpanded(false)}
            >
              Signup
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/login"
              className="btn-custom ms-md-2 btn-login"
              onClick={() => setExpanded(false)}
            >
              Login
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
