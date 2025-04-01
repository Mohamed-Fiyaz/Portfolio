import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
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

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const getItemVariants = (index: number) => {
    const col = index % 4;
    
    if (col < 2) {
      return {
        hidden: { x: -40, opacity: 0, scale: 0.8 },
        visible: { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          transition: { 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.5,
            when: "beforeChildren"
          }
        }
      };
    } else {
      return {
        hidden: { x: 40, opacity: 0, scale: 0.8 },
        visible: { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          transition: { 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.5,
            when: "beforeChildren"
          }
        }
      };
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="section bg-cream py-16 mb-16">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            My Skills
          </motion.h2>

          {isMobile ? (
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex items-center justify-center mb-3 relative">
                    <div className="flex items-center justify-center">
                      <Image
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                        style={{
                          width: '48px',
                          height: '48px',
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-base text-center">{skill.name}</h3>
                  <p className="text-xs text-gray-500 text-center mt-1">{skill.category}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
              variants={gridVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={getItemVariants(index)}
                  className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 flex flex-col items-center"
                  whileHover={{
                    y: -5, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex items-center justify-center mb-5 relative">
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{
                        rotate: [0, -10, 10, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
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
                    </motion.div>
                  </div>
                  <h3 className="font-semibold text-lg text-center">{skill.name}</h3>
                  <p className="text-sm text-gray-500 text-center mt-1">{skill.category}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;