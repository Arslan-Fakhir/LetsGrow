import React from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaRocket } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <FaRocket className="text-green-600 text-5xl mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Transaction History
          </h1>
          <p className="text-gray-600 text-lg">
            A quick overview of your startup funding activity
          </p>
        </div>

        {/* Transaction Cards */}
        <div className="flex flex-col  justify-center gap-8">
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              className="w-full md:w-full bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {tx.startup}
                  </h2>
                  <p className="text-gray-500">{tx.name}</p>
                </div>
                <FaRocket className="text-green-500 text-xl" />
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <FaCalendarAlt />
                  <span className="text-sm">{tx.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600 text-xl font-bold">
                  <FaMoneyBillWave />
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
