import { Link } from 'react-router-dom';
import styles from './Sobre.module.css';
import ambiente1 from '../assets/imagem-meio-ambiente.jpg';
import ambiente2 from '../assets/imagem-meio-ambiente2.jpg';
import ambiente3 from '../assets/imagem-meio-ambiente3.jpg';
import ambiente5 from '../assets/imagem-meio-ambiente5.jpg';
import reciclagemImg from '../assets/tres-pessoas-carregando-caixas-com-materiais-para-reciclagem.webp';

export const Sobre = () => {
  return (
    <div className={styles.container}>
      <Link to="/PROJETO_INOVA" className={styles.botaoVoltar}>
        ← Voltar para Home
      </Link>

      <main className={styles.mainContent}>
        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Quem somos?</h2>
          <p className={styles.sectionText}>
            A empresa busca implementar práticas que assegurem o controle adequado
            dos materiais, evitando desperdícios e garantindo que o processo de
            gestão seja o mais sustentável possível. Além disso, a Recitech se
            compromete a evitar qualquer prática que possa resultar em degradação
            ambiental durante suas operações. O controle rigoroso dos materiais
            recicláveis é essencial para garantir que, em nenhum momento, os
            resíduos se tornem uma ameaça ao meio ambiente.
          </p>
          <div className={styles.imageWrapper}>
            <img
              src={ambiente1}
              alt="Equipe da Recitech trabalhando com materiais recicláveis"
              className={styles.contentImage}
              loading="lazy"
            />
          </div>

          <h2 className={styles.sectionTitle}>Conscientização e Educação</h2>
          <p className={styles.sectionText}>
            Sabemos que a reciclagem começa com o conhecimento. Por isso, nosso
            objetivo é trazer informações claras e acessíveis sobre como reciclar
            corretamente, os impactos dos resíduos no meio ambiente e a importância
            de reduzir, reutilizar e reciclar. Queremos que todos entendam que cada
            garrafa, papel ou embalagem descartada de forma consciente é um passo em
            direção a um mundo mais limpo.
          </p>
          <div className={styles.imageWrapper}>
            <img
              src={ambiente3}
              alt="Workshop de educação ambiental realizado pela Recitech"
              className={styles.contentImage}
              loading="lazy"
            />
          </div>

          <h2 className={styles.sectionTitle}>Dicas Práticas para o Dia a Dia</h2>
          <p className={styles.sectionText}>
            Aqui, você encontrará dicas simples e eficazes para incorporar a
            reciclagem na sua rotina. Desde como separar os resíduos em casa até
            ideias criativas para reutilizar materiais, estamos comprometidos em
            mostrar que a sustentabilidade pode ser prática, econômica e até
            divertida!
          </p>
          <div className={styles.imageWrapper}>
            <img
              src={ambiente2}
              alt="Exemplos de separação de resíduos para reciclagem"
              className={styles.contentImage}
              loading="lazy"
            />
          </div>

          <h2 className={styles.sectionTitle}>Parcerias e Incentivos</h2>
          <p className={styles.sectionText}>
            Trabalhamos em parceria com empresas, organizações e iniciativas locais
            que compartilham da nossa visão. Através dessas colaborações, oferecemos
            programas de recompensa, descontos e benefícios para quem pratica a
            reciclagem. Afinal, cuidar do planeta também pode trazer vantagens para
            você!
          </p>
          <div className={styles.imageWrapper}>
            <img
              src={ambiente5}
              alt="Parcerias da Recitech com outras organizações"
              className={styles.contentImage}
              loading="lazy"
            />
          </div>

          <h2 className={styles.sectionTitle}>Entre em contato</h2>
          <p className={styles.sectionText}>
            Seja bem-vindo à nossa empresa! Aqui, você não só aprende, mas também
            faz parte de uma rede de pessoas que estão transformando o mundo, um
            gesto de cada vez. Explore nosso site, participe das nossas iniciativas
            e vamos juntos construir um futuro mais sustentável.
          </p>
        </section>

        <section className={styles.methodologySection}>
          <h3 className={styles.subsectionTitle}>Metodologia</h3>
          <p className={styles.sectionText}>
            A metodologia utilizada teve como base uma abordagem estruturada e
            organizada com o objetivo de assegurar a realização do projeto.
          </p>
          <div className={styles.imageWrapper}>
            <img
              src={reciclagemImg}
              alt="Pessoas transportando materiais para reciclagem"
              className={styles.contentImage}
              loading="lazy"
            />
          </div>
        </section>
      </main>
    </div>
  );
};