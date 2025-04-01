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
    { name: 'Swift', logo: '/swift.png', category: 'Mobile Development' },
    { name: 'UIKit', logo: '/uikit.png', category: 'iOS Framework' },
    { name: 'SwiftUI', logo: '/swiftui.png', category: 'iOS Framework' },
    { name: 'SwiftData', logo: '/swiftdata.png', category: 'Database' },
    { name: 'Firebase', logo: '/firebase.png', category: 'Backend Service' },
    { name: 'PostgreSQL', logo: '/postgresql.png', category: 'Database' },
    { name: 'Node.js', logo: '/nodejs.png', category: 'Backend' },
    { name: 'Express', logo: '/express.png', category: 'Backend Framework' },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <section id="skills" className="section bg-cream py-16 mb-16">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            My Skills
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
                variants={fadeInVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex items-center justify-center mb-5">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Image
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </motion.div>
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
