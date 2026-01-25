import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import OptimizedImage from '../UI/OptimizedImage';
import { Project } from '../../types';

interface ProjectTileProps {
    project: Project;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project }) => {
    return (
        <Link to={project.path} className="group block relative w-full">
            <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="w-full bg-white shadow-sm hover:shadow-xl transition-all duration-200"
            >
                {/* Image Container - No Radius */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <OptimizedImage
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700"
                        aspectRatio="aspect-auto"
                    />
                    {/* Subtle overlay on hover if needed, but user asked for minimal animations */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col items-start gap-4">
                    <div>
                        <span className="text-xs font-mono text-charcoal/50 uppercase tracking-widest mb-2 block">
                            {project.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif text-charcoal">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-charcoal/70 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    <span className="text-moss font-bold text-xs uppercase tracking-widest mt-2 group-hover:translate-x-2 transition-transform duration-300">
                        Read Case Study →
                    </span>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProjectTile;
