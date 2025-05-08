import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database"; // Métodos do Realtime Database
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase"; // Certifique-se de que 'database' está exportado no seu firebase.js

const Signup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 1. Cria usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
  
      // 2. Salva dados no Realtime Database
      await set(ref(db, `usuarios/${user.uid}`), {
        nome: nome,
        email: email
      });
  
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro detalhado:", error); // Mostra o erro completo
      alert(`Falha no cadastro: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar</h2>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Signup;