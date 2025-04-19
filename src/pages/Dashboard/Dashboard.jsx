import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import {
  Rocket,
  People,
  CurrencyDollar,
  Bell,
  ChevronRight,
  Building,
  Calendar3,
  GraphUp,
} from "react-bootstrap-icons";
import "./Dashboard.css";

function Dashboard() {
  const [showStartupModal, setShowStartupModal] = useState(false);
  const [showManpowerModal, setShowManpowerModal] = useState(false);
  const [showFundingModal, setShowFundingModal] = useState(false);

  const [startupForm, setStartupForm] = useState({
    companyName: "",
    description: "",
    industry: "",
    stage: "idea",
  });

  const [manpowerForm, setManpowerForm] = useState({
    position: "",
    requirements: "",
    count: "",
    timeline: "",
  });

  const [fundingForm, setFundingForm] = useState({
    amount: "",
    purpose: "",
    timeline: "",
    equity: "",
  });

  const handleStartupSubmit = (e) => {
    e.preventDefault();
    console.log("Startup Application:", startupForm);
    setShowStartupModal(false);
  };

  const handleManpowerSubmit = (e) => {
    e.preventDefault();
    console.log("Manpower Request:", manpowerForm);
    setShowManpowerModal(false);
  };

  const handleFundingSubmit = (e) => {
    e.preventDefault();
    console.log("Funding Application:", fundingForm);
    setShowFundingModal(false);
  };

  return (
    <div className="dashboard-container">
      <Container fluid className="py-4">
        {/* Welcome Section */}
        <Row className="mb-4">
          <Col>
            <div className="welcome-section p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="display-6 fw-bold mb-2">
                    Welcome back, Entrepreneur!
                  </h1>
                  <p className="text-muted mb-0">
                    Here's what's happening with your startup journey
                  </p>
                </div>
                <div className="notification-bell">
                  <Bell size={24} />
                  <span className="notification-badge">3</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="stat-icon bg-primary-subtle">
                    <Building size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-1">Startup Status</h6>
                    <h4 className="mb-0">Early Stage</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="stat-icon bg-success-subtle">
                    <People size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-1">Team Members</h6>
                    <h4 className="mb-0">12</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="stat-icon bg-warning-subtle">
                    <Calendar3 size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-1">Active Days</h6>
                    <h4 className="mb-0">45</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="stat-icon bg-info-subtle">
                    <GraphUp size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-1">Growth Rate</h6>
                    <h4 className="mb-0">+25%</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Actions */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="action-card">
              <Card.Body>
                <div className="action-icon bg-primary-subtle">
                  <Rocket size={24} />
                </div>
                <h3 className="mt-4 mb-3">Apply for Startup</h3>
                <p className="text-muted">
                  Register your startup and get access to our extensive network
                  and resources.
                </p>
                <Button
                  className="action-button"
                  onClick={() => setShowStartupModal(true)}
                >
                  Apply Now <ChevronRight />
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="action-card">
              <Card.Body>
                <div className="action-icon bg-success-subtle">
                  <People size={24} />
                </div>
                <h3 className="mt-4 mb-3">Request Manpower</h3>
                <p className="text-muted">
                  Find and hire talented individuals to help grow your startup
                  team.
                </p>
                <Button
                  className="action-button"
                  onClick={() => setShowManpowerModal(true)}
                >
                  Request Now <ChevronRight />
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="action-card">
              <Card.Body>
                <div className="action-icon bg-warning-subtle">
                  <CurrencyDollar size={24} />
                </div>
                <h3 className="mt-4 mb-3">Apply for Funding</h3>
                <p className="text-muted">
                  Get the financial support you need to take your startup to the
                  next level.
                </p>
                <Button
                  className="action-button"
                  onClick={() => setShowFundingModal(true)}
                >
                  Apply Now <ChevronRight />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity Section */}
        <Row>
          <Col>
            <Card className="activity-card">
              <Card.Body>
                <h3 className="mb-4">Recent Activity</h3>
                <div className="activity-item">
                  <div className="activity-icon bg-success-subtle">
                    <People size={20} />
                  </div>
                  <div className="activity-content">
                    <h6>New Team Member Joined</h6>
                    <p className="text-muted mb-0">
                      Sarah Johnson joined as Lead Developer
                    </p>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-primary-subtle">
                    <Rocket size={20} />
                  </div>
                  <div className="activity-content">
                    <h6>Milestone Achieved</h6>
                    <p className="text-muted mb-0">
                      Successfully completed MVP development
                    </p>
                    <small className="text-muted">1 day ago</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-warning-subtle">
                    <CurrencyDollar size={20} />
                  </div>
                  <div className="activity-content">
                    <h6>Funding Update</h6>
                    <p className="text-muted mb-0">
                      Received seed funding proposal
                    </p>
                    <small className="text-muted">3 days ago</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modals */}
        {/* Startup Application Modal */}
        <Modal
          show={showStartupModal}
          onHide={() => setShowStartupModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Startup Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleStartupSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={startupForm.companyName}
                  onChange={(e) =>
                    setStartupForm({
                      ...startupForm,
                      companyName: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={startupForm.description}
                  onChange={(e) =>
                    setStartupForm({
                      ...startupForm,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  type="text"
                  value={startupForm.industry}
                  onChange={(e) =>
                    setStartupForm({ ...startupForm, industry: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stage</Form.Label>
                <Form.Select
                  value={startupForm.stage}
                  onChange={(e) =>
                    setStartupForm({ ...startupForm, stage: e.target.value })
                  }
                >
                  <option value="idea">Idea Stage</option>
                  <option value="mvp">MVP</option>
                  <option value="early">Early Traction</option>
                  <option value="growth">Growth Stage</option>
                </Form.Select>
              </Form.Group>
              <Button type="submit" className="btn-custom">
                Submit Application
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Manpower Request Modal */}
        <Modal
          show={showManpowerModal}
          onHide={() => setShowManpowerModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Manpower Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleManpowerSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  value={manpowerForm.position}
                  onChange={(e) =>
                    setManpowerForm({
                      ...manpowerForm,
                      position: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={manpowerForm.requirements}
                  onChange={(e) =>
                    setManpowerForm({
                      ...manpowerForm,
                      requirements: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number of Positions</Form.Label>
                <Form.Control
                  type="number"
                  value={manpowerForm.count}
                  onChange={(e) =>
                    setManpowerForm({ ...manpowerForm, count: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Timeline</Form.Label>
                <Form.Control
                  type="text"
                  value={manpowerForm.timeline}
                  onChange={(e) =>
                    setManpowerForm({
                      ...manpowerForm,
                      timeline: e.target.value,
                    })
                  }
                  placeholder="e.g., Immediate, Within 3 months"
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn-custom">
                Submit Request
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Funding Application Modal */}
        <Modal
          show={showFundingModal}
          onHide={() => setShowFundingModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Funding Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFundingSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Amount Required (USD)</Form.Label>
                <Form.Control
                  type="number"
                  value={fundingForm.amount}
                  onChange={(e) =>
                    setFundingForm({ ...fundingForm, amount: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Purpose of Funding</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={fundingForm.purpose}
                  onChange={(e) =>
                    setFundingForm({ ...fundingForm, purpose: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Timeline</Form.Label>
                <Form.Control
                  type="text"
                  value={fundingForm.timeline}
                  onChange={(e) =>
                    setFundingForm({ ...fundingForm, timeline: e.target.value })
                  }
                  placeholder="e.g., 6 months, 1 year"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Equity Offered (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={fundingForm.equity}
                  onChange={(e) =>
                    setFundingForm({ ...fundingForm, equity: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn-custom">
                Submit Application
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;
