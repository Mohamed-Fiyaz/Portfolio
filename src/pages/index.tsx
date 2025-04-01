import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollDown from '../components/ScrollDown';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Mohamed Fiyaz | Portfolio</title>
        <meta name="description" content="Mohamed Fiyaz - iOS Developer Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Hero />
        {showScroll && <ScrollDown />}
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}