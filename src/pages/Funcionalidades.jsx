import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Container
} from '@mui/material';
import { 
  ArrowBack,
  Nature,  // Substitui o Eco por Nature
  Storage,
  TrendingDown,
  Assessment,
  ShowChart,
  Recycling
} from '@mui/icons-material';
import styles from './Funcionalidades.module.css';
import funcImage from '../assets/func.webp';
import '@fontsource/inter';

export const Funcionalidades = () => {
  const features = [
    {
      icon: <Nature color="primary" />,  // Ícone alterado aqui
      title: "Conscientização",
      description: "Educação sobre a importância da reciclagem para o meio ambiente com materiais didáticos e workshops."
    },
    {
      icon: <Storage color="primary" />,
      title: "Armazenamento Adequado",
      description: "Sistema inteligente para combater a degradação causada pelo armazenamento incorreto de materiais recicláveis."
    },
    {
      icon: <TrendingDown color="primary" />,
      title: "Redução de Poluição",
      description: "Diminuição significativa dos níveis de poluição através de práticas sustentáveis"
    },
    {
      icon: <Assessment color="primary" />,
      title: "Relatórios Detalhados",
      description: "Geração automática de relatórios com métricas de impacto ambiental e econômico."
    },
    {
      icon: <ShowChart color="primary" />,
      title: "Análise de Dados",
      description: "Painéis interativos para acompanhamento dos resultados e tendências de reciclagem."
    },
    {
      icon: <Recycling color="primary" />,
      title: "Gestão de Materiais",
      description: "Controle completo dos tipos de materiais recicláveis com categorização inteligente."
    }
  ];

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

      <Container maxWidth="lg">
        <Paper elevation={3} className={styles.headerPaper}>
          <Typography variant="h2" className={styles.mainTitle}>
            Nossas Funcionalidades
          </Typography>
          <Typography variant="h5" className={styles.subTitle}>
            Tecnologia a serviço da sustentabilidade ambiental
          </Typography>
        </Paper>

        <Grid container spacing={4} className={styles.contentGrid}>
          <Grid item xs={12} md={6}>
            <List className={styles.featuresList}>
              {features.map((feature, index) => (
                <Paper key={index} elevation={2} className={styles.featureCard}>
                  <ListItem>
                    <ListItemIcon className={styles.featureIcon}>
                      {feature.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="h6" className={styles.featureTitle}>{feature.title}</Typography>}
                      secondary={<Typography variant="body1" className={styles.featureDesc}>{feature.description}</Typography>}
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={styles.imagePaper}>
              <img 
                src={funcImage} 
                alt="Ilustração de funcionalidades de reciclagem" 
                className={styles.featureImage}
                loading="lazy"
              />
              <Typography variant="caption" className={styles.imageCaption}>
                Soluções integradas para gestão de recicláveis
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};