import { Link } from 'react-router-dom';
import styles from './Relatorio.module.css';
import backgroundImg from '../assets/soft-plaster-texture.jpg';

export const Relatorio = () => {
  return (
    <div className={styles.pageContainer}>
      <Link to="/PROJETO_INOVA" className={styles.botaoVoltar}>
        ← Voltar para Home
      </Link>

      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Relatório Recitech</h1>
        <p className={styles.description}>
          Para acessar o arquivo clique no botão abaixo.
        </p>
        <a
          href="https://drive.google.com/file/d/15UUD0mtw-V_nUfhVt9Gm4t_UapRgpTCf/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.downloadButton}
        >
          Acessar Relatório
        </a>
      </div>
    </div>
  );
};