import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { UserCircle, Award, Users } from 'lucide-react';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <SectionWrapper id="about">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center justify-center">
          <UserCircle size={36} className="mr-3 text-primary" /> About Me
        </h2>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="md:w-1/3 flex-shrink-0">
            <div className="relative w-64 h-64 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-primary/50">
              <Image
                src="https://placehold.co/400x400.png"
                alt="Ritik Thakur"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                data-ai-hint="profile portrait"
              />
            </div>
          </div>
          
          <div className="md:w-2/3 text-center md:text-left">
            <p className="text-lg text-muted-foreground mb-6">
              Hello! I&apos;m Ritik Thakur, a dedicated Fullstack Developer specializing in the MERN stack and Next.js. My journey in technology is fueled by a passion for crafting intuitive, high-performance web applications that solve real-world problems. I thrive on continuous learning and adapting to new challenges in the ever-evolving tech landscape.
            </p>
            
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-primary mb-2 flex items-center justify-center md:justify-start">
                <Award size={28} className="mr-2" /> Professional Training
              </h3>
              <p className="text-lg text-muted-foreground">
                I honed my skills through an intensive training program at Excellence Technology, where I gained in-depth knowledge of full-stack development practices. This experience provided me with a strong foundation in building robust applications, from conceptualization to deployment, and working effectively within a team environment.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-primary mb-2 flex items-center justify-center md:justify-start">
                <Users size={28} className="mr-2" /> Soft Skills
              </h3>
              <p className="text-lg text-muted-foreground">
                Beyond technical expertise, I pride myself on strong soft skills including effective communication, collaborative teamwork, and a proactive approach to problem-solving. I am a quick learner, highly adaptable, and committed to delivering quality results.
              </p>
            </div>
          </div>
        </div>
        <p className="text-lg text-muted-foreground mt-8 max-w-3xl text-center">
          When I&apos;m not coding, I enjoy exploring new tech trends, contributing to open-source projects, and staying active with outdoor activities.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
