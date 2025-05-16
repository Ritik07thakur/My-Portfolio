
"use client";

import * as React from 'react';
import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Layers, Github, ExternalLink, Wand2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string; // For AI image search suggestions
  stack?: string[]; // Optional: tech stack
  liveUrl?: string;
  repoUrl?: string;
}

const normalProjectsData: Project[] = [
  {
    id: 'insta-clone',
    title: 'Instagram Clone',
    description: 'A clone of Instagram with basic post, profile, and like functionalities. Built with MERN stack.',
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.IKf-GFq3uinuSwQPqNng2wHaFn&pid=Api&P=0&h=180',
    imageHint: 'social media app',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    repoUrl: 'https://github.com/Ritik07thakur/Instagram-Clone-MERN-Stack',
  },
  {
    id: 'note-app',
    title: 'Note App',
    description: 'A simple CRUD note-taking app with real-time editing capabilities using MERN Stack.',
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.79e4m3FlswRWQKYSuJSzeQHaHa&pid=Api&P=0&h=180',
    imageHint: 'notes productivity app',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    repoUrl: 'https://github.com/Ritik07thakur/Note-App-Using-MERN-Stack-',
  },
  {
    id: 'blog-app',
    title: 'Blog App',
    description: 'Full-stack blog platform with user login, post creation, and a commenting system.',
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.G4d1nKfnlw8k-z2BPjNbagHaHa&pid=Api&P=0&h=180',
    imageHint: 'blog writing platform',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    repoUrl: 'https://github.com/Ritik07thakur/Full-Stack-Blog-app-main',
  },
];

const freelancingProjectsData: Project[] = [
  {
    id: 'vistra-travel',
    title: 'Vistra – Tour & Travel',
    description: 'A tour management site for local adventures and tent bookings in Churdhar.',
    imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Travel-logo-design-Graphics-9786083-1-1-580x435.jpg',
    imageHint: 'travel booking website',
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://churdhar.vercel.app/',
  },
  {
    id: 'medicine-shop',
    title: 'Medicine Shop',
    description: 'Online pharmacy store built for a local business to handle orders and inventory.',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/226/458/original/shopping-bag-icon-with-hospital-paramedic-medical-logo-medical-store-logo-template-element-vector.jpg',
    imageHint: 'online pharmacy store',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://drpharmax.com/',
  },
];

const collegeProjectsData: Project[] = [
  {
    id: 'hostel-management',
    title: 'Hostel Management System',
    description: 'Manages student admissions, complaints, and room allocations within a hostel environment.',
    imageUrl: 'https://dcassetcdn.com/design_img/2239944/517402/517402_11781462_2239944_9a6c7c25_image.jpg',
    imageHint: 'management system dashboard',
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'book-store',
    title: 'Book Store',
    description: 'A platform where students can buy and sell second-hand books across the college.',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/396/787/original/bookstore-and-papers-logo-vector.jpg',
    imageHint: 'online book marketplace',
    stack: ['Java', 'Spring Boot', 'MySQL'],
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card className="bg-card/70 backdrop-blur-sm border-foreground/15 shadow-lg overflow-hidden flex flex-col h-full group hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
    <CardHeader className="p-0">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={project.imageHint}
          className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>
    </CardHeader>
    <CardContent className="p-4 md:p-6 flex-grow">
      <CardTitle className="text-xl md:text-2xl text-foreground mb-2">{project.title}</CardTitle>
      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {project.stack.map(tech => (
            <span key={tech} className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{tech}</span>
          ))}
        </div>
      )}
      <CardDescription className="text-sm md:text-base text-muted-foreground">{project.description}</CardDescription>
    </CardContent>
    <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
      <div className="flex space-x-3">
        {project.liveUrl && (
          <Link href={project.liveUrl} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ExternalLink size={16} className="mr-2" /> Live Demo
              </Button>
            </a>
          </Link>
        )}
        {project.repoUrl && (
          <Link href={project.repoUrl} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent/50 hover:text-accent-foreground">
                <Github size={16} className="mr-2" /> View Code
              </Button>
            </a>
          </Link>
        )}
      </div>
    </CardFooter>
  </Card>
);

interface ProjectCategorySliderProps {
  title: string;
  projects: Project[];
  icon?: React.ElementType;
}

const ProjectCategorySlider: React.FC<ProjectCategorySliderProps> = ({ title, projects, icon: Icon }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="mb-12 md:mb-16">
      <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 flex items-center">
        {Icon && <Icon size={30} className="mr-3 text-primary/80" />}
        {title}
      </h3>
      <Carousel setApi={setApi} opts={{ align: "start", loop: projects.length > 2 }} className="w-full">
        <CarouselContent className="-ml-4">
          {projects.map((project) => (
            <CarouselItem key={project.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full"> {/* Added padding for better spacing around cards */}
                <ProjectCard project={project} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {projects.length > 1 && ( // Show arrows only if there's more than one project
          <>
            <CarouselPrevious className="left-[-10px] sm:left-[-16px] text-primary border-primary hover:bg-primary hover:text-primary-foreground disabled:border-muted disabled:text-muted-foreground" />
            <CarouselNext className="right-[-10px] sm:right-[-16px] text-primary border-primary hover:bg-primary hover:text-primary-foreground disabled:border-muted disabled:text-muted-foreground" />
          </>
        )}
      </Carousel>
      {projects.length > 1 && count > 0 && (
         <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      )}
    </div>
  );
};


const ProjectsSection: React.FC = () => {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 md:mb-12 text-center flex items-center justify-center">
        <Layers size={36} className="mr-3 text-primary" /> My Work & Creations
      </h2>
      
      <ProjectCategorySlider 
        title="Personal & Learning Projects" 
        projects={normalProjectsData}
        icon={Wand2} 
      />
      
      <ProjectCategorySlider 
        title="Freelancing Projects" 
        projects={freelancingProjectsData}
        icon={BriefcaseBusinessIcon} // Placeholder, replace with actual Briefcase or similar
      />
      
      <ProjectCategorySlider 
        title="College Projects" 
        projects={collegeProjectsData}
        icon={GraduationCapIcon} // Placeholder, replace with actual GraduationCap or similar
      />

    </SectionWrapper>
  );
};

// Placeholder icons, lucide-react might not have these exact names
// You might need to choose alternatives or import custom SVGs
const BriefcaseBusinessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const GraduationCapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0-.019 1.838l8.591 4.19a2 2 0 0 0 1.66 0l8.591-4.19z"></path>
    <path d="M3.276 13.922L3 20l9 2 9-2-0.276-6.078"></path>
  </svg>
);


export default ProjectsSection;
