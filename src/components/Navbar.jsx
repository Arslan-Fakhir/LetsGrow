import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";
import logo from "../assets/logo.svg";

function Navbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar expanded={expanded} expand="md" className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand-custom">
          {/* <img src={logo} alt="Let's Grow" height="20" className="" /> */}
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className="navbar-toggler-custom"
        />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/"
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
              className="btn-signup-custom"
              onClick={() => setExpanded(false)}
            >
              Signup
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/login"
              className="btn-login-custom"
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