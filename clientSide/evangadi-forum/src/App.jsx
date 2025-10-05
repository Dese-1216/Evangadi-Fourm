import React from "react";
import { Routes, Route } from "react-router-dom";
import QuestionPage from "./components/QuestionPage/QuestionPage"; // Adjust path if needed

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<QuestionPage />} />
    </Routes>
  );
};

export default App;
