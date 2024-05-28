import React from 'react';
import '../App.css'

interface DashboardProps {
    onLogout: () => void;
  }
  
  const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    return (
      <div className="container">
        <h2>Dashboard</h2>
        <button className="logout" onClick={onLogout}>Logout</button>
        <button className="start">Bắt đầu</button>
      </div>
    );
  };
  
  export default Dashboard;