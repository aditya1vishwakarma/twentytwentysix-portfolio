
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Works from './pages/Works';
import Blog from './pages/Blog';
import MoodBoardPage from './pages/MoodBoardPage';
import ProjectDetail from './pages/ProjectDetail';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Individual Blog Posts
import InvisibleHand from './pages/blog/InvisibleHand';
import GrowthDesign from './pages/blog/GrowthDesign';
import NatureGrid from './pages/blog/NatureGrid';

const { HashRouter, Routes, Route, useLocation } = ReactRouterDOM as any;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-charcoal font-sans selection:bg-moss selection:text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/moodboard" element={<MoodBoardPage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            
            {/* Component-based Blog Routes */}
            <Route path="/blog/invisible-hand" element={<InvisibleHand />} />
            <Route path="/blog/growth-as-design" element={<GrowthDesign />} />
            <Route path="/blog/natures-grid" element={<NatureGrid />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
