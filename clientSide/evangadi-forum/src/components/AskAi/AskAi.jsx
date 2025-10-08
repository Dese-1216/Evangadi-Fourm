import React, { useState } from "react";
import styles from "./AskAi.module.css";
import axios from "axios";

const AskAi = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (prompt === "") {
      return console.error("please type a question");
    }
    setLoading(true);
    // TODO: Send prompt to AI backend and display response

    try {
      const res = await axios.post("http://localhost:5000/api/ask-ai", {
        prompt,
      });
      setResponse(res.data.reply);
      setPrompt("");
    } catch (error) {
      console.log("Error asking AI", error);
      setResponse(
        "We could not find the response. You can try again later, or add open ai credit"
      );
    }
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
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {/* the response */}

      {response && (
        <div className={styles.responseBox}>
          <strong> AI Response: </strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskAi;
