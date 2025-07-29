import React from 'react';
import { Box, Grid, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import styles from './Dashboard.module.css';
import * as XLSX from 'xlsx';
import '@fontsource/inter';
import { ArrowBack } from '@mui/icons-material';

export default function Dashboard() {
  const user = auth.currentUser;
  
  // Consulta modificada para acessar o estoque do usuário logado
  const [items, loading] = useCollectionData(
    user ? query(
      collection(db, "users", user.uid, "estoque")
    ) : null
  );

  // Resumo Empresarial
  const totalKg = items?.reduce((sum, item) => sum + item.peso, 0) || 0;
  const totalValor = items?.reduce((sum, item) => sum + (item.peso * item.precoPorKg), 0) || 0;

  // Exportação
  const handleExport = () => {
    const dataToExport = items?.map(item => ({
      Material: item.material,
      Peso: `${item.peso} kg`,
      'Preço/kg': `R$ ${item.precoPorKg.toFixed(2)}`,
      'Valor Total': `R$ ${(item.peso * item.precoPorKg).toFixed(2)}`,
      Data: item.dataEntrada
    })) || [];

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estoque");
    XLSX.writeFile(workbook, "estoque_reciclagem.xlsx");
  };

  // Restante do código permanece igual...
  return (
    <Box className={styles.dashboardContainer}>
      <Box className={styles.header}>
         <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          className={styles.backButton}
        >
          Voltar
        </Button>
        
        <Typography variant="h4" className={styles.appTitle}>
          <i className="fas fa-recycle"></i>
          EcoStock Dashboard
        </Typography>
      </Box>

      {/* Restante do código permanece igual */}
      <Grid container spacing={3} className={styles.gridContainer}>
        {/* Card Resumo */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.card} elevation={0}>
            <Typography variant="h6" className={styles.cardTitle}>
              <i className="fas fa-chart-pie" style={{ marginRight: '10px' }}></i>
              Resumo Empresarial
            </Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="150px">
                <CircularProgress />
              </Box>
            ) : (
              <Box className={styles.kpiContainer}>
                <Box mb={3}>
                  <Typography className={styles.kpiLabel}>Total em Estoque</Typography>
                  <Typography className={styles.kpiValue}>
                    <i className="fas fa-weight-hanging"></i>
                    {totalKg.toFixed(2)} kg
                  </Typography>
                  <Box className={styles.progressBar}>
                    <Box 
                      className={styles.progressFill} 
                      style={{ width: `${Math.min(100, (totalKg / 10000) * 100)}%` }}
                    ></Box>
                  </Box>
                  <Typography className={styles.kpiLabel}>
                    Capacidade utilizada: {Math.min(100, (totalKg / 10000) * 100).toFixed(1)}%
                  </Typography>
                </Box>
                
                <Box>
                  <Typography className={styles.kpiLabel}>Valor Estimado</Typography>
                  <Typography className={styles.kpiValue}>
                    <i className="fas fa-coins"></i>
                    {totalValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                  <Typography className={styles.trendIndicator}>
                    <i className="fas fa-arrow-up"></i> 12.4% no último mês
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Card Exportação */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.card} elevation={0}>
            <Typography variant="h6" className={styles.cardTitle}>
              <i className="fas fa-file-export" style={{ marginRight: '10px' }}></i>
              Exportação de Dados
            </Typography>
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              justifyContent="center" 
              height="100%"
              minHeight="200px"
            >
              <Button 
                onClick={handleExport}
                disabled={loading || !items?.length}
                className={styles.exportButton}
                startIcon={<i className="fas fa-file-excel"></i>}
              >
                Exportar para Excel
              </Button>
              
              {items?.length > 0 && (
                <Typography variant="body2" mt={2} className={styles.kpiLabel}>
                  {items.length} itens disponíveis para exportação
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Card Materiais */}
        {items && items.length > 0 && (
          <Grid item xs={12}>
            <Paper className={styles.card} elevation={0}>
              <Typography variant="h6" className={styles.cardTitle}>
                <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
                Materiais em Estoque
              </Typography>
              <Grid container spacing={2} className={styles.materialGrid}>
                {items.slice(0, 4).map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper className={styles.materialCard} elevation={0}>
                      <Typography className={styles.materialName}>
                        <i className="fas fa-cube"></i>
                        {item.material}
                      </Typography>
                      <Typography className={styles.kpiLabel}>Estoque atual</Typography>
                      <Typography className={styles.kpiValue}>{item.peso} kg</Typography>
                      <Box className={styles.materialInfo}>
                        <Box className={styles.infoItem}>
                          <Typography className={styles.infoValue}>
                            R$ {item.precoPorKg.toFixed(2)}
                          </Typography>
                          <Typography className={styles.infoLabel}>Preço/kg</Typography>
                        </Box>
                        <Box className={styles.infoItem}>
                          <Typography className={styles.infoValue}>
                            R$ {(item.peso * item.precoPorKg).toFixed(2)}
                          </Typography>
                          <Typography className={styles.infoLabel}>Total</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}