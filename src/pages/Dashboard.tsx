import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../feature/authSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-900 flex items-center justify-center">
      <div className="dashboard bg-white shadow-2xl rounded-xl p-10 w-full max-w-lg transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome, {user?.email}
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          You have successfully logged in !!!
        </p>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-xl hover:from-red-600 hover:to-red-800 transition-all duration-300 ease-in-out w-full"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
