import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Language from './pages/Language';
import CustomerService from './pages/CustomerService';
import './App.css';
import { LanguageLocationContextProvider } from './providers/LanguageLocationContextProvider';

const App: React.FC = () => {
    const [languageVisible, setLanguageVisible] = useState(true);

    const handleSelection = (language: string, location: string) => {
        localStorage.setItem('language', language);
        localStorage.setItem('location', location);
        setLanguageVisible(false);
    };

    useEffect(() => {
        const language = localStorage.getItem('language');
        const location = localStorage.getItem('location');

        if (language && location) {
            setLanguageVisible(false);
        }
    }, []);

    return (
        <BrowserRouter>
            <LanguageLocationContextProvider>
                <Routes>
                    <Route path="/" element={languageVisible ? <Language onSelection={handleSelection} /> : <Home />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/language" element={<Language />} /> */}
                    <Route path="/customerservice" element={<CustomerService />} />
                    <Route path="/*" element={<NoPage />} />
                </Routes>
            </LanguageLocationContextProvider>
        </BrowserRouter>
    );
};

export default App;
