import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { UserCircle, Award, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <SectionWrapper id="about">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 flex items-center justify-center">
          <UserCircle size={36} className="mr-3 text-primary" /> About Me
        </h2>
        <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
          Hello! I&apos;m Ritik Thakur, a dedicated Fullstack Developer specializing in the MERN stack and Next.js. My journey in technology is fueled by a passion for crafting intuitive, high-performance web applications that solve real-world problems. I thrive on continuous learning and adapting to new challenges in the ever-evolving tech landscape.
        </p>
        
        <div className="my-6 w-full max-w-2xl">
          <h3 className="text-2xl font-semibold text-primary mb-3 flex items-center justify-center">
            <Award size={28} className="mr-2" /> Professional Training
          </h3>
          <p className="text-lg text-muted-foreground mb-4">
            I honed my skills through an intensive training program at Excellence Technology, where I gained in-depth knowledge of full-stack development practices. This experience provided me with a strong foundation in building robust applications, from conceptualization to deployment, and working effectively within a team environment.
          </p>
        </div>

        <div className="my-6 w-full max-w-2xl">
          <h3 className="text-2xl font-semibold text-primary mb-3 flex items-center justify-center">
            <Users size={28} className="mr-2" /> Soft Skills
          </h3>
          <p className="text-lg text-muted-foreground">
            Beyond technical expertise, I pride myself on strong soft skills including effective communication, collaborative teamwork, and a proactive approach to problem-solving. I am a quick learner, highly adaptable, and committed to delivering quality results.
          </p>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl">
          When I&apos;m not coding, I enjoy exploring new tech trends, contributing to open-source projects, and staying active with outdoor activities.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
