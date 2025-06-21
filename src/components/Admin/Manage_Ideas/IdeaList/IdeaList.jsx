"use client"

import { Eye, Check, X, Trash2, AlertTriangle } from "lucide-react"
import "./IdeaList.css"

const IdeaList = ({ filteredIdeas, handleViewDetails, handleAction, handleDeleteConfirm }) => {
  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-success"
      case "rejected":
        return "bg-danger"
      default:
        return "bg-warning"
    }
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 idea-table">
            <thead className="bg-light">
              <tr>
                <th>Title</th>
                <th>Entrepreneur</th>
                <th>Industry</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIdeas.length > 0 ? (
                filteredIdeas.map((idea) => (
                  <tr key={idea.id}>
                    <td className="fw-medium idea-title-cell">{idea.title}</td>
                    <td>{idea.entrepreneur}</td>
                    <td>{idea.industry}</td>
                    <td>{idea.date}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(idea.status)}`}>
                        {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleViewDetails(idea)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>

                        {idea.status === "pending" && (
                          <>
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleAction(idea, "approve")}
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleAction(idea, "reject")}
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteConfirm(idea)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <AlertTriangle size={24} className="text-warning mb-2" />
                    <p className="mb-0">No startup ideas found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default IdeaList;
