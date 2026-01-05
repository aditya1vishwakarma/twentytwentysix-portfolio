import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto border-t border-charcoal/10 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:sticky md:top-32 h-fit"
          >
            <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">About Me</h2>
            <div className="w-16 h-1 bg-moss mb-8" />
            <p className="text-xl leading-relaxed text-charcoal/70">
              I am a multidisciplinary product manager with a deep appreciation for design. Especially bridging the natural world and technology. 
              My work bridges the gap between organic beauty and digital precision, adhering to the principles of Swiss design—clean, legible, and objective.
            </p>
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col gap-12 justify-center">
            {[
              {
                title: "Philosophy",
                content: "I believe design should be invisible until it needs to be seen. Like nature, it should function effortlessly and provide a sense of calm amidst chaos."
              },
              {
                title: "Methodology",
                content: "My process is rooted in grid systems and typographic hierarchy. I strip away the non-essential to reveal the core message, ensuring every pixel serves a purpose."
              },
              {
                title: "Toolbox",
                content: "From TypeScript and React to Cinema 4D and Figma, I utilize a modern tech stack to bring sophisticated visions to life with performance and accessibility in mind."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group p-8 border border-charcoal/10 hover:border-moss/30 rounded-squircle transition-colors duration-300 bg-white/50 hover:bg-white"
              >
                <h3 className="text-2xl font-serif text-moss mb-3">{item.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;