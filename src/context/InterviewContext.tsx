import React, { createContext, useContext, useState } from 'react';

interface InterviewContextType {
  resume: File | null;
  setResume: (file: File | null) => void;
  answers: Record<string, string>;
  setAnswers: (answers: Record<string, string>) => void;
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export function InterviewProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<File | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <InterviewContext.Provider
      value={{
        resume,
        setResume,
        answers,
        setAnswers,
        currentQuestion,
        setCurrentQuestion,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}