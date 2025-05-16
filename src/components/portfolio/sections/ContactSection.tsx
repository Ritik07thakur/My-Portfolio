import SectionWrapper from '@/components/portfolio/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, Twitter, Send } from 'lucide-react'; // Added Send icon
import Link from 'next/link';

const socialLinks = [
  { icon: Mail, href: 'mailto:ritik.thakur.dev@example.com', label: 'Email', user: 'ritik.thakur.dev@example.com' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ritikthakur-dev', label: 'LinkedIn', user: 'ritikthakur-dev' },
  { icon: Github, href: 'https://github.com/ritikthakur', label: 'GitHub', user: 'ritikthakur' },
  { icon: Twitter, href: 'https://twitter.com/ritikthakurdev', label: 'Twitter', user: '@ritikthakurdev' },
];

const ContactSection: React.FC = () => {
  return (
    <SectionWrapper id="contact">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center flex items-center justify-center">
        <Send size={36} className="mr-3 text-primary" /> Get In Touch
      </h2>
      <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-10">
        I&apos;m currently open to new opportunities and collaborations. Whether you have a project in mind, a question, or just want to say hi, feel free to reach out!
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {socialLinks.map((link) => (
          <Link key={link.label} href={link.href} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full sm:w-auto min-w-[180px]">
                <link.icon size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                {link.label}
              </Button>
            </a>
          </Link>
        ))}
      </div>

      <p className="text-center text-muted-foreground mt-8">
        Looking forward to connecting with you!
      </p>
      <p className="text-center text-xs text-muted-foreground/70 mt-12">
        © {new Date().getFullYear()} Ritik Thakur. All rights reserved.
      </p>
    </SectionWrapper>
  );
};

export default ContactSection;
