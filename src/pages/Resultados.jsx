import { Link } from 'react-router-dom';
import styles from './Resultados.module.css';
import impactoImage from '../assets/caicaras_reciclagem-1024x519.webp';
import {Button,} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'; // Importando o ícone de voltar

export const Resultados = () => {
  return (
    <div className={styles.container}>
     <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          className={styles.backButton}
        >
          Voltar
        </Button>

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