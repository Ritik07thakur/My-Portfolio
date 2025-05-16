
"use client";

import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { motion } from 'framer-motion';
import { Briefcase, CodeXml, CalendarDays, Award } from 'lucide-react'; // Added Award for section title
import type { Icon as LucideIcon } from 'lucide-react';

interface TimelineEvent {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  duration: string;
  description?: string; // Optional: for more details if needed later
}

const trainingData: TimelineEvent[] = [
  {
    icon: Briefcase,
    iconColor: 'text-sky-400', // Example color
    title: '6 Months Industrial Training at Excellence Technology — MERN Stack Developer',
    duration: 'August 2024 - February 2025',
  },
  {
    icon: Briefcase, // Using Briefcase for MERN
    iconColor: 'text-emerald-400',
    title: '1 Month Industrial Training at Excellence Technology — MERN Stack Developer',
    duration: 'June 2024 - July 2024',
  },
  {
    icon: CodeXml, // Using CodeXml for Python
    iconColor: 'text-yellow-400',
    title: '1 Month Industrial Training at Excellence Technology — Python',
    duration: 'January 2024 - February 2024',
  },
];

const TimelineItem: React.FC<{ event: TimelineEvent; isLast: boolean }> = ({ event, isLast }) => {
  const IconComponent = event.icon;

  return (
    <motion.div
      className="flex"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center mr-6">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-card/80 border-2 ${event.iconColor ? event.iconColor.replace('text-', 'border-') : 'border-primary'} shadow-md`}>
          <IconComponent size={24} className={event.iconColor || 'text-primary'} />
        </div>
        {!isLast && <div className="w-px h-full bg-border mt-2"></div>}
      </div>
      <div className={`pb-10 ${isLast ? '' : 'min-h-[120px]'}`}>
        <motion.div
          className="bg-card/70 backdrop-blur-sm border border-foreground/15 shadow-lg rounded-lg p-4 md:p-6 hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{event.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <CalendarDays size={16} className="mr-2 text-primary/80" />
            {event.duration}
          </div>
          {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
};

const PracticeSection: React.FC = () => {
  // Sort data by start date, most recent first (assuming dates are parsable for basic sort)
  // A more robust sorting would involve date parsing. For now, relying on manual order.
  const sortedTrainingData = [...trainingData].sort((a, b) => {
    // Simple sort: "August 2024" vs "June 2024"
    // This is a basic sort and might need improvement for more complex date ranges
    const aEndDate = new Date(a.duration.split(' - ')[1] || a.duration.split(' ')[1] + " " + a.duration.split(' ')[0] + " 2024");
    const bEndDate = new Date(b.duration.split(' - ')[1] || b.duration.split(' ')[1] + " " + b.duration.split(' ')[0] + " 2024");
    return bEndDate.getTime() - aEndDate.getTime();
  });


  return (
    <SectionWrapper id="practice" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center flex items-center justify-center">
        <Award size={36} className="mr-3 text-primary" /> Training & Learning Journey
      </h2>
      <div className="relative max-w-2xl mx-auto">
        {/* This div creates the main timeline bar if needed, but individual item lines are used here */}
        {/* <div className="absolute left-6 top-0 h-full w-0.5 bg-border -z-10"></div> */}
        
        <div className="space-y-0"> {/* No space here, handled by pb in TimelineItem */}
          {sortedTrainingData.map((event, index) => (
            <TimelineItem key={index} event={event} isLast={index === sortedTrainingData.length - 1} />
          ))}
        </div>
      </div>
       <p className="text-center text-muted-foreground mt-12">
        Continuously learning and growing in the field of web development.
      </p>
    </SectionWrapper>
  );
};

export default PracticeSection;
