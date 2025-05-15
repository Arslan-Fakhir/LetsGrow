"use client"

import "./StatusFilter.css"

const StatusFilter = ({ filterStatus, setFilterStatus, pendingCount, approvedCount, rejectedCount, totalCount }) => {
  return (
    <div className="status-filter">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <button
            className={`nav-link ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All <span className="badge bg-secondary ms-1">{totalCount}</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${filterStatus === "pending" ? "active" : ""}`}
            onClick={() => setFilterStatus("pending")}
          >
            Pending <span className="badge bg-warning ms-1">{pendingCount}</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${filterStatus === "approved" ? "active" : ""}`}
            onClick={() => setFilterStatus("approved")}
          >
            Approved <span className="badge bg-success ms-1">{approvedCount}</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${filterStatus === "rejected" ? "active" : ""}`}
            onClick={() => setFilterStatus("rejected")}
          >
            Rejected <span className="badge bg-danger ms-1">{rejectedCount}</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default StatusFilter;
