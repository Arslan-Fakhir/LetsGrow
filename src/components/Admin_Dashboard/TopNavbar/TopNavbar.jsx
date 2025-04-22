import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Settings, HelpCircle, LogOut, Menu, UserPlus, Lightbulb } from 'lucide-react';
import "./TopNavbar.css";

const TopNavbar = ({ toggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-dark text-white py-2 px-3 d-flex align-items-center justify-content-between sticky-top">
      <div className="d-flex align-items-center gap-2 d-md-none">
        <button className="btn btn-sm btn-dark" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>

      <nav className="d-none d-md-flex align-items-center justify-content-center gap-4 mx-auto">
        <Link to="/" className="text-success text-decoration-none nav-link-hover">
          Home
        </Link>
        <Link to="/service" className="text-white text-decoration-none nav-link-hover">
          Service
        </Link>
        <Link to="/contact" className="text-white text-decoration-none nav-link-hover">
          Contact Us
        </Link>
        <Link to="/about" className="text-white text-decoration-none nav-link-hover">
          About Us
        </Link>
        <Link to="/help" className="text-white text-decoration-none nav-link-hover">
          Help & FAQs
        </Link>
      </nav>

      <div className="d-flex align-items-center gap-3">
        <div className="d-none d-md-block text-light">
          <small>
            {currentTime.toLocaleDateString()} |{" "}
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </small>
        </div>

        <div className="position-relative dropdown">
          <button className="btn btn-dark position-relative p-0" data-bs-toggle="dropdown">
            <Bell size={22} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              2
            </span>
          </button>
          <div className="dropdown-menu dropdown-menu-end p-0" style={{ minWidth: "300px" }}>
            <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
              <span className="fw-medium">Notifications</span>
              <a href="#" className="text-decoration-none small">
                Mark all as read
              </a>
            </div>
            <a href="#" className="dropdown-item p-2 border-bottom">
              <div className="d-flex gap-2">
                <div className="bg-success bg-opacity-10 rounded-circle p-2">
                  <UserPlus size={16} className="text-success" />
                </div>
                <div>
                  <div className="fw-medium">New investor registered</div>
                  <div className="text-secondary small">2 minutes ago</div>
                </div>
              </div>
            </a>
            <a href="#" className="dropdown-item p-2 border-bottom">
              <div className="d-flex gap-2">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                  <Lightbulb size={16} className="text-primary" />
                </div>
                <div>
                  <div className="fw-medium">New idea submitted</div>
                  <div className="text-secondary small">1 hour ago</div>
                </div>
              </div>
            </a>
            <div className="p-2 text-center">
              <a href="#" className="text-decoration-none small">
                View all notifications
              </a>
            </div>
          </div>
        </div>

        <div className="dropdown">
          <button className="btn btn-dark p-0" data-bs-toggle="dropdown">
            <img
              src="/placeholder-user.jpg"
              alt="User profile"
              className="rounded-circle"
              width="40"
              height="40"
              style={{ objectFit: "cover" }}
            />
          </button>
          <div className="dropdown-menu dropdown-menu-end">
            <a href="#" className="dropdown-item">
              <User size={16} className="me-2" /> Profile
            </a>
            <a href="#" className="dropdown-item">
              <Settings size={16} className="me-2" /> Account Settings
            </a>
            <a href="#" className="dropdown-item">
              <HelpCircle size={16} className="me-2" /> Help Center
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <LogOut size={16} className="me-2" /> Log Out
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;