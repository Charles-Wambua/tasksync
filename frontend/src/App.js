import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UserForm from './component/formm'; // Import UserForm
import Login from './component/login'; // Import Login
import Register from './component/register';
import RecordsTable from './component/read';
import NavBar from './component/navbar';
import NotFound from './component/notFound';
import ProtectedRoute from './component/protectedRoute';

function App() {
  const token = localStorage.getItem('token'); // Check if token exists

  return (
    <Router>
      <Routes>
      <Route path="/" element={token ? <Navigate to="/userform" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userform" element={<ProtectedRoute element={<><NavBar /><UserForm /></>} token={token} />} />
        <Route path="/records" element={<ProtectedRoute element={<><NavBar /><RecordsTable /></>} token={token} />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
