import { useState } from "react";
import { Users, DollarSign, Lightbulb, User, Briefcase, Gift } from 'lucide-react';
import StatCard from "../../components/Admin/StatCard/StatCard";
//import UserCard from "../../components/Admin/UserCard/UserCard";
import ManagementCard from "../../components/Admin/ManagementCard/ManagementCard";
//import ProgressChart from "../../components/Admin/ProgressChart/ProgressChart";
import "./Admin.css";

const Admin = () => {
  const reports = [
    { title: "Monthly Report", period: "April 2023", link: "#" },
    { title: "Quarterly Report", period: "Q1 2023", link: "#" },
    { title: "Annual Report", period: "2022", link: "#" }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-content">
        <div className="admin-header">
          <div className="admin-header-content">
            <div className="admin-title-section">
              <h1 className="admin-title">Dashboard</h1>
              <p className="admin-subtitle">Welcome back, Admin! Here's what's happening today.</p>
            </div>
            
          </div>
        </div>

        {/* Quick Stats */}
        <div className="admin-stats-grid">
          <StatCard 
            icon={Users} 
            title="Total Users" 
            value={12458} 
            percentChange={12} 
            isPositive={true} 
            progressPercent={75} 
            color="primary" 
          />
          <StatCard 
            icon={DollarSign} 
            title="Total Investment" 
            value={845200} 
            percentChange={8} 
            isPositive={true} 
            progressPercent={65} 
            color="success" 
          />
          <StatCard 
            icon={Lightbulb} 
            title="Total Ideas" 
            value={32} 
            percentChange={24} 
            isPositive={true} 
            progressPercent={85} 
            color="warning" 
          />
        </div>

        <div className="admin-main-grid">
          <div className="admin-left-column">
            <div className="admin-user-cards">
              <StatCard 
                icon={User} 
                title="Total Entrepreneurs" 
                value={1245} 
                percentChange={12} 
                isPositive={true} 
                progressPercent={12} 
                color="primary" 
              />
              <StatCard 
                icon={Briefcase} 
                title="Total investors"  
                value={876} 
                percentChange={8} 
                isPositive={true} 
                progressPercent={80} 
                color="primary"
              />
            </div>
          
            {/* Management Section */}
            <div className="admin-management-section">
              <div className="admin-section-header">
                <h2 className="admin-section-title">Management Dashboard</h2>
              </div>
              <div className="admin-management-grid">
                <ManagementCard 
                  icon={Lightbulb} 
                  title="Manage Ideas" 
                  color="primary" 
                  totalLabel="Total Ideas" 
                  totalValue={3254} 
                  pendingLabel="Pending" 
                  pendingValue={42} 
                  pendingColor="warning" 
                  leftLabel="Approved" 
                  leftValue={2845} 
                  rightLabel="Rejected" 
                  rightValue={367} 
                  progressPercent={75} 
                  path="/manage-ideas" 
                />
                <ManagementCard 
                  icon={Gift} 
                  title="Manage Investment" 
                  color="success" 
                  totalLabel="Total Amount" 
                  totalValue={542680} 
                  pendingLabel="This Month" 
                  pendingValue={48250} 
                  pendingColor="success" 
                  leftLabel="Donors" 
                  leftValue={1245} 
                  rightLabel="Campaigns" 
                  rightValue={24} 
                  progressPercent={65} 
                  path="/manage-investment" 
                />
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;