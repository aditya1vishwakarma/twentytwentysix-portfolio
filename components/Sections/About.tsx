
import React from 'react';
import { motion as motionComponent } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Fix: Cast imports to any to resolve environment-specific type errors
const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto border-t border-charcoal/10 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Intro - Removed sticky behavior to prevent overlapping */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            {/* Heading forced to one line using whitespace-nowrap and clamp for fluid sizing */}
            <h2 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] text-charcoal mb-6 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              About <span className="text-moss font-instrument italic font-normal">Aditya</span>
            </h2>
            <div className="w-16 h-[1px] bg-moss mb-8" />
            <p className="text-xl leading-relaxed text-charcoal/70 max-w-md">
              A multidisciplinary APM bridging functionality with aesthetics that impacts high-growth digital strategy. I grew up in Cupertino, CA and am Based in San Francisco, creating at the intersection of art and technology.
            </p>
          </motion.div>

          {/* Right Column: Grid of Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              {
                title: "My approach to the \"how\"",
                content: "Rooted in the invisible. I believe design should function effortlessly like a natural ecosystem—providing calm and clarity amidst the chaos of complex data and high-velocity growth.",
                span: "col-span-1"
              },
              {
                title: "My approach to the \"what\"",
                content: "Stripping away the noise to reveal the core intent. My methodology utilizes strict grid systems and typographic hierarchy to build products that are as performant as they are beautiful.",
                span: "col-span-1"
              },
              {
                title: "Mood Board",
                content: "", 
                isLink: true,
                path: "/moodboard",
                span: "sm:col-span-2"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`group p-8 border border-charcoal/10 hover:border-moss/30 rounded-squircle transition-all duration-500 flex flex-col justify-between ${item.span} ${item.isLink ? 'bg-moss text-white border-none' : 'bg-white/50 hover:bg-white shadow-sm'}`}
              >
                <div>
                  <h3 className={`text-xl font-serif mb-3 ${item.isLink ? 'text-white/90 text-2xl' : 'text-moss'}`}>
                    {item.title}
                  </h3>
                  {item.content && (
                    <p className="text-charcoal/60 leading-relaxed text-sm group-hover:text-charcoal transition-colors">
                      {item.content}
                    </p>
                  )}
                </div>
                {item.isLink && (
                  <Link 
                    to={item.path} 
                    className="mt-8 inline-flex items-center gap-3 text-white font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all"
                  >
                    What inspires me <ArrowUpRight size={16} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
