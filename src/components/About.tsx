import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section bg-white">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">About Me</h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              I am a passionate iOS developer with a strong foundation in Swift and UIKit. My journey in programming began during my undergraduate studies, where I discovered my love for creating beautiful and functional mobile applications.
            </p>
            
            <p className="text-lg mb-6">
              As an indie developer, I enjoy working on projects that challenge me and allow me to grow my skills. I believe in writing clean, maintainable code and creating intuitive user experiences.
            </p>
            
            <p className="text-lg mb-6">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.
            </p>
            
            <div className="mt-10 text-center">
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="inline-block bg-hero-yellow px-6 py-3 rounded-md text-gray-800 font-medium hover:bg-opacity-80 transition-all"
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;