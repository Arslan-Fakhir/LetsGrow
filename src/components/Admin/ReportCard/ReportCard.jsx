import { Download, BarChart3, Clock } from 'lucide-react';
import "./ReportCard.css";

const ReportCard = ({ title = "Reports", period = "This Month", reports = [] }) => {
  return (
    <div className="card border-0 shadow-sm hover-card">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">{title}</h5>
        <div className="dropdown">
          <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
            {period}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                This Week
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Month
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Quarter
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Year
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <button className="btn btn-dark d-flex align-items-center gap-1">
            <Download size={16} />
            Download
          </button>
          <div className="position-relative" style={{ width: "64px", height: "64px" }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-warning bg-opacity-25 rounded"></div>
            <div
              className="position-absolute top-0 start-0 m-1 w-100 h-100 bg-white rounded d-flex align-items-center justify-content-center"
              style={{ width: "calc(100% - 8px)", height: "calc(100% - 8px)" }}
            >
              <Download size={32} className="text-warning" />
            </div>
          </div>
        </div>
        <div className="list-group">
          {reports.map((report, index) => (
            <a key={index} href={report.link} className="list-group-item list-group-item-action">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">{report.title}</h6>
                <BarChart3 size={18} className="text-success" />
              </div>
              <small className="text-muted">{report.period}</small>
            </a>
          ))}
        </div>
        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="small fw-medium">Report Generation</span>
            <span className="small text-success">Automated</span>
          </div>
          <div className="d-flex align-items-center small text-muted">
            <Clock size={14} className="me-1" />
            <span>Next report in 7 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;