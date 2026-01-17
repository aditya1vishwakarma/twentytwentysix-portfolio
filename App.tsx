
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Works from './pages/Works';
import Blog from './pages/Blog';
import MoodBoardPage from './pages/MoodBoardPage';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Individual Blog Posts
import InvisibleHand from './pages/blog/InvisibleHand';
import GrowthDesign from './pages/blog/GrowthDesign';
import NatureGrid from './pages/blog/NatureGrid';

// Individual Project Pages
import AlpineRetreat from './pages/works/AlpineRetreat';
import BotanicalBrand from './pages/works/BotanicalBrand';

const { HashRouter, Routes, Route, useLocation } = ReactRouterDOM as any;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Small delay to ensure the Home component is mounted before scrolling
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);
  return null;
};

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isMoodBoard = location.pathname === '/moodboard';

  return (
    <div className="min-h-screen bg-background text-charcoal font-sans selection:bg-moss selection:text-white overflow-x-hidden">
      {!isMoodBoard && <Navbar />}
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
      {!isMoodBoard && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/moodboard" element={<MoodBoardPage />} />
          
          {/* Project Routes */}
          <Route path="/works/alpine-retreat" element={<AlpineRetreat />} />
          <Route path="/works/botanical-brand" element={<BotanicalBrand />} />
          
          {/* Blog Routes */}
          <Route path="/blog/invisible-hand" element={<InvisibleHand />} />
          <Route path="/blog/growth-as-design" element={<GrowthDesign />} />
          <Route path="/blog/natures-grid" element={<NatureGrid />} />
        </Routes>
      </LayoutWrapper>
    </HashRouter>
  );
};

export default App;
