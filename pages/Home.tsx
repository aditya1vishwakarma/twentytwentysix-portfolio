import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Sections/Hero';
import About from '../components/Sections/About';
import WorkCarousel from '../components/Sections/WorkCarousel';
import MoodBoard from '../components/Sections/MoodBoard';

const Home: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <WorkCarousel />
      <MoodBoard />
    </motion.main>
  );
};

export default Home;