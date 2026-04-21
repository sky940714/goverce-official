import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import GoEatPage from './pages/GoEatPage';

function App() {
  const location = useLocation();

  // 每次跳轉頁面自動捲動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/go-eat" element={<GoEatPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;