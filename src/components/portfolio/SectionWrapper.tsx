"use client";

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends PropsWithChildren {
  id: string;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className }) => {
  return (
    <motion.section
      id={id}
      className={cn(
        'min-h-screen flex flex-col justify-center items-center py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="w-full max-w-4xl bg-card/60 backdrop-blur-lg border border-foreground/10 rounded-xl shadow-2xl p-6 md:p-10">
        {children}
      </div>
    </motion.section>
  );
};

export default SectionWrapper;
