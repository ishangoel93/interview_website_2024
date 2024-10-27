import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import InterviewPage from './pages/InterviewPage';
import SummaryPage from './pages/SummaryPage';
import { InterviewProvider } from './context/InterviewContext';

function App() {
  return (
    <BrowserRouter>
      <InterviewProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </div>
      </InterviewProvider>
    </BrowserRouter>
  );
}

export default App;