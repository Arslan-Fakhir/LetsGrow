import { useState, useEffect } from "react";
import { Users, DollarSign, Lightbulb, User, Briefcase, Gift } from 'lucide-react';
import StatCard from "../../components/Admin/StatCard/StatCard";
import ManagementCard from "../../components/Admin/ManagementCard/ManagementCard";
import { getAdminStats, getPendingStartups } from '../../services/adminService';
import "./Admin.css";

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvestment: 0,
    totalIdeas: 0,
    totalEntrepreneurs: 0,
    totalInvestors: 0,
    pendingIdeas: 0,
    approvedIdeas: 0,
    rejectedIdeas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, startups] = await Promise.all([
          getAdminStats(),
          getPendingStartups()
        ]);
        
        setStats({
          totalUsers: statsData.totalUsers,
          totalInvestment: statsData.totalInvestment,
          totalIdeas: statsData.totalStartups,
          totalEntrepreneurs: statsData.totalEntrepreneurs,
          totalInvestors: statsData.totalInvestors,
          pendingIdeas: startups.length,
          approvedIdeas: statsData.approvedStartups,
          rejectedIdeas: statsData.rejectedStartups
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="admin-dashboard">Loading...</div>;
  }

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
            value={stats.totalUsers} 
            percentChange={12} 
            isPositive={true} 
            progressPercent={75} 
            color="primary" 
          />
          <StatCard 
            icon={DollarSign} 
            title="Total Investment" 
            value={`$${stats.totalInvestment?.toLocaleString('en-US') || '0'}`} 
            percentChange={8} 
            isPositive={true} 
            progressPercent={65} 
            color="success" 
          />
          <StatCard 
            icon={Lightbulb} 
            title="Total Ideas" 
            value={stats.totalIdeas} 
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
                value={stats.totalEntrepreneurs} 
                percentChange={12} 
                isPositive={true} 
                progressPercent={12} 
                color="primary" 
              />
              <StatCard 
                icon={Briefcase} 
                title="Total investors"  
                value={stats.totalInvestors} 
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
                  totalValue={stats.totalIdeas} 
                  pendingLabel="Pending" 
                  pendingValue={stats.pendingIdeas} 
                  pendingColor="warning" 
                  leftLabel="Approved" 
                  leftValue={stats.approvedIdeas} 
                  rightLabel="Rejected" 
                  rightValue={stats.rejectedIdeas} 
                  progressPercent={(stats.approvedIdeas / stats.totalIdeas) * 100} 
                  path="/manage-ideas" 
                />
                <ManagementCard 
                  icon={Gift} 
                  title="Manage Investment" 
                  color="success" 
                  totalLabel="Total Amount" 
                  totalValue={`$${stats.totalInvestment.toLocaleString()}`} 
                  pendingLabel="This Month" 
                  pendingValue={stats.totalInvestment * 0.1} // Example calculation
                  pendingColor="success" 
                  leftLabel="Investors" 
                  leftValue={stats.totalInvestors} 
                  rightLabel="Startups" 
                  rightValue={stats.approvedIdeas} 
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