import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import './i18n';
import HomePage from './pages/HomePage';
import PitchEchoPage from './pages/PitchEchoPage';
import PitchPracticePage from './pages/PitchPracticePage';
import RecorderPage from './pages/RecorderPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pitch-echo" element={<PitchEchoPage />} />
        <Route path="/pitch-practice" element={<PitchPracticePage />} />
        <Route path="/recorder" element={<RecorderPage />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>,
);
