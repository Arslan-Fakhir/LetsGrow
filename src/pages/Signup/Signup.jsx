import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import "./Signup.css";
import logo from "../../assets/logo2.svg";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("entrepreneur");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !otp) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          otp, 
          role: role === "entrepreneur" ? "entrepreneur" : "investor" 
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful');
        login({ 
          email, 
          role: data.role || role,
          userId: data.userId 
        });
        navigate(data.role === 'investor' ? '/investor-dashboard' : data.role === 'admin' ? '/admin-dashboard' : '/dashboard');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Error during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
  if (!email) {
    toast.error('Please enter your email');
    return;
  }

  try {
    setLoading(true);
    
    // Add fallback URL if env var isn't set
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    const response = await fetch(`${API_BASE_URL}/auth/sendotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send OTP');
    }

    const data = await response.json();
    toast.success(data.message || 'OTP sent successfully');
  } catch (error) {
    console.error('OTP Error:', error);
    toast.error(error.message || 'Error sending OTP');
  } finally {
    setLoading(false);
  }
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
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    <Button 
                      variant="outline-primary" 
                      className="ms-2"
                      onClick={handleSendOtp}
                      disabled={loading || !email}
                    >
                      {loading ? 'Sending...' : 'Get OTP'}
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>OTP Verification</Form.Label>
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP sent to your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (min 6 characters)"
                    minLength="6"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Account Type</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      id="entrepreneur"
                      label="Entrepreneur"
                      checked={role === "entrepreneur"}
                      onChange={() => setRole("entrepreneur")}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="investor"
                      label="Investor"
                      checked={role === "investor"}
                      onChange={() => setRole("investor")}
                    />
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="signup-button btn-custom w-100"
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
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