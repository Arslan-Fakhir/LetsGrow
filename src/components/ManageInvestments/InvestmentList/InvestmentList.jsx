"use client"

import { Eye, Check, AlertTriangle } from "lucide-react"
import "./InvestmentList.css"

const InvestmentList = ({ investments, handleViewDetails, handleAction }) => {
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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Change to PKR if needed
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 investment-table">
            <thead className="bg-light">
              <tr>
                <th>Investor Name</th>
                <th>Amount</th>
                <th>Startup</th>
                <th>Payment Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {investments.length > 0 ? (
                investments.map((investment) => (
                  <tr key={investment._id} className="investment-row">
                    <td className="fw-medium">{investment.investorName}</td>
                    <td>{formatCurrency(investment.amount)}</td>
                    <td>{investment.startupTitle || "General Donation"}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(investment.status)}`}>
                        {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleViewDetails(investment)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>

                        {investment.status === "pending" && (
                          <>
                            <button
                              className="btn btn-sm btn-outline-primary approve-btn"
                              onClick={() => handleAction(investment, "approve")}
                              title="Approve"
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger reject-btn"
                              onClick={() => handleAction(investment, "reject")}
                              title="Reject"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <AlertTriangle size={24} className="text-warning mb-2" />
                    <p className="mb-0">No investments found matching your criteria.</p>
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

export default InvestmentList