import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaApple } from 'react-icons/fa';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const iosProjects = [
    {
      title: 'NoteWorthy',
      description: 'An AI-powered notes taking app with Q&A generation capabilities, note summarization, and doubt clarification using AI.',
      technologies: ['Swift', 'SwiftUI', 'Firebase', 'Gemini Flash'],
      imageSrc: '/noteworthy.png',
      github: 'https://github.com/Mohamed-Fiyaz/NoteWorthy',
      appStore: '',
    },
    {
      title: 'SRM Calculator',
      description: 'An app that helps students of SRM University calculate their GPA without remembering total credit points—just input grades.',
      technologies: ['Swift', 'SwiftUI'],
      imageSrc: '/srmcalculator.png',
      github: 'https://github.com/Mohamed-Fiyaz/SRMCalculator',
      appStore: '',
    },
    {
      title: 'ThiruVazhi',
      description: 'An app which contains all the 1330 Thirukkurals, with fun features like "Thirukkural of the Day", "Generate Random Thirukkural". ',
      technologies: ['Swift', 'SwiftUI', 'SwiftData', 'Combine'],
      imageSrc: '/thiruvazhi.png',
      github: 'https://github.com/Mohamed-Fiyaz/ThiruVazhi',
      appStore: '',
    },
  ];

  const webProjects = [
    {
      title: 'Pokédex',
      description: 'A web app for browsing, searching, and viewing details of Pokémon using PokéAPI.',
      technologies: ['EJS', 'CSS', 'Node.js', 'Express', 'PokéAPI'],
      imageSrc: '/pokedex.png',
      github: 'https://github.com/Mohamed-Fiyaz/Pokedex',
      website: 'https://pokedex-3pss.onrender.com/',
    },
    {
      title: 'Bookart',
      description: 'An e-commerce site selling standalone books and novels.',
      technologies: ['EJS', 'CSS', 'Node.js', 'Express', 'Sequelize', 'MySQL'],
      imageSrc: '/bookart.png',
      github: 'https://github.com/Mohamed-Fiyaz/Bookart',
      website: '',
    },
    {
      title: 'WeatherWise',
      description: 'A web app to get real-time weather info for any location using OpenWeatherMap API.',
      technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'CSS', 'OpenWeatherMap API'],
      imageSrc: '/weatherwise.png',
      github: 'https://github.com/Mohamed-Fiyaz/WeatherWise',
      website: '',
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

          {/* iOS Applications */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 border-b-2 border-hero-yellow pb-2">iOS Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {iosProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-center">
                    <div className="w-[240px] overflow-hidden rounded-[40px] shadow-lg border border-gray-300">
                      <Image
                        src={project.imageSrc}
                        alt={`${project.title} screenshot`}
                        width={240}
                        height={520}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  <div className="bg-cream rounded-lg p-6 mt-4 min-h-[250px] flex flex-col">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-gray-600 flex-grow">{project.description}</p>

                    {/* Links Section */}
                    <div className="flex flex-wrap gap-4 mt-4 mb-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-800 hover:text-black">
                        <FaGithub size={20} />
                        <span>View on GitHub</span>
                      </a>
                      {project.appStore && (
                        <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-800 hover:text-black">
                          <FaApple size={20} />
                          <span>App Store</span>
                        </a>
                      )}
                    </div>

                    {/* Technologies Section */}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {webProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  <div className="flex flex-col">
                    <div className="overflow-hidden shadow-lg rounded-t-lg">
                      <Image
                        src={project.imageSrc}
                        alt={`${project.title} screenshot`}
                        width={400}
                        height={240}
                        className="w-full"
                      />
                    </div>

                    <div className="bg-cream p-6 min-h-[250px] flex flex-col rounded-b-lg">
                      <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                      <p className="text-gray-600 flex-grow">{project.description}</p>

                      {/* Links Section */}
                      <div className="flex flex-wrap gap-4 mt-4 mb-4">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-800 hover:text-black">
                          <FaGithub size={20} />
                          <span>View on GitHub</span>
                        </a>
                        {project.website && (
                          <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-800 hover:text-black">
                            <FaExternalLinkAlt size={20} />
                            <span>Website</span>
                          </a>
                        )}
                      </div>

                      {/* Technologies Section */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span key={tech} className="bg-hero-yellow bg-opacity-20 text-sm rounded px-2 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>

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
