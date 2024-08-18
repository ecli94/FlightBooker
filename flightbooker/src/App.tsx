import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopOfPage from './pages/TopOfPage';
import BottomOfPage from './pages/BottomOfPage';
import Home from './pages/Home';
import Book from './pages/Book';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Language from './pages/Language';
import CustomerService from './pages/CustomerService';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TopOfPage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/language" element={<Language />} />
        <Route path="/customerservice" element={<CustomerService />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <BottomOfPage />
    </BrowserRouter>
  );
};

export default App;
