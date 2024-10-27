import React from 'react';
import { useLocation } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const getProgressStep = () => {
    switch (location.pathname) {
      case '/':
        return 1;
      case '/interview':
        return 2;
      case '/summary':
        return 3;
      default:
        return 1;
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">InterviewPro</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= getProgressStep()
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-10 h-0.5 ${
                        step < getProgressStep() ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}