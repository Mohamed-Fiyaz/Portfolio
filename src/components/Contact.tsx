import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    console.log("Submitting with email:", formData.email);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const templateParams = {
        name: formData.name,
        time: new Date().toLocaleString(),
        from_email: formData.email, 
        message: formData.message,
        to_name: 'Mohamed Fiyaz',
      };

      console.log("Template parameters:", templateParams);

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log("EmailJS response:", response);

      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later or contact me directly at mohamed-fiyaz@outlook.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-cream py-12 px-4 sm:px-6 md:py-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-center">Get In Touch</h2>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="order-2 md:order-1">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
              <p className="mb-4 text-sm sm:text-base">Feel free to reach out to me for collaboration, job opportunities, or just to say hello!</p>

              <div className="mt-6">
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-hero-yellow rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <a href="mailto:mohamed-fiyaz@outlook.com" className="text-gray-700 hover:text-gray-900 text-sm sm:text-base break-all">
                    mohamed-fiyaz@outlook.com
                  </a>
                </div>

                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-hero-yellow rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 md:order-2 mb-8 md:mb-0">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hero-yellow focus:border-transparent"
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hero-yellow focus:border-transparent"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hero-yellow focus:border-transparent"
                    placeholder="Write your message here..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {submitStatus && (
                  <div className={`p-3 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  className={`bg-hero-yellow px-4 py-2 sm:px-6 sm:py-3 rounded-md text-gray-800 text-sm sm:text-base font-medium hover:bg-opacity-80 transition-all w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;