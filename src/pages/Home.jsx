import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './Home.module.css'; 
import bannerImg from '../assets/header.png';
import reciclagemImg from '../assets/tres-pessoas-carregando-caixas-com-materiais-para-reciclagem.webp';
import { Box, Button, Container, Typography, Avatar } from '@mui/material';
import '@fontsource/inter';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Chatbot from './ChatBotPage';

export const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Box className={styles.homeContainer}>
      {/* Hero Banner */}
      <Box className={styles.heroBanner}>
        <img src={bannerImg} alt="Banner Projeto Inova" className={styles.bannerImage} />
        <Box className={styles.heroOverlay}>
          <Typography variant="h1" className={styles.heroTitle}>
            Transformando Resíduos em Oportunidades
          </Typography>
          <Typography variant="h5" className={styles.heroSubtitle}>
            Soluções inteligentes para gestão de materiais recicláveis
          </Typography>
        </Box>
      </Box>
      
      {/* Navigation */}
      <Box component="header" className={styles.header}>
        <Container maxWidth="xl" className={styles.navContainer}>
          <Box component="nav">
            <ul className={styles.navList}>
              <li>
                <Link to="/funcionalidades" className={styles.navLink}>
                  <i className="fas fa-cogs"></i> Funcionalidades
                </Link>
              </li>
              <li>
                <Link to="/resultados" className={styles.navLink}>
                  <i className="fas fa-chart-line"></i> Resultados
                </Link>
              </li>
              <li>
                <Link to="/contato" className={styles.navLink}>
                  <i className="fas fa-envelope"></i> Contato
                </Link>
              </li>
              <li>
                <Link to="/relatorio" className={styles.navLink}>
                  <i className="fas fa-file-alt"></i> Relatório
                </Link>
              </li>
              <li>
                <Link to="/Dashboard" className={styles.navLink}>
                  <i className="fas fa-tachometer-alt"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/Estoque" className={styles.navLink}>
                  <i className="fas fa-boxes"></i> Estoque
                </Link>
              </li>
            </ul>
          </Box>

          {/* Área do usuário e logout */}
          {user && (
            <Box className={styles.userArea}>
              <Avatar 
                src={user.photoURL} 
                alt={user.displayName || 'Usuário'}
                className={styles.userAvatar}
              >
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </Avatar>
              <Button
                onClick={handleLogout}
                className={styles.logoutButton}
                startIcon={<i className="fas fa-sign-out-alt"></i>}
              >
                Sair
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Main Content */}
      <Box component="main" className={styles.mainContent}>
        <Container maxWidth="xl" style={{ display: 'contents' }}>
          {/* Seção de conteúdo principal */}
          <Box className={styles.contentSection}>
            {/* About Section */}
            <Box className={styles.aboutSection}>
              <Typography variant="h2" className={styles.sectionTitle}>
                <i className="fas fa-recycle"></i> Quem somos?
              </Typography>
              
              <Box className={styles.aboutContent}>
                <img
                  src={reciclagemImg}
                  alt="Pessoas trabalhando com reciclagem"
                  className={styles.aboutImage}
                />
                
                <Box className={styles.aboutText}>
                  <Typography variant="body1" paragraph>
                    Somos uma equipe comprometida com a transformação sustentável através da tecnologia.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Nosso sistema oferece soluções completas para gestão de materiais recicláveis,
                    ajudando empresas a otimizarem seus processos e aumentarem sua rentabilidade.
                  </Typography>
                  
                  <Button
                    component={Link}
                    to="/sobre"
                    variant="contained"
                    className={styles.primaryButton}
                    startIcon={<i className="fas fa-arrow-right"></i>}
                  >
                    Saiba mais
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Features Grid */}
            <Box className={styles.featuresSection}>
              <Typography variant="h2" className={styles.sectionTitle}>
                <i className="fas fa-star"></i> Destaques
              </Typography>
              
              <Box className={styles.featuresGrid}>
                <Box className={styles.featureCard}>
                  <i className="fas fa-chart-pie"></i>
                  <Typography variant="h5">Análise em Tempo Real</Typography>
                  <Typography>
                    Monitoramento contínuo do estoque e valores de materiais recicláveis.
                  </Typography>
                </Box>
                
                <Box className={styles.featureCard}>
                  <i className="fas fa-file-excel"></i>
                  <Typography variant="h5">Relatórios Automatizados</Typography>
                  <Typography>
                    Exportação de dados para Excel com um único clique.
                  </Typography>
                </Box>
                
                <Box className={styles.featureCard}>
                  <i className="fas fa-mobile-alt"></i>
                  <Typography variant="h5">Design Responsivo</Typography>
                  <Typography>
                    Acessível em qualquer dispositivo, a qualquer momento.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Seção do Chatbot */}
          <Box className={styles.chatbotSection}>
            <Box className={styles.chatbotHeader}>
              <i className="fas fa-robot" style={{color: '#A7C957', fontSize: '1.8rem'}}></i>
              <Typography variant="h4" className={styles.chatbotTitle}>
                Assistente Virtual
              </Typography>
            </Box>
            <Box className={styles.chatbotContainer}>
              <Chatbot />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" className={styles.footer}>
        <Container maxWidth="lg" className={styles.footerContent}>
          <Typography className={styles.copyright}>
            © 2025 Projeto Inova - SENAI MG. Todos os direitos reservados.
          </Typography>
          
          <Box component="nav" className={styles.footerNav}>
            <Link to="/equipe" className={styles.footerLink}>
              <i className="fas fa-users"></i> Nossa Equipe
            </Link>
            <Link to="/privacidade" className={styles.footerLink}>
              <i className="fas fa-lock"></i> Política de Privacidade
            </Link>
          </Box>

          <Box className={styles.socialIcons}>
            <a
              href="https://www.instagram.com/reci.technology?igsh=MWY5dXQxbWRrMzdjcQ=="
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};