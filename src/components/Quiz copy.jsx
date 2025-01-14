import React, { useState, useEffect } from "react";
import data from "../data/data.json"; // Import the updated JSON file

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Shuffle the questions and pick the first 10
    const shuffledQuestions = shuffleArray(data).slice(0, 20);
    setQuestions(shuffledQuestions); // Set the randomized questions
  }, []);

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  const handleAnswer = (selectedAnswer) => {
    // Check if the answer is correct
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // Move to the next question or finish the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz finished! Your score is ${score + 1}`);
    }
  };

  return (
    <div className="quiz-container bg-gray-100 min-h-screen flex justify-center items-center py-8">
      <div className="quiz-card bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        {/* Display the current question */}
        <div className="question mb-6">
          {questions.length > 0 && (
            <div key={questions[currentQuestion].id}>
              <h3 className="text-xl font-medium mb-4">{questions[currentQuestion].question}</h3>

              {/* Display options directly */}
              <div className="mt-4">
                {questions[currentQuestion].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className="block bg-gray-200 text-black px-4 py-2 rounded mt-2 w-full text-left hover:bg-gray-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Score */}
        <div className="score text-center mt-6">
          <p className="text-lg">
            Score: {score} / {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
