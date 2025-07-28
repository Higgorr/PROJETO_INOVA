import React, { useState, useRef, useEffect } from 'react';
import Groq from "groq-sdk";
import styles from './ChatBot.module.css'; // Importe seu CSS module

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Olá! Sou o Recibot, especialista em reciclagem. Posso te ajudar com:\n\n♻️ Tipos de materiais recicláveis\n🏭 Processos de reciclagem\n📊 Gestão de resíduos\n🌱 Dicas de sustentabilidade\n\nComo posso ajudar hoje?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Configuração do cliente Groq
 const groq = new Groq({
  apiKey: "sua_chave_aqui",
  dangerouslyAllowBrowser: true
});

  // Rolagem automática para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Adiciona mensagem do usuário
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Chama a API da Groq
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Você é o Recibot, um assistente especializado em reciclagem e sustentabilidade. Forneça informações precisas sobre: tipos de materiais recicláveis, processos de reciclagem, coleta seletiva, gestão de resíduos e práticas sustentáveis. Seja claro, conciso e educado. Se não souber a resposta, diga que não tem a informação ao invés de inventar."
          },
          ...newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 1024
      });

      // Adiciona resposta do assistente
      const botReply = response.choices[0]?.message?.content || "Desculpe, não consegui processar sua pergunta. Poderia reformular?";
      setMessages([...newMessages, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      setMessages([...newMessages, { 
        role: "assistant", 
        content: "Estou com dificuldades técnicas no momento. Por favor, tente novamente mais tarde."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader}>
        <h1 className={styles.chatbotTitle}>
          <span className={styles.emoji}>♻️</span> Recibot - Assistente de Reciclagem
        </h1>
      </div>
      
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`${styles.message} ${msg.role === "user" ? styles.userMessage : styles.botMessage}`}
          >
            <div className={styles.messageContent}>
              <strong>{msg.role === "user" ? "Você:" : "Recibot:"}</strong> {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className={styles.typingIndicator}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta sobre reciclagem..."
          className={styles.messageInput}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <button 
          onClick={handleSend} 
          disabled={loading || !input.trim()}
          className={styles.sendButton}
        >
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;