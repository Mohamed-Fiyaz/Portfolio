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
              I am a native iOS developer with a strong foundation in Swift and UIKit. I got interested in programming during my high school studies, and during my undergraduate studies, I discovered my love for creating beautiful and functional mobile applications and websites.
            </p>

            <p className="text-lg mb-6">
              As an indie developer, I enjoy working on projects that challenge me and allow me to learn new technologies while developing them. I love building projects from scratch, seeing my Figma design come to life through code is a treat.
            </p>

            <p className="text-lg mb-6">
              When I'm not coding, I spend my time reading comics, playing table tennis, and learning new languages. Currently, I'm learning German.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;