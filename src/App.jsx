import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar'; // 確保路徑正確
import HomePage from './pages/HomePage';
import GoEatPage from './pages/GoEatPage';
import GoCorePage from './pages/GoCorePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';
import GoSoulPage from './pages/GoSoulPage';

function App() {
  const location = useLocation();

  // 每次跳轉頁面自動捲動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {/* 1. Navbar 放在這裡，確保它在所有頁面頂端，且不參與頁面切換動畫 */}
      <Navbar />

      {/* 2. 頁面切換動畫容器 */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/go-eat" element={<GoEatPage />} />
          <Route path="/go-core" element={<GoCorePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/go-soul" element={<GoSoulPage />} /> 
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;