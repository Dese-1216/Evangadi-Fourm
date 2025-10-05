import React, { useState } from "react";
import styles from "./AskAi.module.css"; // Optional for styling

const AskAi = () => {
  const [prompt, setPrompt] = useState("");

  const handleAsk = () => {
    console.log("AI Prompt:", prompt);
    // TODO: Send prompt to AI backend and display response
    setPrompt("");
  };

  return (
    <div className={styles.askAiContainer}>
      <h3>Need help? You can Ask AI</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask AI for help with your question..."
        className={styles.textarea}
      />
      <button onClick={handleAsk} className={styles.button}>
        Ask AI
      </button>
    </div>
  );
};

export default AskAi;
