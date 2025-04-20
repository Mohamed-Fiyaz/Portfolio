import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section bg-white">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">About Me</h2>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl mx-auto">
            {/* Photo on the left */}
            <motion.div
              className="w-full md:w-1/3 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.img
                src="realPhoto.jpeg"
                alt="My Photo"
                className="w-48 md:w-60 rounded-lg object-cover shadow-md"
                style={{ aspectRatio: '9/16' }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>

            {/* About text on the right */}
            <div className="w-full md:w-2/3">
              <p className="text-lg mb-6">
                I am a native iOS developer with a strong foundation in Swift and SwiftUI. I got interested in programming during my high school studies, and during my undergraduate studies, I discovered my love for creating beautiful and functional mobile applications and websites.
              </p>

              <p className="text-lg mb-6">
                As an indie developer, I enjoy working on projects that challenge me and allow me to learn new technologies while developing them. I love building projects from scratch, seeing my Figma design come to life through code is a treat. I believe great apps are not just built — they're crafted. I obsess over little details because users feel them, even if they don’t see them.
              </p>

              <p className="text-lg mb-6">
                When I'm not coding, I spend my time reading comics, playing table tennis, and learning new languages. Currently, I'm learning German. <br />
                P.S. I'm also a huge Star Wars geek — just had to put that out there.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;