import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import ProjectTile from '../components/UI/ProjectTile';
import ArchivedProjectItem from '../components/UI/ArchivedProjectItem';

const Works: React.FC = () => {
  // For demonstration, we'll use all projects as "Selected" 
  // and a subset as "Archived" to populate both sections.
  // In a real app, you'd likely have a property like 'isArchived' on the project type.
  const selectedProjects = PROJECTS;
  const archivedProjects = PROJECTS.slice(0, 3); // Just grabbing some to show the list

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-48 px-6 md:px-12 min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto">

        {/* SECTION 1: SELECTED WORKS */}
        <section className="mb-48">
          <header className="mb-24">
            <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-4">
              Selected Works
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {selectedProjects.map((project, index) => (
              <motion.div
                key={`selected-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <ProjectTile project={project} />
              </motion.div>
            ))}
          </div>
        </section>


        {/* SECTION 2: ARCHIVED PROJECTS */}
        <section>
          <header className="mb-6 border-b border-charcoal/10 pb-4">
            <h2 className="font-serif text-3xl text-charcoal/40">
              Archived Projects
            </h2>
          </header>

          <div className="flex flex-col">
            {archivedProjects.map((project, index) => (
              <motion.div
                key={`archived-${project.id}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <ArchivedProjectItem project={project} />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default Works;
