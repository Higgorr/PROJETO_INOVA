import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Snackbar, Alert, Typography, InputAdornment, MenuItem,
  FormControl, InputLabel, Select, CircularProgress, Avatar
} from '@mui/material';
import { Delete, Edit, FilterList, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { 
  collection, addDoc, doc, deleteDoc, updateDoc,
  onSnapshot, query, orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';
import styles from './Estoque.module.css';
import '@fontsource/inter';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function Estoque() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    material: "",
    peso: 0,
    precoPorKg: 0,
    dataEntrada: new Date().toISOString().split('T')[0]
  });
  const [editId, setEditId] = useState(null);
  const [valorTotal, setValorTotal] = useState(0);
  const [filtro, setFiltro] = useState('todos');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [loading, setLoading] = useState(false);

  // Buscar itens do Firestore (em tempo real) com ordenação por data
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "estoque"), 
      orderBy("dataEntrada", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        valorTotal: doc.data().peso * doc.data().precoPorKg
      }));
      setItems(itemsData);
      setLoading(false);
    }, (error) => {
      setSnackbar({
        open: true,
        message: `Erro ao carregar dados: ${error.message}`,
        severity: "error"
      });
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Calcular valor total quando peso ou preço mudam
  useEffect(() => {
    setValorTotal(formData.peso * formData.precoPorKg);
  }, [formData.peso, formData.precoPorKg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "peso" || name === "precoPorKg" ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const itemData = {
        ...formData,
        valorTotal: formData.peso * formData.precoPorKg
      };

      if (editId) {
        await updateDoc(doc(db, "estoque", editId), itemData);
        setSnackbar({
          open: true,
          message: "Material atualizado com sucesso!",
          severity: "success"
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, "estoque"), itemData);
        setSnackbar({
          open: true,
          message: "Material adicionado com sucesso!",
          severity: "success"
        });
      }
      
      setFormData({ 
        material: "",
        peso: 0,
        precoPorKg: 0,
        dataEntrada: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Erro: ${error.message}`,
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      material: item.material,
      peso: item.peso,
      precoPorKg: item.precoPorKg,
      dataEntrada: item.dataEntrada
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "estoque", id));
      setSnackbar({
        open: true,
        message: "Material removido com sucesso!",
        severity: "success"
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Erro ao remover: ${error.message}`,
        severity: "error"
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const itensFiltrados = filtro === 'todos' 
    ? items 
    : items.filter(item => item.material === filtro);

  const getMaterialColor = (material) => {
    const colors = {
      'MetalFerroso': '#4e342e',    // Brown
      'MetalNãoFerroso': '#8d6e63', // Light Brown
      'plastico': '#0288d1',        // Blue
      'Aparas de papel': '#fbc02d', // Yellow
      'Materiais Eletrônicos': '#7b1fa2' // Purple
    };
    return colors[material] || '#616161'; // Default gray
  };

  const totalEstoque = items.reduce((sum, item) => sum + item.peso, 0);
  const valorTotalEstoque = items.reduce((sum, item) => sum + item.valorTotal, 0);

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          className={styles.backButton}
        >
          Voltar
        </Button>
        
        <Typography variant="h4" className={styles.title}>
          <i className="fas fa-boxes"></i> Gestão de Estoque
        </Typography>
      </Box>
      
      {/* Resumo do Estoque */}
      <Box className={styles.summaryCards}>
        <Paper className={styles.summaryCard}>
          <Typography variant="h6">Total em Estoque</Typography>
          <Typography variant="h4" className={styles.summaryValue}>
            {totalEstoque.toFixed(2)} kg
          </Typography>
        </Paper>
        
        <Paper className={styles.summaryCard}>
          <Typography variant="h6">Valor Total</Typography>
          <Typography variant="h4" className={styles.summaryValue}>
            {valorTotalEstoque.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </Typography>
        </Paper>
        
        <Paper className={styles.summaryCard}>
          <Typography variant="h6">Materiais Diferentes</Typography>
          <Typography variant="h4" className={styles.summaryValue}>
            {[...new Set(items.map(item => item.material))].length}
          </Typography>
        </Paper>
      </Box>

      {/* Formulário */}
      <Paper className={styles.formContainer}>
        <Typography variant="h6" className={styles.formTitle}>
          {editId ? "Editar Material" : "Adicionar Novo Material"}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <Box className={styles.formRow}>
            <FormControl fullWidth className={styles.formField}>
              <InputLabel>Tipo de Material</InputLabel>
              <Select
                name="material"
                value={formData.material}
                onChange={handleChange}
                required
                label="Tipo de Material"
              >
                <MenuItem value="MetalFerroso">Metal Ferroso</MenuItem>
                <MenuItem value="MetalNãoFerroso">Metal Não Ferroso</MenuItem>
                <MenuItem value="plastico">Plástico</MenuItem>
                <MenuItem value="Aparas de papel">Aparas de Papel</MenuItem>
                <MenuItem value="Materiais Eletrônicos">Materiais Eletrônicos</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Peso (kg)"
              name="peso"
              type="number"
              value={formData.peso || ''}
              onChange={handleChange}
              inputProps={{ step: "0.01", min: "0" }}
              required
              fullWidth
              className={styles.formField}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
            />

            <TextField
              label="Preço por kg"
              name="precoPorKg"
              type="number"
              value={formData.precoPorKg || ''}
              onChange={handleChange}
              inputProps={{ step: "0.01", min: "0" }}
              required
              fullWidth
              className={styles.formField}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
            />
          </Box>

          <Box className={styles.formRow}>
            <TextField
              label="Data"
              name="dataEntrada"
              type="date"
              value={formData.dataEntrada}
              onChange={handleChange}
              required
              className={styles.formField}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box className={styles.totalBox}>
              <Typography variant="subtitle1">
                Valor Total: {valorTotal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.formActions}>
            {editId && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditId(null);
                  setFormData({ 
                    material: "",
                    peso: 0,
                    precoPorKg: 0,
                    dataEntrada: new Date().toISOString().split('T')[0]
                  });
                }}
                className={styles.cancelButton}
              >
                Cancelar
              </Button>
            )}
            
            <Button 
              type="submit" 
              variant="contained"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : editId ? (
                "Atualizar Material"
              ) : (
                "Cadastrar Material"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Filtro e Tabela */}
      <Box className={styles.tableSection}>
        <Box className={styles.filterContainer}>
          <FormControl variant="outlined" className={styles.filterField}>
            <InputLabel><FilterList fontSize="small" /> Filtrar por Material</InputLabel>
            <Select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              label="Filtrar por Material"
            >
              <MenuItem value="todos">Todos Materiais</MenuItem>
              {[...new Set(items.map(item => item.material))].map(material => (
                <MenuItem key={material} value={material}>
                  {material}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Typography variant="body1" className={styles.itemsCount}>
            {itensFiltrados.length} itens encontrados
          </Typography>
        </Box>

        <TableContainer component={Paper} className={styles.table}>
          <Table>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell className={styles.headerCell}>Material</TableCell>
                <TableCell className={styles.headerCell} align="right">Peso (kg)</TableCell>
                <TableCell className={styles.headerCell} align="right">Preço/kg</TableCell>
                <TableCell className={styles.headerCell} align="right">Valor Total</TableCell>
                <TableCell className={styles.headerCell}>Data</TableCell>
                <TableCell className={styles.headerCell}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : itensFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum material encontrado
                  </TableCell>
                </TableRow>
              ) : (
                itensFiltrados.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className={styles.tableRow}
                    sx={{ borderLeft: `4px solid ${getMaterialColor(item.material)}` }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: getMaterialColor(item.material),
                            width: 32, 
                            height: 32 
                          }}
                        >
                          {item.material.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography fontWeight="bold">
                          {item.material}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{item.peso.toFixed(2)} kg</TableCell>
                    <TableCell align="right">
                      {item.precoPorKg.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold">
                        {item.valorTotal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.dataEntrada}</TableCell>
                    <TableCell className={styles.actionCell}>
                      <IconButton 
                        onClick={() => handleEdit(item)}
                        className={styles.editButton}
                        title="Editar"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir este item?')) {
                            handleDelete(item.id);
                          }
                        }}
                        className={styles.deleteButton}
                        title="Excluir"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}