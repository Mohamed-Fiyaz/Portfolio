import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  // Detect if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile
    };
    
    // Check initially
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const skills = [
    {
      name: 'Swift',
      logo: '/swift.png',
      category: 'Mobile Development'
    },
    {
      name: 'UIKit',
      logo: '/uikit.png',
      category: 'iOS Framework'
    },
    {
      name: 'SwiftUI',
      logo: '/swiftui.png',
      category: 'iOS Framework'
    },
    {
      name: 'SwiftData',
      logo: '/swiftdata.png',
      category: 'Database'
    },
    {
      name: 'Firebase',
      logo: '/firebase.png',
      category: 'Backend Service'
    },
    {
      name: 'PostgreSQL',
      logo: '/postgresql.png',
      category: 'Database'
    },
    {
      name: 'Node.js',
      logo: '/nodejs.png',
      category: 'Backend'
    },
    {
      name: 'Express',
      logo: '/express.png',
      category: 'Backend Framework'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, 
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="section bg-cream py-16 mb-16">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 15 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">My Skills</h2>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 flex flex-col items-center"
                whileHover={!isMobile ? {
                  y: -5, 
                  scale: 1.02, 
                  transition: { duration: 0.2 }
                } : {}}
              >
                <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex items-center justify-center mb-5 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      width={64}
                      height={64}
                      className="object-contain"
                      style={{
                        width: '64px',
                        height: '64px',
                      }}
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-center">{skill.name}</h3>
                <p className="text-sm text-gray-500 text-center mt-1">{skill.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;