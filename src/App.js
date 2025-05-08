import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { Contato } from './pages/Contato';
import { Equipe } from './pages/Equipe';
import { Funcionalidades } from './pages/Funcionalidades';
import { Relatorio } from './pages/Relatorio';
import { Resultados } from './pages/Resultados';
import Signup from './signup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute'; 
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública */}
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
      </Routes>
    </Router>
  );
}

export default App;
