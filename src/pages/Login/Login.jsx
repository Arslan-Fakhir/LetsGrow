import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import "./Login.css";
import logo from "../../assets/logo2.svg"

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Logged in successfully');
        login(data.data); // Update auth context with user data
        
        // Redirect based on user role or to dashboard
        let redirectPath = '/dashboard'; // Default
        switch(data.role) {
  case 'investor':
    redirectPath = '/investor-dashboard';
    break;
  case 'admin':
    redirectPath = '/admin';
    break;
  case 'entrepreneur':
    redirectPath = '/dashboard';
    break;
}
navigate(redirectPath);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="login-card border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img
                  src={logo}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <Button 
                  type="submit" 
                  className="login-button btn-custom w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
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