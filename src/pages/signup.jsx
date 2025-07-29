import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import styles from './Signup.module.css';
import '@fontsource/inter';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Signup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Cria o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Cria o documento do usuário na coleção "users" (com UID como ID)
      await setDoc(doc(db, "users", user.uid), {
        nome: nome,
        email: email,
        criadoEm: new Date() // Usando timestamp nativo do Firestore
      });

      // 3. Redireciona com mensagem de sucesso
      navigate('/login', { 
        state: { 
          from: '/', 
          message: 'Cadastro realizado com sucesso!',
          email: email // Opcional: pré-preencher e-mail no login
        } 
      });

    } catch (error) {
      console.error("Erro detalhado:", error);
      setError(getErrorMessage(error.code));
      setLoading(false);
    }
  };

  // Mensagens de erro (mantido igual)
  const getErrorMessage = (code) => {
    switch(code) {
      case "auth/email-already-in-use":
        return "Este e-mail já está em uso. Tente fazer login.";
      case "auth/invalid-email":
        return "E-mail inválido. Por favor, insira um e-mail válido.";
      case "auth/weak-password":
        return "Senha muito fraca. Use pelo menos 6 caracteres.";
      default:
        return "Ocorreu um erro durante o cadastro. Tente novamente.";
    }
  };

  return (
    <Box className={styles.signupContainer}>
      <Box className={styles.signupCard}>
        <Box className={styles.signupHeader}>
          <i className={`fas fa-user-plus ${styles.signupIcon}`}></i>
          <Typography variant="h4" className={styles.signupTitle}>
            Criar nova conta
          </Typography>
          <Typography variant="body1" className={styles.signupSubtitle}>
            Junte-se ao nosso sistema de gestão de recicláveis
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" className={styles.errorMessage}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} className={styles.signupForm}>
          <TextField
            label="Nome Completo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <i className={`fas fa-user ${styles.inputIcon}`}></i>
              ),
            }}
          />
          
          <TextField
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
              ),
            }}
          />
          
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <i className={`fas fa-lock ${styles.inputIcon}`}></i>
              ),
            }}
            helperText="Use pelo menos 6 caracteres"
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={styles.signupButton}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <i className={`fas fa-user-plus ${styles.buttonIcon}`}></i>
                Criar Conta
              </>
            )}
          </Button>
        </Box>

        <Box className={styles.loginLink}>
          <Typography variant="body2">
            Já tem uma conta?{' '}
            <Link to="/login" className={styles.link}>
              <strong>Faça login aqui</strong>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;