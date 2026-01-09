
import React from 'react';
import { motion as motionComponent } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { BLOG_POSTS } from '../../constants';
import { ArrowRight } from 'lucide-react';

const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

const BlogPreview: React.FC = () => {
  return (
    <section className="py-24 bg-[#F5F4F0]">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="font-serif text-5xl text-charcoal">Writings</h2>
            <p className="mt-4 text-charcoal/60 max-w-md">Thoughts on design, product growth, and the intersection of nature and technology.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-moss hover:gap-4 transition-all font-medium uppercase tracking-widest text-sm">
            View All Posts <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {BLOG_POSTS.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <Link to={post.path}>
                <div className="mb-6 overflow-hidden rounded-squircle aspect-[4/3] bg-white border border-charcoal/5 group-hover:shadow-xl group-hover:shadow-moss/5 transition-all duration-500 flex items-center justify-center p-8">
                   <div className="text-center">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-moss/40 font-bold block mb-2">{post.category}</span>
                      <h3 className="font-serif text-2xl text-charcoal px-4">{post.title}</h3>
                   </div>
                </div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-charcoal/40 mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-charcoal/20 rounded-full" />
                  <span>{post.readTime}</span>
                </div>
                <p className="text-charcoal/60 line-clamp-2 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-moss text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
