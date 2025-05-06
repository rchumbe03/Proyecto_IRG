import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormLogin from './components/FormLogin.jsx';
import ListaCursos from './components/ListaCursos.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<FormLogin />} />
            <Route path="/cursos" element={<ListaCursos />} />
        </Routes>
    </BrowserRouter>
);
