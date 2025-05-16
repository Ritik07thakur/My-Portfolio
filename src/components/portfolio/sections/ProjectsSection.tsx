import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Layers, Github, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageHint: string;
}

const projectsData: Project[] = [
  {
    id: 'project1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce website with product listings, cart functionality, user authentication, and payment integration. Built with MERN stack and Next.js for SSR.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'e-commerce online store',
    stack: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'project2',
    title: 'Task Management App',
    description: 'A collaborative task management application allowing users to create, assign, and track tasks. Features real-time updates and a clean, intuitive UI.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'task manager productivity',
    stack: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: '#',
  },
  {
    id: 'project3',
    title: 'Portfolio Showcase API',
    description: 'A RESTful API backend for managing and serving portfolio project data. Includes authentication and CRUD operations for projects and skills.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'API backend code',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    repoUrl: '#',
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card className="bg-card/80 backdrop-blur-sm border-foreground/15 shadow-lg overflow-hidden flex flex-col h-full hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300">
    <CardHeader className="p-0">
      <div className="relative w-full h-48">
        <Image 
            src={project.imageUrl} 
            alt={project.title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={project.imageHint}
        />
      </div>
    </CardHeader>
    <CardContent className="p-6 flex-grow">
      <CardTitle className="text-2xl text-foreground mb-2">{project.title}</CardTitle>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.stack.map(tech => (
          <span key={tech} className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{tech}</span>
        ))}
      </div>
      <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
    </CardContent>
    <CardFooter className="p-6 pt-0 mt-auto">
      <div className="flex space-x-3">
        {project.liveUrl && (
          <Link href={project.liveUrl} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ExternalLink size={16} className="mr-2" /> Live Demo
              </Button>
            </a>
          </Link>
        )}
        {project.repoUrl && (
          <Link href={project.repoUrl} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="text-foreground hover:bg-accent/50 hover:text-accent-foreground">
                <Github size={16} className="mr-2" /> View Code
              </Button>
            </a>
          </Link>
        )}
      </div>
    </CardFooter>
  </Card>
);

const ProjectsSection: React.FC = () => {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center flex items-center justify-center">
        <Layers size={36} className="mr-3 text-primary" /> Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
