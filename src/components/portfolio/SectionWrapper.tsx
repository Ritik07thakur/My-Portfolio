
"use client";

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends PropsWithChildren {
  id: string;
  className?: string;
}

const sectionVariants = {
  hidden: {}, // Can be empty if parent only orchestrates
  visible: {
    transition: {
      // staggerChildren: 0.1, // Example if you had multiple animated children inside the card
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className }) => {
  return (
    <motion.section
      id={id}
      className={cn(
        'min-h-screen flex flex-col justify-center items-center py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div
        className="w-full max-w-4xl bg-card/60 backdrop-blur-lg border border-foreground/10 rounded-xl shadow-2xl p-6 md:p-10"
        variants={cardVariants}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default SectionWrapper;
