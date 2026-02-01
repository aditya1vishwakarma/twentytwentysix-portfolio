
import React from 'react';
import { motion as motionComponent } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Fix: Cast imports to any to resolve environment-specific type errors
const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#F5F4F0]">
      <div className="max-w-7xl mx-auto">

        {/* Header / Intro Section */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] text-charcoal mb-8 leading-none tracking-tight">
              About <span className="text-[#3F6D0D] font-instrument italic font-normal">Aditya</span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-charcoal/80 max-w-2xl font-sans">
              A multidisciplinary APM bridging functionality with aesthetics that impacts high-growth digital strategy. Based in San Francisco, creating at the intersection of art and technology.
            </p>
          </motion.div>
        </div>

        {/* Structural Keyline */}
        <div className="w-full h-[1px] bg-charcoal/10 mb-12" />

        {/* Unboxed 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-stretch">
          {[
            {
              title: "My approach to the \"how\"",
              content: "Rooted in the invisible. I believe design should function effortlessly like a natural ecosystem—providing calm and clarity amidst the chaos of complex data and high-velocity growth.",
              isInteractive: false
            },
            {
              title: "My approach to the \"what\"",
              content: "Stripping away the noise to reveal the core intent. My methodology utilizes strict grid systems and typographic hierarchy to build products that are as performant as they are beautiful.",
              isInteractive: false
            },
            {
              title: "Mood Board",
              content: "A collection of textures, typography, and interfaces that inspire my work and shape my design philosophy.",
              isInteractive: true,
              path: "/moodboard"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
              className="h-full"
            >
              {/* Conditional Wrapper: Link vs Div */}
              {item.isInteractive ? (
                <Link to={item.path} className="block group h-full">
                  <div className="relative p-8 rounded-3xl transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:bg-[#3F6D0D]/5 h-full flex flex-col justify-between">
                    {/* Content Container */}
                    <div className="relative z-10">
                      <h3 className="font-serif text-2xl text-[#3F6D0D] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-charcoal/60 text-base leading-loose font-sans mb-8">
                        {item.content}
                      </p>
                    </div>

                    {/* Animated Arrow Glyph - Bottom Right of the CARD */}
                    <div className="flex justify-end items-end p-2 md:p-0">
                      <span className="text-[#3F6D0D] transform transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                        <ArrowRight size={24} strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                // Static Column - Using EXACT SAME padding structure for Geometric Sanity
                <div className="p-8 border border-transparent h-full">
                  <h3 className="font-serif text-2xl text-charcoal mb-4">
                    {item.title}
                  </h3>
                  <p className="text-charcoal/60 text-base leading-loose font-sans">
                    {item.content}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
