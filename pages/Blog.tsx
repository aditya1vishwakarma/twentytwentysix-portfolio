
import React from 'react';
import { motion as motionComponent } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { ArrowRight } from 'lucide-react';

const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

const Blog: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-[#F5F4F0]"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-24 text-center">
          <h1 className="font-serif text-6xl md:text-8xl text-charcoal mb-8">Writings</h1>
          <div className="w-12 h-1 bg-moss mx-auto mb-8" />
          <p className="text-xl text-charcoal/60 leading-relaxed italic font-serif">
            You can also find more of my writings at <a href="https://substack.com/@adityavishwakarma1" target="_blank" rel="noopener noreferrer" className="text-moss hover:text-moss-light underline decoration-moss/20 hover:decoration-moss transition-all">my substack.</a>
          </p>
        </header>

        <div className="flex flex-col gap-20">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group border-b border-charcoal/10 pb-16"
            >
              <Link to={post.path} className="block">
                <div className="flex flex-col md:flex-row gap-8 md:items-start">
                  <div className="md:w-1/4">
                    <span className="text-xs uppercase tracking-widest text-charcoal/40 font-semibold">{post.date}</span>
                    <div className="mt-2 text-[10px] uppercase tracking-widest text-moss font-bold">{post.category}</div>
                  </div>
                  <div className="md:w-3/4">
                    <h2 className="font-serif text-4xl md:text-5xl text-charcoal group-hover:text-moss transition-colors mb-6 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-lg text-charcoal/60 mb-8 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-moss font-semibold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                      Read full article <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
