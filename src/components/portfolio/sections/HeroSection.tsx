
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, Download, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-foreground"
        >
          Ritik Thakur
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-primary"
        >
          MERN Stack Developer | Freelancer | Quick Learner
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Crafting seamless digital experiences with modern web technologies. Passionate about clean code and innovative solutions.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <Link href="/resume.pdf" passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer" download>
              <Button size="lg" variant="default" className="text-lg px-8 py-6 group w-full sm:w-auto">
                <Download size={20} className="mr-2 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </a>
          </Link>
          <Link href="#contact">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 group border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto">
              <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
              Contact Me
            </Button>
          </Link>
        </motion.div>
         <motion.div variants={itemVariants} className="pt-12">
          <Link href="#about">
            <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary group">
              Learn More About Me
              <ArrowDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
