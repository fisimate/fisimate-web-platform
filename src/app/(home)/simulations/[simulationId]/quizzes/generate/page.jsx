"use client"
import configs from "@/configs";
import useSocket from "@/hooks/useSocket";
import React, { useState } from "react";

export default function GenerateQuiz() {
  const [message, setMessage] = useState("");
  const [quizId, setQuizId] = useState("");

  const { response, emitEvent, error } = useSocket(configs.apiUrl);

  const handleGenerate = () => {
    emitEvent("generate", { text: message });
  };

  const handleSave = () => {
    if (response && response.questions) {
      emitEvent("save", { quizId, questions: response.questions });
    }
  };

  return <div>page</div>;
}
