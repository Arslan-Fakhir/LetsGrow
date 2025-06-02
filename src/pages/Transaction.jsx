import React from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaRocket } from "react-icons/fa";
import "./Transaction.css";

const transactions = [
  {
    startup: "EcoBite",
    name: "Arslan Fakhir",
    date: "2024-01-20",
    amount: 250000,
  },
  {
    startup: "ChainIQ",
    name: "Ahmad Nadeem",
    date: "2024-12-20",
    amount: 150000,
  },
  {
    startup: "Harvestly",
    name: "Kamran Sajjad",
    date: "2024-01-20",
    amount: 150000,
  },
  {
    startup: "StainLessSteel",
    name: "Ali Raza",
    date: "2024-01-20",
    amount: 280000,
  },
];

const Transaction = () => {
  return (
    <div className="transaction-container">
      <div className="container py-5">
        {/* Hero */}
        <div className="text-center mb-5">
          <FaRocket className="transaction-icon mb-3" />
          <h1 className="transaction-title mb-2">
            Transaction History
          </h1>
          <p className="transaction-subtitle">
            A quick overview of your startup funding activity
          </p>
        </div>

        {/* Transaction Cards */}
        <div className="transaction-cards-container">
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              className="transaction-card"
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="transaction-startup">
                    {tx.startup}
                  </h2>
                  <p className="transaction-name">{tx.name}</p>
                </div>
                <FaRocket className="transaction-rocket" />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center transaction-date">
                  <FaCalendarAlt className="me-2" />
                  <span>{tx.date}</span>
                </div>
                <div className="d-flex align-items-center transaction-amount">
                  <FaMoneyBillWave className="me-2" />
                  <span>{tx.amount.toLocaleString()} RS</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;