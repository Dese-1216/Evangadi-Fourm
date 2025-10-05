import React, { useState } from "react";
import styles from "./QuestionForm.module.css";

const QuestionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      <div className={styles.paragraph}>
        <h3
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          Steps to Write A Good Question
        </h3>
        <ul
          style={{ listStyleType: "decimal", paddingLeft: "20px", margin: 0 }}
        >
          <li style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
            Summarize your problems in a one-line title.
          </li>
          <li style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
            Describe your problem in more detail.
          </li>
          <li style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
            Describe what you tried and what you expected to happen.
          </li>
          <li style={{ fontSize: "14px", color: "#555" }}>
            Review your question and post it here.
          </li>
        </ul>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Post Your Question</h2>
        <input
          type="text"
          placeholder="Enter question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />
        <textarea
          placeholder="Enter question description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          required
        />
        <button type="submit" className={styles.button}>
          Post Question
        </button>
      </form>
    </>
  );
};

export default QuestionForm;
