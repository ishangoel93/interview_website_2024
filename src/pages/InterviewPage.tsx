import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { ArrowRight, Clock } from 'lucide-react';

const questions = [
  "Tell me about your most challenging project and how you overcame obstacles.",
  "What are your greatest professional strengths?",
  "Where do you see yourself in 5 years?",
  "Describe a situation where you had to work under pressure.",
  "What makes you interested in this position?"
];

export default function InterviewPage() {
  const navigate = useNavigate();
  const { answers, setAnswers, currentQuestion, setCurrentQuestion } = useInterview();
  const [currentAnswer, setCurrentAnswer] = useState(answers[currentQuestion] || '');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(time => time - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleNext = () => {
    setAnswers({ ...answers, [currentQuestion]: currentAnswer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer(answers[currentQuestion + 1] || '');
      setTimeLeft(180);
    } else {
      navigate('/summary');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="flex items-center text-sm font-medium text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {questions[currentQuestion]}
          </h2>
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Type your answer here..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}