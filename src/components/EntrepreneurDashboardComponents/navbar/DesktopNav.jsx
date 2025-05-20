import { NavLink } from "react-router-dom"
import "./DesktopNav.css"

const DesktopNav = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/service", label: "Service" },
    { path: "/contact", label: "Contact Us" },
    { path: "/about", label: "About Us" },
    { path: "/help", label: "Help & FAQs" },
  ]

  return (
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ms-auto">
        {navLinks.map((link) => (
          <li key={link.path} className="nav-item">
            <NavLink to={link.path} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DesktopNav
