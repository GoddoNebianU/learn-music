import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import PitchEchoPage from './pages/PitchEchoPage';
import PitchPracticePage from './pages/PitchPracticePage';
import { cn } from './lib/cn';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="flex h-14 items-center border-b border-gray-200 px-4">
        <Link to="/" className="text-sm font-semibold text-gray-800 hover:text-gray-600 transition-colors">Learn Music</Link>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">音乐学习工具集</h1>
          </div>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to="/pitch-echo"
              className={cn(
                "rounded-md border border-gray-200 p-6",
                "hover:bg-gray-50 transition-colors",
                "flex flex-col gap-1"
              )}
            >
              <span className="text-lg font-bold text-gray-800">Pitch Echo</span>
              <span className="text-sm text-gray-500">麦克风音高检测</span>
            </Link>
            <Link
              to="/pitch-practice"
              className={cn(
                "rounded-md border border-gray-200 p-6",
                "hover:bg-gray-50 transition-colors",
                "flex flex-col gap-1"
              )}
            >
              <span className="text-lg font-bold text-gray-800">Pitch Practice</span>
              <span className="text-sm text-gray-500">音感训练</span>
            </Link>
          </div>
        </div>
      </main>
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
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>,
);
