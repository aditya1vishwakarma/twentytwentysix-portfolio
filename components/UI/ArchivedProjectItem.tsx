import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';

interface ArchivedProjectItemProps {
    project: Project;
}

const ArchivedProjectItem: React.FC<ArchivedProjectItemProps> = ({ project }) => {
    return (
        <Link to={project.path} className="group block w-full py-6 border-b border-charcoal/10 hover:bg-charcoal/5 transition-colors duration-300 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-1">
                        <h4 className="text-xl font-serif text-charcoal group-hover:text-black transition-colors">
                            {project.title}
                        </h4>
                        <span className="text-xs font-mono text-charcoal/40 uppercase tracking-widest">
                            {project.date}
                        </span>
                    </div>
                    <p className="text-sm text-charcoal/60 font-light italic max-w-2xl">
                        {project.description}
                    </p>
                </div>

                <div className="shrink-0">
                    <span className="text-moss font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        Read More →
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ArchivedProjectItem;
