import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaApple, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';

const Projects = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px',
  });

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '-200px 0px 0px 0px',
  });

  const iosScrollRef = useRef<HTMLDivElement>(null);
  const webScrollRef = useRef<HTMLDivElement>(null);
  const [iosCurrentIndex, setIosCurrentIndex] = useState(0);
  const [webCurrentIndex, setWebCurrentIndex] = useState(0);
  const [iosIsFirstHalf, setIosIsFirstHalf] = useState(true);
  const [iosIsSecondHalf, setIosIsSecondHalf] = useState(false);
  const [webIsFirstHalf, setWebIsFirstHalf] = useState(true);
  const [webIsSecondHalf, setWebIsSecondHalf] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const iosProjects = [
    {
      title: 'What\'s My GPA?',
      description: 'An app that helps students of SRM IST calculate their GPA without remembering total credit points, just input grades.',
      technologies: ['Swift', 'SwiftUI'],
      imageSrc: '/whatsmygpa.png',
      github: '',
      appStore: 'https://apps.apple.com/us/app/whats-my-gpa/id6747209109',
      landingPage: 'https://whatsmygpa.vercel.app',
    },
    {
      title: 'BreakLoop',
      description: 'A privacy-first iOS OCD management app that helps users track habits, log triggers, and record reflections using voice or text. Features AI-powered insights using Apple Foundation Models for on-device analysis.',
      technologies: ['Swift', 'SwiftUI', 'SwiftData', 'CloudKit', 'Foundation Models', 'Speech', 'AVFoundation'],
      imageSrc: '/breakloop.png',
      github: '',
      appStore: '',
      landingPage: 'https://breakloop-ios.vercel.app',
    },
    {
      title: 'NoteWorthy',
      description: 'An AI-powered notes taking app with Q&A generation capabilities, note summarization, and doubt clarification using AI.',
      technologies: ['Swift', 'SwiftUI', 'AVFoundation', 'Firebase', 'Gemini Flash'],
      imageSrc: '/noteworthy.png',
      github: 'https://github.com/Mohamed-Fiyaz/NoteWorthy',
      appStore: '',
      landingPage: '',
    },
    {
      title: 'ThiruVazhi',
      description: 'An app which contains all the 1330 Thirukkurals, with fun features like "Thirukkural of the Day", "Generate Random Thirukkural". ',
      technologies: ['Swift', 'SwiftUI', 'SwiftData', 'Combine'],
      imageSrc: '/thiruvazhi.png',
      github: 'https://github.com/Mohamed-Fiyaz/ThiruVazhi',
      appStore: '',
      landingPage: '',
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

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to specific index (for mobile one-at-a-time scrolling)
  const scrollToIndex = (ref: React.RefObject<HTMLDivElement>, index: number, setCurrentIndex: (val: number) => void) => {
    if (ref.current) {
      const container = ref.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = isMobile ? 24 : 32; // 6 (sm:gap-8) in pixels
      const scrollPosition = index * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      setCurrentIndex(index);
    }
  };

  // Handle scroll left/right
  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
    currentIndex: number,
    setCurrentIndex: (val: number) => void,
    totalProjects: number
  ) => {
    if (isMobile) {
      // Mobile: one project at a time
      const newIndex = direction === 'left'
        ? Math.max(0, currentIndex - 1)
        : Math.min(totalProjects - 1, currentIndex + 1);
      scrollToIndex(ref, newIndex, setCurrentIndex);
    } else {
      // Desktop: scroll by page (show ~3 projects)
      const projectsPerPage = 3;
      const newIndex = direction === 'left'
        ? Math.max(0, currentIndex - projectsPerPage)
        : Math.min(totalProjects - projectsPerPage, currentIndex + projectsPerPage);
      scrollToIndex(ref, newIndex, setCurrentIndex);
    }
  };

  // Update current index and half detection on manual scroll
  const handleManualScroll = (
    ref: React.RefObject<HTMLDivElement>,
    setCurrentIndex: (val: number) => void,
    setIsFirstHalf: (val: boolean) => void,
    setIsSecondHalf: (val: boolean) => void
  ) => {
    if (ref.current && ref.current.children.length > 0) {
      const container = ref.current;
      const scrollLeft = container.scrollLeft;

      // Calculate index based on scroll position
      const firstChild = container.children[0] as HTMLElement;
      const cardWidth = firstChild.offsetWidth;
      const gap = isMobile ? 24 : 32;

      // Calculate which project is most visible
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(index);

      // Calculate which half we're in for pill indicators (desktop only)
      if (!isMobile) {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const midpoint = scrollWidth / 2 - clientWidth / 2;

        const isFirst = scrollLeft < midpoint;
        const isSecond = scrollLeft >= midpoint;

        setIsFirstHalf(isFirst);
        setIsSecondHalf(isSecond);
      }
    }
  };

  return (
    <section id="projects" className="section bg-white py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Title with separate ref */}
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-center"
        >
          My Projects
        </motion.h2>

        {/* Projects content with separate ref */}
        <motion.div
          ref={projectsRef}
          initial={{ opacity: 0 }}
          animate={projectsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* iOS Applications */}
          <div className="mb-10 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 border-b-2 border-hero-yellow pb-2">iOS Applications</h3>
            <div className="relative px-8 md:px-12">
              {/* Left Chevron - Always visible, not overlapping */}
              <button
                onClick={() => handleScroll(iosScrollRef, 'left', iosCurrentIndex, setIosCurrentIndex, iosProjects.length)}
                disabled={iosCurrentIndex === 0}
                className={`absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-hero-yellow text-white p-2 md:p-3 rounded-full shadow-lg transition-all ${
                  iosCurrentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-opacity-90 hover:scale-110'
                }`}
                aria-label="Scroll left"
              >
                <FaChevronLeft size={isMobile ? 16 : 20} />
              </button>

              {/* Scrollable Container */}
              <div
                ref={iosScrollRef}
                className={`flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide scroll-smooth ${
                  isMobile ? 'snap-x snap-mandatory' : ''
                }`}
                onScroll={() => handleManualScroll(iosScrollRef, setIosCurrentIndex, setIosIsFirstHalf, setIosIsSecondHalf)}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {iosProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex-shrink-0 ${
                      isMobile ? 'w-[calc(100%-2rem)] snap-center' : 'w-[280px] sm:w-[320px] md:w-[360px]'
                    } flex flex-col`}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-[180px] sm:w-[220px] md:w-[240px] overflow-hidden rounded-[30px] sm:rounded-[40px] shadow-lg border border-gray-300">
                        <Image
                          src={project.imageSrc}
                          alt={`${project.title} screenshot`}
                          width={240}
                          height={520}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="bg-cream rounded-lg p-4 sm:p-6 flex-grow flex flex-col">
                      <h4 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h4>
                      <p className="text-gray-600 text-sm sm:text-base flex-grow mb-4">{project.description}</p>

                      {/* Links Section */}
                      <div className="grid grid-cols-1 gap-2 mb-3 sm:mb-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 sm:gap-2 text-gray-800 hover:text-black text-sm sm:text-base"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <FaGithub size={18} />
                            <span className="hidden sm:inline">View on GitHub</span>
                            <span className="sm:hidden">GitHub</span>
                          </a>
                        )}

                        {project.appStore && (
                          <a
                            href={project.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 sm:gap-2 text-gray-800 hover:text-black text-sm sm:text-base"
                            aria-label={`View ${project.title} on App Store`}
                          >
                            <FaApple size={18} />
                            <span>App Store</span>
                          </a>
                        )}
                        {project.landingPage && (
                          <a
                            href={project.landingPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 sm:gap-2 text-gray-800 hover:text-black text-sm sm:text-base"
                            aria-label={`View ${project.title} landing page`}
                          >
                            <FaExternalLinkAlt size={16} />
                            <span>Landing Page</span>
                          </a>
                        )}
                      </div>

                      {/* Technologies Section */}
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.technologies.map(tech => (
                          <span key={tech} className="bg-hero-yellow bg-opacity-20 text-xs sm:text-sm rounded px-2 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Chevron - Always visible, not overlapping */}
              <button
                onClick={() => handleScroll(iosScrollRef, 'right', iosCurrentIndex, setIosCurrentIndex, iosProjects.length)}
                disabled={isMobile ? iosCurrentIndex === iosProjects.length - 1 : iosCurrentIndex >= iosProjects.length - 3}
                className={`absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-hero-yellow text-white p-2 md:p-3 rounded-full shadow-lg transition-all ${
                  (isMobile ? iosCurrentIndex === iosProjects.length - 1 : iosCurrentIndex >= iosProjects.length - 3)
                    ? 'opacity-40 cursor-not-allowed'
                    : 'opacity-100 hover:bg-opacity-90 hover:scale-110'
                }`}
                aria-label="Scroll right"
              >
                <FaChevronRight size={isMobile ? 16 : 20} />
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {isMobile ? (
                /* Mobile: Individual dots for each project */
                iosProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(iosScrollRef, index, setIosCurrentIndex)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === iosCurrentIndex ? 'bg-hero-yellow scale-125' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))
              ) : (
                /* Desktop: Binary pill indicators - fill based on scroll position */
                <>
                  <button
                    onClick={() => scrollToIndex(iosScrollRef, 0, setIosCurrentIndex)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      iosIsFirstHalf
                        ? 'bg-hero-yellow w-12 shadow-lg scale-105'
                        : 'bg-gray-300 w-8 hover:bg-gray-400'
                    }`}
                    aria-label="Go to first half"
                  />
                  <button
                    onClick={() => scrollToIndex(iosScrollRef, Math.ceil(iosProjects.length / 2), setIosCurrentIndex)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      iosIsSecondHalf
                        ? 'bg-hero-yellow w-12 shadow-lg scale-105'
                        : 'bg-gray-300 w-8 hover:bg-gray-400'
                    }`}
                    aria-label="Go to second half"
                  />
                </>
              )}
            </div>
          </div>

          {/* Web Projects */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 border-b-2 border-hero-yellow pb-2">Web Projects</h3>
            <div className="relative px-8 md:px-12">
              {/* Left Chevron - Always visible, not overlapping */}
              <button
                onClick={() => handleScroll(webScrollRef, 'left', webCurrentIndex, setWebCurrentIndex, webProjects.length)}
                disabled={webCurrentIndex === 0}
                className={`absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-hero-yellow text-white p-2 md:p-3 rounded-full shadow-lg transition-all ${
                  webCurrentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-opacity-90 hover:scale-110'
                }`}
                aria-label="Scroll left"
              >
                <FaChevronLeft size={isMobile ? 16 : 20} />
              </button>

              {/* Scrollable Container */}
              <div
                ref={webScrollRef}
                className={`flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide scroll-smooth ${
                  isMobile ? 'snap-x snap-mandatory' : ''
                }`}
                onScroll={() => handleManualScroll(webScrollRef, setWebCurrentIndex, setWebIsFirstHalf, setWebIsSecondHalf)}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {webProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    className={`flex-shrink-0 ${
                      isMobile ? 'w-[calc(100%-2rem)] snap-center' : 'w-[280px] sm:w-[320px] md:w-[360px]'
                    } flex flex-col`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="overflow-hidden shadow-lg rounded-t-lg">
                        <Image
                          src={project.imageSrc}
                          alt={`${project.title} screenshot`}
                          width={400}
                          height={240}
                          className="w-full"
                          loading="lazy"
                        />
                      </div>

                      <div className="bg-cream p-4 sm:p-6 flex-grow flex flex-col rounded-b-lg">
                        <h4 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h4>
                        <p className="text-gray-600 text-sm sm:text-base flex-grow mb-4">{project.description}</p>

                        {/* Links Section */}
                        <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 sm:gap-2 text-gray-800 hover:text-black text-sm sm:text-base"
                              aria-label={`View ${project.title} on GitHub`}
                            >
                              <FaGithub size={18} />
                              <span className="hidden sm:inline">View on GitHub</span>
                              <span className="sm:hidden">GitHub</span>
                            </a>
                          )}
                          {project.website && (
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 sm:gap-2 text-gray-800 hover:text-black text-sm sm:text-base"
                              aria-label={`Visit ${project.title} website`}
                            >
                              <FaExternalLinkAlt size={16} />
                              <span>Website</span>
                            </a>
                          )}
                        </div>

                        {/* Technologies Section */}
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {project.technologies.map(tech => (
                            <span key={tech} className="bg-hero-yellow bg-opacity-20 text-xs sm:text-sm rounded px-2 py-1">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Chevron - Always visible, not overlapping */}
              <button
                onClick={() => handleScroll(webScrollRef, 'right', webCurrentIndex, setWebCurrentIndex, webProjects.length)}
                disabled={isMobile ? webCurrentIndex === webProjects.length - 1 : webCurrentIndex >= webProjects.length - 3}
                className={`absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-hero-yellow text-white p-2 md:p-3 rounded-full shadow-lg transition-all ${
                  (isMobile ? webCurrentIndex === webProjects.length - 1 : webCurrentIndex >= webProjects.length - 3)
                    ? 'opacity-40 cursor-not-allowed'
                    : 'opacity-100 hover:bg-opacity-90 hover:scale-110'
                }`}
                aria-label="Scroll right"
              >
                <FaChevronRight size={isMobile ? 16 : 20} />
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {isMobile ? (
                /* Mobile: Individual dots for each project */
                webProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(webScrollRef, index, setWebCurrentIndex)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === webCurrentIndex ? 'bg-hero-yellow scale-125' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))
              ) : (
                /* Desktop: Binary pill indicators - fill based on scroll position */
                <>
                  <button
                    onClick={() => scrollToIndex(webScrollRef, 0, setWebCurrentIndex)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      webIsFirstHalf
                        ? 'bg-hero-yellow w-12 shadow-lg scale-105'
                        : 'bg-gray-300 w-8 hover:bg-gray-400'
                    }`}
                    aria-label="Go to first half"
                  />
                  <button
                    onClick={() => scrollToIndex(webScrollRef, Math.ceil(webProjects.length / 2), setWebCurrentIndex)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      webIsSecondHalf
                        ? 'bg-hero-yellow w-12 shadow-lg scale-105'
                        : 'bg-gray-300 w-8 hover:bg-gray-400'
                    }`}
                    aria-label="Go to second half"
                  />
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;