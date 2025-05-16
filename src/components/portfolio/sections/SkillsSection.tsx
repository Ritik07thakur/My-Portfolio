
"use client";

import * as React from 'react';
import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"; // Ensure this path is correct
import { Progress } from '@/components/ui/progress';
import {
  Orbit,
  FileCode2,
  Palette,
  Braces, // Using Braces for JavaScript
  ToyBrick, // For Node.js
  Layers, // For Next.js
  Wind, // For Tailwind
  LayoutGrid, // For Bootstrap
  DatabaseZap, // For MongoDB
  Leaf, // Alternative for MongoDB or specific tech
  ServerCog, // For Express.js / Backend
  Route, // For Express.js
  ShieldCheck, // For Prisma
  TerminalSquare, // For VS Code
  Github,
  GitMerge,
  SendHorizontal, // For Postman
  Bolt, // For Thunder Client
  Triangle, // For Vercel
  CloudCog, // For Netlify
  Bot, // For ChatGPT
  BoxSelect, // For Blackbox
  ImageUp, // For Cloudinary
  WandSparkles, // For GitHub Copilot
  Code, // Generic for jQuery
  LucideReact,
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
  level?: number; // Optional: for progress bar, 0-100
}

const frontendSkills: Skill[] = [
  { name: 'HTML', icon: FileCode2, level: 95 },
  { name: 'CSS', icon: Palette, level: 90 },
  { name: 'JavaScript', icon: Braces, level: 85 },
  { name: 'React', icon: LucideReact, level: 90 },
  { name: 'Next.js', icon: Layers, level: 85 },
  { name: 'jQuery', icon: Code, level: 70 },
  { name: 'Bootstrap', icon: LayoutGrid, level: 80 },
  { name: 'Tailwind CSS', icon: Wind, level: 90 },
];

const backendSkills: Skill[] = [
  { name: 'Node.js', icon: ToyBrick, level: 85 },
  { name: 'Express.js', icon: Route, level: 80 },
  { name: 'MongoDB', icon: Leaf, level: 75 },
  { name: 'Prisma', icon: ShieldCheck, level: 70 },
];

const tools: Skill[] = [
  { name: 'VS Code', icon: TerminalSquare },
  { name: 'Git & GitHub', icon: Github },
  { name: 'Postman', icon: SendHorizontal },
  { name: 'Thunder Client', icon: Bolt },
  { name: 'Vercel', icon: Triangle },
  { name: 'Netlify', icon: CloudCog },
  { name: 'ChatGPT', icon: Bot },
  { name: 'Blackbox', icon: BoxSelect },
  { name: 'Cloudinary', icon: ImageUp },
  { name: 'GitHub Copilot', icon: WandSparkles },
];

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <Card className="bg-card/70 backdrop-blur-sm border-foreground/15 shadow-md hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300 group flex flex-col items-center p-4 text-center h-full">
    <CardHeader className="p-2">
      <skill.icon size={40} className="text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
    </CardHeader>
    <CardContent className="p-2 flex-grow flex flex-col justify-center">
      <CardTitle className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
        {skill.name}
      </CardTitle>
      {skill.level && (
        <div className="w-full mt-2">
          <Progress value={skill.level} aria-label={`${skill.name} proficiency ${skill.level}%`} className="h-2 [&>div]:bg-primary" />
          <p className="text-xs text-muted-foreground mt-1">{skill.level}%</p>
        </div>
      )}
    </CardContent>
  </Card>
);

const SkillsSection: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Autoplay functionality
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Loop back to the first slide
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [api]);

  const skillCategories = [
    { title: "Frontend Skills", skills: frontendSkills, gridCols: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" },
    { title: "Backend Skills", skills: backendSkills, gridCols: "grid-cols-2 md:grid-cols-4" }, // Fewer items, so 4 cols on md+
    { title: "Developer Tools", skills: tools, gridCols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" }, // More items, up to 5 cols
  ];

  return (
    <SectionWrapper id="skills">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 flex items-center justify-center">
          <Orbit size={36} className="mr-3 text-primary" /> My Tech Arsenal
        </h2>

        <Carousel setApi={setApi} className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <CarouselContent>
            {skillCategories.map((category, index) => (
              <CarouselItem key={index} className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-primary mb-6">{category.title}</h3>
                <div className={`grid ${category.gridCols} gap-4 md:gap-6 w-full px-2`}>
                  {category.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-10px] sm:left-[-16px] md:left-[-24px] text-primary border-primary hover:bg-primary hover:text-primary-foreground disabled:border-muted disabled:text-muted-foreground" />
          <CarouselNext className="right-[-10px] sm:right-[-16px] md:right-[-24px] text-primary border-primary hover:bg-primary hover:text-primary-foreground disabled:border-muted disabled:text-muted-foreground" />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground mt-4">
          Slide {current} of {count}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
