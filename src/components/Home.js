import React from 'react';

const Home = ({ onLogout }) => {
  return (
    <div>
      <h2>Welcome</h2>
      <button>Bắt đầu</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
