import { Link } from 'react-router-dom';
import styles from './Resultados.module.css';
import impactoImage from '../assets/caicaras_reciclagem-1024x519.webp';

export const Resultados = () => {
  return (
    <div className={styles.container}>
      <Link to="/PROJETO_INOVA" className={styles.botaoVoltar}>
        ← Voltar para Home
      </Link>

      <section className={styles.contentSection}>
        <h2 className={styles.title}>Resultados</h2>
        
        <div className={styles.textContent}>
          <p className={styles.paragraph}>
            Nosso projeto pode impactar diversas pessoas. A gestão correta dos
            resíduos recicláveis pode beneficiar a vida de todos, pois contribui
            para mitigar os efeitos da poluição e da degradação ambiental.
          </p>
          
          <div className={styles.imageWrapper}>
            <img
              src={impactoImage}
              alt="Pessoas realizando coleta seletiva de materiais recicláveis"
              className={styles.resultImage}
              loading="lazy"
            />
            <p className={styles.imageCaption}>Fonte: Clube dos Caiçaras</p>
          </div>
        </div>
      </section>
    </div>
  );
};