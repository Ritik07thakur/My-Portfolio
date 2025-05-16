import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
          Ritik Thakur
        </h1>
        <p className="text-2xl md:text-3xl text-primary mb-8">
          Fullstack Developer (MERN & Next.js)
        </p>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Crafting seamless digital experiences with modern web technologies. Passionate about clean code and innovative solutions.
        </p>
        <Link href="#projects">
          <Button size="lg" variant="default" className="text-lg px-8 py-6 group">
            View My Work <ArrowDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
