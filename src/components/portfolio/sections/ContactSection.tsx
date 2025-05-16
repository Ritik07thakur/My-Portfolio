
"use client";

import { useState, useEffect } from 'react';
import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin, Github, Send, Phone, Instagram } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const contactDetailsList = [
  { icon: Mail, text: 'tritik2307@gmail.com', href: 'mailto:tritik2307@gmail.com' },
  { icon: Phone, text: '9015433794', href: 'tel:9015433794' },
];

const socialMediaLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ritik-thakur-3951502b1/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Ritik07thakur', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/ritik_.rajput_.26/', label: 'Instagram' },
];

const ContactSection: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic form submission alert.
    // In a real app, you would handle form submission here (e.g., send data to a backend or email service)
    alert('Message sent (simulated)! In a real app, this would be a real submission.');
    (event.target as HTMLFormElement).reset();
  };

  return (
    <SectionWrapper id="contact">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center flex items-center justify-center">
        <Send size={36} className="mr-3 text-primary" /> Get In Touch
      </h2>
      <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-10">
        I&apos;m currently open to new opportunities and collaborations. Whether you have a project in mind, a question, or just want to say hi, feel free to reach out!
      </p>
      
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Contact Form */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-primary mb-6">Send Me a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</Label>
              <Input type="text" name="name" id="name" required className="w-full bg-card/80 border-foreground/20 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</Label>
              <Input type="email" name="email" id="email" required className="w-full bg-card/80 border-foreground/20 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</Label>
              <Textarea name="message" id="message" rows={4} required className="w-full bg-card/80 border-foreground/20 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <Button type="submit" variant="outline" size="lg" className="w-full sm:w-auto group border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Send Message <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Contact Info & Socials */}
        <motion.div 
          className="flex-1 md:w-1/3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-4">Contact Information</h3>
            <ul className="space-y-3">
              {contactDetailsList.map((item, index) => (
                <li key={index} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <item.icon size={20} className="mr-3 text-primary/80 flex-shrink-0" />
                  <a href={item.href} className="break-all">{item.text}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              {socialMediaLinks.map((link) => (
                <Link key={link.label} href={link.href} passHref legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"
                  >
                    <link.icon size={28} />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-center text-xs text-muted-foreground/70 mt-16">
        © {currentYear} Ritik Thakur. All rights reserved.
      </p>
    </SectionWrapper>
  );
};

export default ContactSection;
