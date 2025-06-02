import { useState, useEffect } from "react";
import { Users, DollarSign, Lightbulb, AlertTriangle, Download, User, Briefcase, Gift, Shield, Clock, BarChart } from 'lucide-react';
import Sidebar from "../../components/Admin_Dashboard/Sidebar/Sidebar";
import TopNavbar from "../../components/Admin_Dashboard/TopNavbar/TopNavbar";
import StatCard from "../../components/Admin_Dashboard/StatCard/StatCard";
import UserCard from "../../components/Admin_Dashboard/UserCard/UserCard";
import ManagementCard from "../../components/Admin_Dashboard/ManagementCard/ManagementCard";
import ProgressChart from "../../components/Admin_Dashboard/ProgressChart/ProgressChart";
import ReportCard from "../../components/Admin_Dashboard/ReportCard/ReportCard";
import FeedbackCard from "../../components/Admin_Dashboard/FeedbackCard/FeedbackCard";
import RegisteredUsersCard from "../../components/Admin_Dashboard/RegisteredUsersCard/RegisteredUsersCard";
import "./Admin.css";

const Admin = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Sample data for reports
  const reports = [
    { title: "Monthly Report", period: "April 2023", link: "#" },
    { title: "Quarterly Report", period: "Q1 2023", link: "#" },
    { title: "Annual Report", period: "2022", link: "#" }
  ];

  return (
    <div className="d-flex vh-100">
      <Sidebar 
        activeMenuItem={activeMenuItem} 
        setActiveMenuItem={setActiveMenuItem} 
        sidebarExpanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column transition-all"
        style={{
          marginLeft: windowWidth >= 768 ? (sidebarExpanded ? "250px" : "80px") : "0",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <TopNavbar toggleSidebar={toggleSidebar} />

        {/* Dashboard Content */}
        <main className="flex-grow-1 p-3 p-md-4 overflow-auto bg-light">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fs-3 fw-bold mb-1">Dashboard</h1>
              <p className="text-muted mb-0">Welcome back, Admin! Here's what's happening today.</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success d-flex align-items-center gap-1">
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="row g-3 mb-4">
            <div className="col-md-3 col-sm-6">
              <StatCard 
                icon={Users} 
                title="Total Users" 
                value={12458} 
                percentChange={12} 
                isPositive={true} 
                progressPercent={75} 
                color="primary" 
              />
            </div>
            <div className="col-md-3 col-sm-6">
              <StatCard 
                icon={DollarSign} 
                title="Total Investment" 
                value={845200} 
                percentChange={8} 
                isPositive={true} 
                progressPercent={65} 
                color="success" 
              />
            </div>
            <div className="col-md-3 col-sm-6">
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
            <div className="col-md-3 col-sm-6">
              <StatCard 
                icon={AlertTriangle} 
                title="Pending Issues" 
                value={42} 
                percentChange={5} 
                isPositive={false} 
                progressPercent={25} 
                color="danger" 
              />
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="row g-4">
                {/* Total Entrepreneur Card */}
                <div className="col-md-6">
                  <UserCard 
                    icon={User}
                    title="Total"
                    subtitle="Entrepreneur"
                    value={1245}
                    percentChange={12}
                    infoText={<><span className="fw-medium">124</span> new entrepreneurs this month</>}
                    buttonText="View Details"
                    buttonVariant="outline-primary"
                    path="/entrepreneurs"
                    iconColor="primary"
                  />
                </div>

                {/* Total Investors Card */}
                <div className="col-md-6">
                  <UserCard 
                    icon={Briefcase}
                    title="Total"
                    subtitle="Investors"
                    value={876}
                    percentChange={8}
                    infoText={<><span className="fw-medium">56</span> new investors this month</>}
                    buttonText="View Details"
                    buttonVariant="outline-success"
                    path="/investors"
                    iconColor="success"
                  />
                </div>

                {/* Management Section */}
                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3">
                      <h5 className="mb-0 fw-bold">Management Dashboard</h5>
                    </div>
                    <div className="card-body p-4">
                      <div className="row g-4">
                        <div className="col-md-4">
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
                        </div>
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                          <ManagementCard 
                            icon={Shield}
                            title="Manage Dispute"
                            color="danger"
                            totalLabel="Total Disputes"
                            totalValue={128}
                            pendingLabel="Unresolved"
                            pendingValue={42}
                            pendingColor="danger"
                            leftLabel="Resolved"
                            leftValue={86}
                            rightLabel="Avg Time"
                            rightValue={"3.2 days"}
                            progressPercent={35}
                            path="/manage-disputes"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working Progress & Pending Requests */}
               
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm hover-card">
                    <div className="card-header bg-dark text-white py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">Pending Requests</h5>
                      <button className="btn btn-sm btn-outline-light">View All</button>
                    </div>
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <ProgressChart percentage={25} color="#dc3545" size={100} label="Pending" />
                        <div className="ms-4 flex-grow-1">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                              <div>
                                <div className="fw-medium">User Verification</div>
                                <div className="small text-muted">12 pending requests</div>
                              </div>
                              <span className="badge bg-danger rounded-pill">12</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                              <div>
                                <div className="fw-medium">Idea Approval</div>
                                <div className="small text-muted">8 pending requests</div>
                              </div>
                              <span className="badge bg-danger rounded-pill">8</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0">
                              <div>
                                <div className="fw-medium">Support Tickets</div>
                                <div className="small text-muted">5 pending requests</div>
                              </div>
                              <span className="badge bg-danger rounded-pill">5</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <AlertTriangle size={18} className="text-danger me-2" />
                          <span className="text-muted small">Requires immediate attention</span>
                        </div>
                        <button className="btn btn-sm btn-danger">Process Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-4">
              {/* Feedbacks Card */}
              <FeedbackCard 
                title="Feedbacks"
                newCount={24}
                rating={4.8}
                satisfactionRate={94}
              />

              {/* Registered Users Card */}
              <RegisteredUsersCard 
                title="Registered Users"
                users={[
                  { initial: "A", color: "warning" },
                  { initial: "R", color: "info" }
                ]}
                totalMembers={17}
                userGrowth={12}
                progressPercent={75}
              />

              {/* Reports Section */}
              <ReportCard 
                title="Reports"
                period="This Month"
                reports={reports}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;