import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styles from './Sobre.module.css';
import ambiente1 from '../assets/imagem-meio-ambiente.jpg';
import ambiente2 from '../assets/imagem-meio-ambiente2.jpg';
import ambiente3 from '../assets/imagem-meio-ambiente3.jpg';
import ambiente5 from '../assets/imagem-meio-ambiente5.jpg';
import reciclagemImg from '../assets/tres-pessoas-carregando-caixas-com-materiais-para-reciclagem.webp';
import '@fontsource/inter';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Sobre = () => {
  return (
    <Box className={styles.container}>
      <Button
        component={Link}
        to="/PROJETO_INOVA"
        startIcon={<ArrowBack />}
        className={styles.backButton}
      >
        Voltar para Home
      </Button>

      <Box component="main" className={styles.mainContent}>
        {/* Seção Hero */}
        <Box className={styles.heroSection}>
          <Typography variant="h2" className={styles.heroTitle}>
            Conheça a Recitech
          </Typography>
          <Typography variant="h5" className={styles.heroSubtitle}>
            Transformando resíduos em oportunidades sustentáveis
          </Typography>
        </Box>

        {/* Conteúdo Principal */}
        <Box className={styles.contentSection}>
          <Box className={styles.section}>
            <Typography variant="h3" className={styles.sectionTitle}>
              <i className="fas fa-leaf"></i> Quem somos?
            </Typography>
            <Typography variant="body1" className={styles.sectionText}>
              A empresa busca implementar práticas que assegurem o controle adequado
              dos materiais, evitando desperdícios e garantindo que o processo de
              gestão seja o mais sustentável possível. Além disso, a Recitech se
              compromete a evitar qualquer prática que possa resultar em degradação
              ambiental durante suas operações.
            </Typography>
            <Box className={styles.imageWrapper}>
              <img
                src={ambiente1}
                alt="Equipe da Recitech trabalhando com materiais recicláveis"
                className={styles.contentImage}
                loading="lazy"
              />
            </Box>
          </Box>

          <Box className={styles.section}>
            <Typography variant="h3" className={styles.sectionTitle}>
              <i className="fas fa-graduation-cap"></i> Conscientização e Educação
            </Typography>
            <Typography variant="body1" className={styles.sectionText}>
              Sabemos que a reciclagem começa com o conhecimento. Por isso, nosso
              objetivo é trazer informações claras e acessíveis sobre como reciclar
              corretamente, os impactos dos resíduos no meio ambiente e a importância
              de reduzir, reutilizar e reciclar.
            </Typography>
            <Box className={styles.imageWrapper}>
              <img
                src={ambiente3}
                alt="Workshop de educação ambiental realizado pela Recitech"
                className={styles.contentImage}
                loading="lazy"
              />
            </Box>
          </Box>

          <Box className={styles.section}>
            <Typography variant="h3" className={styles.sectionTitle}>
              <i className="fas fa-lightbulb"></i> Dicas Práticas para o Dia a Dia
            </Typography>
            <Typography variant="body1" className={styles.sectionText}>
              Aqui, você encontrará dicas simples e eficazes para incorporar a
              reciclagem na sua rotina. Desde como separar os resíduos em casa até
              ideias criativas para reutilizar materiais, estamos comprometidos em
              mostrar que a sustentabilidade pode ser prática, econômica e até
              divertida!
            </Typography>
            <Box className={styles.imageWrapper}>
              <img
                src={ambiente2}
                alt="Exemplos de separação de resíduos para reciclagem"
                className={styles.contentImage}
                loading="lazy"
              />
            </Box>
          </Box>

          <Box className={styles.section}>
            <Typography variant="h3" className={styles.sectionTitle}>
              <i className="fas fa-handshake"></i> Parcerias e Incentivos
            </Typography>
            <Typography variant="body1" className={styles.sectionText}>
              Trabalhamos em parceria com empresas, organizações e iniciativas locais
              que compartilham da nossa visão. Através dessas colaborações, oferecemos
              programas de recompensa, descontos e benefícios para quem pratica a
              reciclagem.
            </Typography>
            <Box className={styles.imageWrapper}>
              <img
                src={ambiente5}
                alt="Parcerias da Recitech com outras organizações"
                className={styles.contentImage}
                loading="lazy"
              />
            </Box>
          </Box>

          <Box className={styles.contactSection}>
            <Typography variant="h3" className={styles.sectionTitle}>
              <i className="fas fa-envelope"></i> Entre em contato
            </Typography>
            <Typography variant="body1" className={styles.sectionText}>
              Seja bem-vindo à nossa empresa! Aqui, você não só aprende, mas também
              faz parte de uma rede de pessoas que estão transformando o mundo, um
              gesto de cada vez.
            </Typography>
            <Button
              variant="contained"
              className={styles.contactButton}
              component={Link}
              to="/contato"
            >
              Fale Conosco
            </Button>
          </Box>
        </Box>

        {/* Seção Metodologia */}
        <Box className={styles.methodologySection}>
          <Typography variant="h3" className={styles.sectionTitle}>
            <i className="fas fa-flask"></i> Nossa Metodologia
          </Typography>
          <Typography variant="body1" className={styles.sectionText}>
            A metodologia utilizada teve como base uma abordagem estruturada e
            organizada com o objetivo de assegurar a realização do projeto.
          </Typography>
          <Box className={styles.imageWrapper}>
            <img
              src={reciclagemImg}
              alt="Pessoas transportando materiais para reciclagem"
              className={styles.methodologyImage}
              loading="lazy"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};