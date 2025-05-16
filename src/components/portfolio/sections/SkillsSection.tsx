import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit } from 'lucide-react'; // Changed from Zap to BrainCircuit

const skillsData = {
  frontend: ['React', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'GraphQL (Basic)'],
  tools: ['Git', 'GitHub', 'VS Code', 'Docker (Basic)', 'Firebase', 'Vercel', 'Webpack'],
  // other: ['Agile Methodologies', 'Problem Solving', 'UI/UX Principles (Basic)']
};

const SkillCategory: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-secondary/70 text-secondary-foreground hover:bg-secondary transition-colors">
          {skill}
        </Badge>
      ))}
    </div>
  </div>
);

const SkillsSection: React.FC = () => {
  return (
    <SectionWrapper id="skills">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center flex items-center justify-center">
        <BrainCircuit size={36} className="mr-3 text-primary" /> My Tech Arsenal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <SkillCategory title="Frontend Development" skills={skillsData.frontend} />
        </div>
        <div>
          <SkillCategory title="Backend Development" skills={skillsData.backend} />
        </div>
        <div>
          <SkillCategory title="Developer Tools & Platforms" skills={skillsData.tools} />
        </div>
      </div>
       {/* <SkillCategory title="Other Skills" skills={skillsData.other} /> */}
    </SectionWrapper>
  );
};

export default SkillsSection;
