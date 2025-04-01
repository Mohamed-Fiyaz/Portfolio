import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TypeAnimation from './TypeAnimation';

const Hero = () => {
    const [showTyping, setShowTyping] = useState(false);

    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            setShowTyping(true);
        }, 200);
        
        return () => clearTimeout(typingTimeout);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1, 
                duration: 0.2 
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 10 }, 
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3, 
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="hero" className="hero-section bg-[#DDA853]">
            <div className="container mx-auto px-4 md:px-12 flex flex-col items-center justify-center min-h-screen pt-20 pb-10">
                <motion.div 
                    className="w-full flex flex-col lg:flex-row items-center"
                    variants={containerVariants}
                    initial="visible" 
                    animate="visible"
                >
                    {/* Image - On top for small/medium screens, on right for large screens */}
                    <motion.div
                        className="w-full lg:w-1/2 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src="profile.png"
                            alt="Profile Picture"
                            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg object-cover"
                        />
                    </motion.div>

                    {/* Text and Social Media - Below image on small/medium screens, on left for large screens */}
                    <div className="w-full lg:w-1/2 lg:order-1 text-center lg:text-left lg:pr-8">
                        <motion.h1 
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 break-words"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Hi, I&apos;m Mohamed Fiyaz
                        </motion.h1>

                        <motion.div 
                            className="text-lg sm:text-xl md:text-2xl mb-6 min-h-8"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Show typing animation immediately or with minimal delay */}
                            {showTyping && (
                                <TypeAnimation phrases={["an indie iOS app developer", "a web developer", "a programmer"]} />
                            )}
                        </motion.div>

                        <motion.p 
                            className="text-base sm:text-lg mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            Currently pursuing my Bachelor's in Computer Science and Engineering from SRM Institute of Science and Technology.
                        </motion.p>

                        {/* Social Media Icons */}
                        <motion.div 
                            className="flex justify-center lg:justify-start space-x-6 mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                        >
                            <a href="mailto:mohamed-fiyaz@outlook.com" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 transition-colors" title="Email me">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>

                            <a href="https://www.linkedin.com/in/mohamed-fiyaz-8b9146254/" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 transition-colors" title="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                                </svg>
                            </a>

                            <a href="https://github.com/Mohamed-Fiyaz" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 transition-colors" title="GitHub">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;