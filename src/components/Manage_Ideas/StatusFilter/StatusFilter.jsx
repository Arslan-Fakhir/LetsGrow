"use client"

import "./StatusFilter.css"

const StatusFilter = ({ filterStatus, setFilterStatus }) => {
  return (
    <div className="dropdown">
      <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        {filterStatus === "all"
          ? "All Ideas"
          : filterStatus === "approved"
            ? "Approved"
            : filterStatus === "rejected"
              ? "Rejected"
              : "Pending"}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button className="dropdown-item" onClick={() => setFilterStatus("all")}>
            All Ideas
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => setFilterStatus("pending")}>
            Pending
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => setFilterStatus("approved")}>
            Approved
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => setFilterStatus("rejected")}>
            Rejected
          </button>
        </li>
      </ul>
    </div>
  )
}

export default StatusFilter;
