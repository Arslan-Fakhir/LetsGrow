import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, User, Settings, HelpCircle, LogOut, Menu, UserPlus, Lightbulb } from "lucide-react";
import "./TopNavbar.css";

const TopNavbar = ({ toggleSidebar }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const logoutModalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutConfirm(true);
    setProfileOpen(false);
  };

  const handleLogoutConfirm = () => {
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <header className="bg-dark text-white py-2 px-3 d-flex align-items-center justify-content-between sticky-top">
      <div className="d-flex align-items-center gap-2 d-md-none">
        <button className="btn btn-sm btn-dark" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>

      <div className="d-flex align-items-center">
        <Link to="/" className="text-decoration-none text-white">
          <span className="fw-bold fs-5">Let's Grow</span>
        </Link>
      </div>

      <nav className="d-none d-md-flex align-items-center justify-content-end gap-4 ms-auto">
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

      <div className="d-flex align-items-center gap-3 ms-3">
        <div className="position-relative" ref={notificationRef}>
          <button className="btn btn-dark position-relative p-0" onClick={() => setNotificationOpen(!notificationOpen)}>
            <Bell size={22} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
          </button>
          {notificationOpen && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded shadow custom-dropdown-menu"
              style={{ minWidth: "300px", zIndex: 1050 }}
            >
              <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
                <span className="fw-medium text-dark">Notifications</span>
                <a href="#" className="text-decoration-none small">
                  Mark all as read
                </a>
              </div>
              <a href="#" className="d-block p-2 border-bottom text-decoration-none text-dark custom-dropdown-item">
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
              <a href="#" className="d-block p-2 border-bottom text-decoration-none text-dark custom-dropdown-item">
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
          )}
        </div>

        <div className="position-relative" ref={profileRef}>
          <button className="btn btn-dark p-0" onClick={() => setProfileOpen(!profileOpen)}>
            <img
              src="https://via.placeholder.com/40"
              alt="User profile"
              className="rounded-circle"
              width="40"
              height="40"
              style={{ objectFit: "cover" }}
            />
          </button>
          {profileOpen && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded shadow custom-dropdown-menu"
              style={{ minWidth: "200px", zIndex: 1050 }}
            >
              <a href="#" className="d-flex align-items-center p-2 text-decoration-none text-dark custom-dropdown-item">
                <User size={16} className="me-2" /> <span>Profile</span>
              </a>
              <a href="#" className="d-flex align-items-center p-2 text-decoration-none text-dark custom-dropdown-item">
                <Settings size={16} className="me-2" /> <span>Account Settings</span>
              </a>
              <a href="#" className="d-flex align-items-center p-2 text-decoration-none text-dark custom-dropdown-item">
                <HelpCircle size={16} className="me-2" /> <span>Help Center</span>
              </a>
              <div className="dropdown-divider my-1"></div>
              <a
                href="#"
                className="d-flex align-items-center p-2 text-decoration-none text-dark custom-dropdown-item"
                onClick={handleLogoutClick}
                data-logout-trigger="true"
              >
                <LogOut size={16} className="me-2" /> <span>Log Out</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-container" ref={logoutModalRef}>
            <div className="logout-modal-content">
              <h5 className="mb-3">Confirm Logout</h5>
              <p>Are you sure you want to logout?</p>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="btn btn-secondary" onClick={handleLogoutCancel}>
                  No
                </button>
                <button className="btn btn-danger" onClick={handleLogoutConfirm}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavbar;