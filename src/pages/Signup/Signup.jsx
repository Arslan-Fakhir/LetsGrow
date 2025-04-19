import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./Signup.css";
import logo from "../../assets/logo.svg";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "entrepreneur",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup attempt:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="signup-card border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img src={logo} alt="Let's Grow" height="40" className="mb-3" />
                <h2 className="fw-bold">Create an account</h2>
                <p className="text-muted">Join our community today</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Who are you?</Form.Label>
                  <div className="user-type-container">
                    <Form.Check
                      inline
                      type="radio"
                      name="userType"
                      id="entrepreneur"
                      value="entrepreneur"
                      label="Entrepreneur"
                      checked={formData.userType === "entrepreneur"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      name="userType"
                      id="investor"
                      value="investor"
                      label="Investor"
                      checked={formData.userType === "investor"}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="signup-button btn-custom w-100"
                >
                  Register
                </Button>

                <p className="text-center mt-4 mb-0">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="login-link text-custom text-decoration-none"
                  >
                    Login
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
