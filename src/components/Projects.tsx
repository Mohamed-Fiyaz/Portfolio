import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const iosProjects = [
    {
      title: 'Health Tracker App',
      description: 'A comprehensive health tracking application with meal planning, workout routines, and progress analytics.',
      technologies: ['Swift', 'UIKit', 'Core Data', 'HealthKit'],
      imageSrc: '/images/project1.png',
    },
    {
      title: 'Recipe Finder',
      description: 'An app that helps users discover new recipes based on ingredients they have on hand.',
      technologies: ['Swift', 'SwiftUI', 'Firebase'],
      imageSrc: '/images/project2.png',
    },
  ];

  const webProjects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured online shopping platform with product catalog, cart, and checkout functionality.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Stripe'],
      imageSrc: '/images/project3.png',
    },
    {
      title: 'Task Management Dashboard',
      description: 'A productivity app for teams to manage tasks, track progress, and collaborate efficiently.',
      technologies: ['TypeScript', 'React', 'Redux', 'Firebase'],
      imageSrc: '/images/project3.png',
    },
  ];

  return (
    <section id="projects" className="section bg-white">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">My Projects</h2>
          
          {/* iOS Apps */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 border-b-2 border-hero-yellow pb-2">iOS Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {iosProjects.map((project, index) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-cream rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    {/* Replace with actual iPhone mockup image */}
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">📱</div>
                      <p className="text-gray-500">iPhone mockup image will go here</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="bg-hero-yellow bg-opacity-20 text-sm rounded px-2 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Web Projects */}
          <div>
            <h3 className="text-2xl font-bold mb-8 border-b-2 border-hero-yellow pb-2">Web Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {webProjects.map((project, index) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className="bg-cream rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {/* Replace with actual website screenshot */}
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">🖥️</div>
                      <p className="text-gray-500">Website screenshot will go here</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="bg-hero-yellow bg-opacity-20 text-sm rounded px-2 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;