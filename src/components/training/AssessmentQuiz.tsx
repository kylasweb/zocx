import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface AssessmentQuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
  passingScore: number;
}

const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({
  questions,
  onComplete,
  passingScore,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const score = (correctAnswers / questions.length) * 100;
    setShowResults(true);
    onComplete(score);
  };

  if (showResults) {
    const score = (answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0) / questions.length) * 100;

    const passed = score >= passingScore;

    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg ${
          passed ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex items-center">
            {passed ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
            <div className="ml-4">
              <h3 className={`text-lg font-medium ${
                passed ? 'text-green-800' : 'text-red-800'
              }`}>
                {passed ? 'Assessment Passed!' : 'Assessment Failed'}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Your score: {score.toFixed(1)}% (Required: {passingScore}%)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {answers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Question {index + 1}: {question.text}
                  </p>
                  <div className="mt-2 space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-50 border border-green-200'
                            : optionIndex === answers[index]
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        <p className="text-sm text-gray-900">{option}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!passed && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers([]);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Retry Assessment
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <div className="text-sm text-gray-500">
            Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-900">{questions[currentQuestion].text}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm text-gray-900">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-blue-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Important Note</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>You must answer all questions to complete the assessment</li>
                <li>A score of {passingScore}% or higher is required to pass</li>
                <li>You can review your answers before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuiz;