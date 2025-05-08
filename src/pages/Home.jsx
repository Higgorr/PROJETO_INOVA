import { Link } from 'react-router-dom';
import styles from './Home.module.css'; 
import bannerImg from '../assets/header.png';
import reciclagemImg from '../assets/tres-pessoas-carregando-caixas-com-materiais-para-reciclagem.webp';
import instagramIcon from '../assets/instagram.jpeg';
import githubIcon from '../assets/github-6980894_960_720.webp';
import linkedinIcon from '../assets/linkedin.webp';

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <img src={bannerImg} alt="Banner Projeto Inova" className={styles.banner} />
      
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to="/sobre" className={styles.navLink}>Sobre</Link>
            </li>
            <li>
              <Link to="/funcionalidades" className={styles.navLink}>Funcionalidades</Link>
            </li>
            <li>
              <Link to="/resultados" className={styles.navLink}>Resultados</Link>
            </li>
            <li>
              <Link to="/contato" className={styles.navLink}>Contato</Link>
            </li>
            <li>
              <Link to="/relatorio" className={styles.navLink}>Relatório</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>Quem somos</h2>
          <p className={styles.sectionText}>
            [Insira aqui uma descrição breve sobre o projeto e sua missão]
          </p>
          <img
            src={reciclagemImg}
            alt="Pessoas trabalhando com reciclagem"
            className={styles.aboutImage}
          />
          <br />
          <Link to="/sobre" className={styles.btn}>
            Saiba mais
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>© 2025 Projeto Inova - SENAI MG.</p>
          
          <nav>
            <ul className={styles.footerNav}>
              <li>
                <Link to="/equipe" className={styles.footerLink}>Equipe</Link>
              </li>
            </ul>
          </nav>
          
          <div className={styles.socialIcons}>
            <a
              href="https://www.instagram.com/reci.technology?igsh=MWY5dXQxbWRrMzdjcQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" className={styles.socialIcon} />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub" className={styles.socialIcon} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};