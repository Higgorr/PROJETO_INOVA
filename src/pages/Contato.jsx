import { Link } from 'react-router-dom';
import styles from './Contato.module.css';
import backgroundImg from '../assets/soft-plaster-texture.jpg';

export const Contato = () => {
  return (
    <div className={styles.pageContainer}>
      <Link to="/PROJETO_INOVA" className={styles.botaoVoltar}>
        Voltar
      </Link>
      
      <div className={styles.container}>
        <h2>Entre em Contato</h2>
        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome:</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              required 
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="telefone">Telefone:</label>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone" 
              required 
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="tipo-material">Tipo de Material:</label>
            <select 
              id="tipo-material" 
              name="tipo-material" 
              required 
              className={styles.formSelect}
            >
              <option value="metal-ferroso">Metal Ferroso</option>
              <option value="metal-nao-ferroso">Metal Não Ferroso</option>
              <option value="plastico">Plástico</option>
              <option value="aparas">Aparas</option>
              <option value="material-eletronico">Material Eletrônico</option>
              <option value="outros">Outros</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="mensagem">
              Informe de forma precisa e clara o motivo de seu contato:
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              required
              className={styles.formTextarea}
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};