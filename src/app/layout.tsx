
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import StarfieldCanvas from '@/components/portfolio/StarfieldCanvas';
import NavigationBar from '@/components/portfolio/NavigationBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ritik Thakur | MERN Stack Developer',
  description: "Ritik Thakur's portfolio – MERN Stack and Next.js Developer actively looking for job opportunities. Explore skills, projects, and contact details.",
  keywords: ['Ritik Thakur', 'MERN Stack Developer', 'Next.js Developer', 'Fullstack Developer', 'Freelancer', 'Web Developer', 'Portfolio', 'React Developer', 'Node.js Developer', 'Job Seeker', 'Open to opportunities'],
  openGraph: {
    title: 'Ritik Thakur | MERN Stack Developer',
    description: "Check out Ritik Thakur's portfolio. Fullstack MERN & Next.js developer with experience in building real-world projects and freelancing apps.",
    url: 'https://ritikthakur.vercel.app',
    siteName: 'Ritik Thakur Portfolio',
    images: [
      {
        url: 'https://ritikthakur.vercel.app/og-image.jpg', // Assuming og-image.jpg is in your /public folder
        width: 1200, // Standard OG image width
        height: 630, // Standard OG image height
        alt: 'Ritik Thakur - MERN Stack Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritik Thakur | MERN Stack Developer',
    description: 'Portfolio of Ritik Thakur, a fullstack developer skilled in React, Node.js, MongoDB, Express, and Next.js. Open to job opportunities.',
    // creator: '@yourTwitterHandle', // Optional: Add your Twitter handle if you have one
    images: ['https://ritikthakur.vercel.app/og-image.jpg'], // Assuming og-image.jpg is in your /public folder
  },
  // Viewport is generally handled by Next.js automatically in App Router.
  // Favicon is also handled by placing favicon.ico in the /app directory root or /public.
  // We'll rely on Next.js conventions for these.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ritik Thakur',
    url: 'https://ritikthakur.vercel.app', // Updated URL
    // Using the more specific profile picture for Person schema, rather than a generic OG image
    image: 'https://res.cloudinary.com/dewkk3cbk/image/upload/v1747423639/WhatsApp_Image_2024-12-10_at_23.06.55_f90f4860_giuptz.jpg', 
    jobTitle: 'MERN Stack Developer, Freelancer, Quick Learner',
    description: "Ritik Thakur's portfolio – MERN Stack and Next.js Developer actively looking for job opportunities. Explore skills, projects, and contact details.", // Updated description
    sameAs: [
      'https://github.com/Ritik07thakur',
      'https://www.linkedin.com/in/ritik-thakur-3951502b1/',
      'https://www.instagram.com/ritik_.rajput_.26/',
    ],
    // Optional: If you have a company you work for or an almaMater
    // worksFor: {
    //   '@type': 'Organization',
    //   name: 'Excellence Technology' // Example
    // },
    // alumniOf: {
    //  '@type': 'CollegeOrUniversity',
    //  name: 'Your University Name' // Example
    // }
  };

  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Next.js will automatically manage other head tags based on the metadata object */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          key="person-jsonld"
        />
      </head>
      <body className="antialiased">
        <StarfieldCanvas />
        <NavigationBar />
        <main className="relative z-10">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
