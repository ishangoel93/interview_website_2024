import React from 'react';
import { useInterview } from '../context/InterviewContext';
import { CheckCircle, AlertCircle, Download } from 'lucide-react';

export default function SummaryPage() {
  const { answers, resume } = useInterview();

  const getFeedback = (answer: string) => {
    // This is a simple example - in a real app, you'd want more sophisticated analysis
    return answer.length > 100 
      ? { type: 'strength', message: 'Detailed and well-articulated response' }
      : { type: 'improvement', message: 'Could benefit from more detailed examples' };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Interview Complete!
        </h1>
        <p className="text-xl text-gray-600">
          Here's your personalized feedback and analysis
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Response Analysis
        </h2>
        
        <div className="space-y-8">
          {Object.entries(answers).map(([questionIndex, answer], index) => {
            const feedback = getFeedback(answer);
            return (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Question {parseInt(questionIndex) + 1}
                </h3>
                <p className="text-gray-600 mb-4">{answer}</p>
                <div className={`flex items-start p-4 rounded-lg ${
                  feedback.type === 'strength' ? 'bg-green-50' : 'bg-yellow-50'
                }`}>
                  {feedback.type === 'strength' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${
                      feedback.type === 'strength' ? 'text-green-800' : 'text-yellow-800'
                    }`}>
                      {feedback.type === 'strength' ? 'Strength' : 'Area for Improvement'}
                    </p>
                    <p className={
                      feedback.type === 'strength' ? 'text-green-700' : 'text-yellow-700'
                    }>
                      {feedback.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {
            // In a real app, this would generate and download a PDF report
            alert('In a production environment, this would download a detailed PDF report');
          }}
        >
          <Download className="w-5 h-5 mr-2" />
          Download Full Report
        </button>
      </div>
    </div>
  );
}