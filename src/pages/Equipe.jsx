import { Link } from 'react-router-dom';
import isaImage from '../assets/Isa.jpeg';
import mzzImage from '../assets/mzz.png';
import geImage from '../assets/ge.png';
import hggImage from '../assets/hgg.png';
import styles from './Equipe.module.css';

export const Equipe = () => {
  return (
    <div className={styles.equipeContainer}>
      {/* Botão Voltar */}
      <Link to="/PROJETO_INOVA" className={styles.botaoVoltar}>
        ← Voltar para Home
      </Link>

      {/* Seção da Equipe */}
      <section className={styles.equipeSection}>
        <h2 className={styles.equipeTitulo}>Nossa Equipe</h2>
        
        {/* Membro 1 */}
        <div className={styles.membroCard}>
          <div className={styles.fotoContainer}>
            <img 
              src={isaImage} 
              alt="Isabella" 
              className={styles.membroFoto}
              loading="lazy"
            />
          </div>
          <div className={styles.membroInfo}>
            <h3>Isabella</h3>
            <p className={styles.membroFuncao}>Coordenadora de Projeto</p>
            <p className={styles.membroDescricao}>
              Responsável pela elaboração e estrutura do projeto, garantindo que todas as peças se encaixem perfeitamente.
            </p>
          </div>
        </div>

        {/* Membro 2 */}
        <div className={styles.membroCard}>
          <div className={styles.fotoContainer}>
            <img 
              src={mzzImage} 
              alt="Maria Clara" 
              className={styles.membroFoto}
              loading="lazy"
            />
          </div>
          <div className={styles.membroInfo}>
            <h3>Maria Clara</h3>
            <p className={styles.membroFuncao}>Redatora Chefe</p>
            <p className={styles.membroDescricao}>
              Responsável pela parte escrita e idealização do projeto, transformando ideias em palavras impactantes.
            </p>
          </div>
        </div>

        {/* Membro 3 */}
        <div className={styles.membroCard}>
          <div className={styles.fotoContainer}>
            <img 
              src={geImage} 
              alt="Geovanna" 
              className={styles.membroFoto}
              loading="lazy"
            />
          </div>
          <div className={styles.membroInfo}>
            <h3>Geovanna</h3>
            <p className={styles.membroFuncao}>Pesquisadora Principal</p>
            <p className={styles.membroDescricao}>
              Responsável pela pesquisa e estudo do projeto, garantindo embasamento científico e relevância.
            </p>
          </div>
        </div>

        {/* Membro 4 */}
        <div className={styles.membroCard}>
          <div className={styles.fotoContainer}>
            <img 
              src={hggImage} 
              alt="Higgor" 
              className={styles.membroFoto}
              loading="lazy"
            />
          </div>
          <div className={styles.membroInfo}>
            <h3>Higgor</h3>
            <p className={styles.membroFuncao}>Desenvolvedor Web</p>
            <p className={styles.membroDescricao}>
              Responsável pela criação do website, transformando conceitos em experiências digitais.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};