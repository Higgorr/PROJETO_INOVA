import { Link } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import { ArrowBack, Description } from '@mui/icons-material';
import styles from './Relatorio.module.css';
import '@fontsource/inter';

export const Relatorio = () => {
  return (
    <Box className={styles.pageContainer}>
       <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          className={styles.backButton}
        >
          Voltar
        </Button>

      <Paper elevation={3} className={styles.contentContainer}>
        <Box className={styles.header}>
          <Description className={styles.reportIcon} />
          <Typography variant="h3" className={styles.title}>
            Relatório Recitech
          </Typography>
        </Box>
        
        <Typography variant="body1" className={styles.description}>
          Acesse nosso relatório completo com análises, métricas e resultados do sistema de gestão de materiais recicláveis.
        </Typography>
        
        <Box className={styles.buttonContainer}>
          <Button
            href="https://drive.google.com/file/d/15UUD0mtw-V_nUfhVt9Gm4t_UapRgpTCf/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            className={styles.downloadButton}
            startIcon={<Description />}
          >
            Acessar Relatório Completo
          </Button>
        </Box>

        
      </Paper>
    </Box>
  );
};