import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const data = [
  { name: 'Product A', sales: 400 },
  { name: 'Product B', sales: 300 },
  { name: 'Product C', sales: 200 },
  { name: 'Product D', sales: 278 },
  { name: 'Product E', sales: 189 },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2>Sales Dashboard</h2>
      <Link to="/products">
     <button className="goto-products-btn">Go to Product Management</button>
    </Link>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          {/* ✅ Moved legend to top-right */}
          <Legend verticalAlign="top" align="right" />
          <Bar dataKey="sales" fill="#0d1b2a">
            {/* Optional: show numbers on top of each bar */}
            <LabelList dataKey="sales" position="top" fill="#fff" fontSize={14} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
