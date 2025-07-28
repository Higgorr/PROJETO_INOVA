import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { Contato } from './pages/Contato';
import { Equipe } from './pages/Equipe';
import { Funcionalidades } from './pages/Funcionalidades';
import { Relatorio } from './pages/Relatorio';
import { Resultados } from './pages/Resultados';
import { Estoque } from "./pages/Estoque";
import Dashboard from './pages/Dashboard';
import Signup from './pages/signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute'; 
import ChatbotPage from './pages/ChatBotPage'; // ✅ NOVO: página do chatbot

import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota raiz redireciona para /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Signup />} />
        
        {/* Rotas protegidas */}
        <Route path="/PROJETO_INOVA" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/sobre" element={
          <ProtectedRoute>
            <Sobre />
          </ProtectedRoute>
        } />
        <Route path="/contato" element={
          <ProtectedRoute>
            <Contato />
          </ProtectedRoute>
        } />
        <Route path="/equipe" element={
          <ProtectedRoute>
            <Equipe />
          </ProtectedRoute>
        } />
        <Route path="/funcionalidades" element={
          <ProtectedRoute>
            <Funcionalidades />
          </ProtectedRoute>
        } />
        <Route path="/relatorio" element={
          <ProtectedRoute>
            <Relatorio />
          </ProtectedRoute>
        } />
        <Route path="/resultados" element={
          <ProtectedRoute>
            <Resultados />
          </ProtectedRoute>
        } />
        <Route path="/estoque" element={
          <ProtectedRoute>
            <Estoque />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* ✅ NOVO: Rota protegida para o Chatbot */}
        <Route path="/chatbot" element={
          <ProtectedRoute>
            <ChatbotPage />
          </ProtectedRoute>
        } />

        {/* Redireciona qualquer rota não encontrada para /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
