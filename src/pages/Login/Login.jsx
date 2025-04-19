import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", formData);
    // Redirect to dashboard after successful login
    navigate("/dashboard");
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
          <Card className="login-card border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img
                  src="/logo.svg"
                  alt="Let's Grow"
                  height="40"
                  className="mb-3"
                />
                <h2 className="fw-bold">Welcome back</h2>
                <p className="text-muted">Please enter your details</p>
              </div>

              <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <div className="text-end mt-2">
                    <Link
                      to="/forgot-password"
                      className="forgot-password-link text-custom text-decoration-none small"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </Form.Group>

                <Button type="submit" className="login-button btn-custom w-100">
                  Login
                </Button>

                <p className="text-center mt-4 mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="signup-link text-custom text-decoration-none"
                  >
                    Sign up
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

export default Login;
