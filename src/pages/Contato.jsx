import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Importe sua configuração do Firebase
import styles from './Contato.module.css';
import '@fontsource/inter';

export const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    material: '',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, "contatos"), {
        ...formData,
        data: serverTimestamp()
      });
      
      setSnackbar({
        open: true,
        message: 'Mensagem enviada com sucesso!',
        severity: 'success'
      });
      
      // Limpa o formulário após o envio
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        material: '',
        mensagem: ''
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao enviar mensagem: ' + error.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box className={styles.pageContainer}>
      <Button
        component={Link}
        to="/PROJETO_INOVA"
        startIcon={<ArrowBack />}
        className={styles.backButton}
      >
        Voltar
      </Button>
      
      <Box className={styles.container}>
        <Typography variant="h2" className={styles.pageTitle}>
          Entre em Contato
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} className={styles.contactForm}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome Completo"
                name="nome"
                variant="outlined"
                fullWidth
                required
                value={formData.nome}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Telefone"
                name="telefone"
                variant="outlined"
                fullWidth
                required
                value={formData.telefone}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Tipo de Material</InputLabel>
                <Select
                  label="Tipo de Material"
                  name="material"
                  required
                  value={formData.material}
                  onChange={handleChange}
                >
                  <MenuItem value="metal-ferroso">Metal Ferroso</MenuItem>
                  <MenuItem value="metal-nao-ferroso">Metal Não Ferroso</MenuItem>
                  <MenuItem value="plastico">Plástico</MenuItem>
                  <MenuItem value="material-eletronico">Material Eletrônico</MenuItem>
                  <MenuItem value="outros">Outros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Informe o motivo de seu contato"
                name="mensagem"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={5}
                value={formData.mensagem}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? <CircularProgress size={24} /> : 'Enviar Mensagem'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};