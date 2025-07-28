import React, { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "firebase/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { Box, Button, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import styles from './Login.module.css';
import '@fontsource/inter';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redireciona usuários já logados
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(location.state?.from || "/PROJETO_INOVA", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      setError(getErrorMessage(error.code));
      setLoading(false);
    }
  };

  // Função para mensagens de erro mais amigáveis
  const getErrorMessage = (code) => {
    switch(code) {
      case "auth/invalid-email":
        return "E-mail inválido";
      case "auth/user-disabled":
        return "Conta desativada";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "E-mail ou senha incorretos";
      default:
        return "Erro ao fazer login. Tente novamente.";
    }
  };

  return (
    <Box className={styles.loginContainer}>
      <Box className={styles.loginCard}>
        <Box className={styles.loginHeader}>
          <i className={`fas fa-sign-in-alt ${styles.loginIcon}`}></i>
          <Typography variant="h4" className={styles.loginTitle}>
            Acesse sua conta
          </Typography>
          <Typography variant="body1" className={styles.loginSubtitle}>
            Gerencie seu estoque de materiais recicláveis
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" className={styles.errorMessage}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin} className={styles.loginForm}>
          <TextField
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
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
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <i className={`fas fa-lock ${styles.inputIcon}`}></i>
              ),
            }}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <i className={`fas fa-sign-in-alt ${styles.buttonIcon}`}></i>
                Entrar
              </>
            )}
          </Button>
        </Box>

        <Box className={styles.loginLinks}>
          <Typography variant="body2">
            Ainda não tem uma conta?{" "}
            <Link 
              to="/cadastro" 
              state={{ from: location.state?.from }}
              className={styles.link}
            >
              <strong>Cadastre-se aqui</strong>
            </Link>
          </Typography>
          
          <Link 
            to="/recuperar-senha" 
            className={styles.link}
          >
            <i className={`fas fa-key ${styles.linkIcon}`}></i>
            Esqueceu sua senha?
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;