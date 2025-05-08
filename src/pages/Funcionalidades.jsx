import { Link } from 'react-router-dom';
import styles from './Funcionalidades.module.css';
import funcImage from '../assets/func.webp';

export const Funcionalidades = () => {
  return (
    <div className={styles.container}>
      <Link to="/PROJETO_INOVA" className={styles.botaoVoltar}>
        ← Voltar para Home
      </Link>

      <section className={styles.contentSection}>
        <h2 className={styles.title}>Funcionalidades</h2>
        
        <ul className={styles.funcionalidadesList}>
          <li className={styles.funcionalidadeItem}>
            <span className={styles.funcionalidadeTitle}>Conscientização:</span>
            <span className={styles.funcionalidadeDesc}>
              Educação sobre a importância da reciclagem para o meio ambiente.
            </span>
          </li>
          
          <li className={styles.funcionalidadeItem}>
            <span className={styles.funcionalidadeTitle}>Armazenamento Adequado:</span>
            <span className={styles.funcionalidadeDesc}>
              Combate à degradação causada pelo armazenamento incorreto de recicláveis.
            </span>
          </li>
          
          <li className={styles.funcionalidadeItem}>
            <span className={styles.funcionalidadeTitle}>Redução de Poluição:</span>
            <span className={styles.funcionalidadeDesc}>
              Diminuição significativa dos níveis de poluição através de práticas sustentáveis.
            </span>
          </li>
        </ul>

        <div className={styles.imageContainer}>
          <img 
            src={funcImage} 
            alt="Ilustração de funcionalidades de reciclagem" 
            className={styles.funcImage}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};