import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import PitchEchoPage from './pages/PitchEchoPage';
import PitchPracticePage from './pages/PitchPracticePage';
import { cn } from './lib/cn';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className={cn(
      "mx-auto p-8 w-fit my-16",
      "flex flex-col items-center gap-8"
    )}>
      <h1 className="text-4xl font-bold">Learn Music</h1>
      <p className="text-gray-600">音乐学习工具集</p>
      <div className="flex gap-6">
        <Link
          to="/pitch-echo"
          className={cn(
            "p-6 shadow rounded-lg",
            "hover:shadow-lg transition-shadow",
            "flex flex-col items-center gap-2 w-48"
          )}
        >
          <span className="text-xl font-bold">Pitch Echo</span>
          <span className="text-sm text-gray-500">麦克风音高检测</span>
        </Link>
        <Link
          to="/pitch-practice"
          className={cn(
            "p-6 shadow rounded-lg",
            "hover:shadow-lg transition-shadow",
            "flex flex-col items-center gap-2 w-48"
          )}
        >
          <span className="text-xl font-bold">Pitch Practice</span>
          <span className="text-sm text-gray-500">音感训练</span>
        </Link>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pitch-echo" element={<PitchEchoPage />} />
        <Route path="/pitch-practice" element={<PitchPracticePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
