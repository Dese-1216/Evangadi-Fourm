import React from "react";
import axios from "axios";
import QuestionForm from "../QuestionForm/QuestionForm";
import AskAi from "../AskAi/AskAi";

const QuestionPage = () => {
  const handleQuestionSubmit = async ({ title, description }) => {
    try {
     await axios.post("http://localhost:5000/api/ask-question", {
       title,
       description,
       tag:"React"
     });

      console.log("Question is submitted");
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <>
      <QuestionForm onSubmit={handleQuestionSubmit} />
      <AskAi />
    </>
  );
};

export default QuestionPage;
