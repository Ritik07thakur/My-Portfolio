import SectionWrapper from '@/components/portfolio/SectionWrapper';
import Image from 'next/image';
import { UserCircle } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <SectionWrapper id="about">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-48 h-48 md:w-60 md:h-60 relative rounded-full overflow-hidden border-4 border-primary/50 shadow-lg shrink-0">
          <Image 
            src="https://placehold.co/240x240.png" 
            alt="Ritik Thakur" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="professional developer"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 flex items-center justify-center md:justify-start">
            <UserCircle size={36} className="mr-3 text-primary" /> About Me
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Hello! I&apos;m Ritik Thakur, a dedicated Fullstack Developer specializing in the MERN stack and Next.js. With a strong foundation in both front-end and back-end development, I strive to build intuitive, high-performance web applications.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            My journey in tech is driven by a passion for problem-solving and a love for creating meaningful digital products. I enjoy tackling complex challenges and continuously learning new technologies to enhance my skillset.
          </p>
          <p className="text-lg text-muted-foreground">
            When I&apos;m not coding, I enjoy exploring new tech trends, contributing to open-source projects, and [mention a hobby here, e.g., playing chess / reading sci-fi novels].
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
