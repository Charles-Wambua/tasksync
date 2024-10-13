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
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/userform" element={<ProtectedRoute element={<><NavBar /><UserForm /></>} />} />
        <Route path="/records" element={<ProtectedRoute element={<><NavBar /><RecordsTable /></>}/>} />
      
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
