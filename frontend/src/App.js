import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UserForm from './component/form'; 
import Login from './component/login'; 
import Register from './component/register';
import RecordsTable from './component/read';
import NavBar from './component/navbar';
import NotFound from './component/notFound';
import ProtectedRoute from './component/protectedRoute';

function App() {

  // use token to prevent unauthorised access to certain pages before login
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
      <Route path="/" element={token ? <Navigate to="/userform" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userform" element={<ProtectedRoute element={<><NavBar /><UserForm /></>} token={token} />} />
        <Route path="/records" element={<ProtectedRoute element={<><NavBar /><RecordsTable /></>} token={token} />} />
      
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
