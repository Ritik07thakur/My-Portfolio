
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
  title: 'Starlight Folio - Ritik Thakur',
  description: 'Portfolio of Ritik Thakur, a MERN stack and Next.js fullstack developer, showcasing projects and skills in web development.',
  keywords: ['Ritik Thakur', 'MERN Stack Developer', 'Next.js Developer', 'Fullstack Developer', 'Freelancer', 'Web Developer', 'Portfolio', 'React Developer', 'Node.js Developer'],
  openGraph: {
    title: 'Starlight Folio - Ritik Thakur',
    description: 'Portfolio of Ritik Thakur, a MERN stack and Next.js fullstack developer.',
    url: 'https://your-portfolio-url.com', // IMPORTANT: Update with your actual deployed URL
    siteName: 'Ritik Thakur Portfolio',
    images: [
      {
        url: 'https://res.cloudinary.com/dewkk3cbk/image/upload/v1747423864/photo_xrtbts.jpg', // Using logo as OG image
        width: 600, // Adjust if you have a specific OG image size
        height: 600, // Adjust if you have a specific OG image size
        alt: 'Ritik Thakur - Portfolio Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starlight Folio - Ritik Thakur',
    description: 'Portfolio of Ritik Thakur, a MERN stack and Next.js fullstack developer.',
    // creator: '@yourTwitterHandle', // Optional: Add your Twitter handle
    images: ['https://res.cloudinary.com/dewkk3cbk/image/upload/v1747423864/photo_xrtbts.jpg'], // Using logo as Twitter image
  },
  // You can also add other metadata fields like 'robots', 'icons', 'manifest' etc.
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
    url: 'https://your-portfolio-url.com', // IMPORTANT: Update with your actual deployed URL
    image: 'https://res.cloudinary.com/dewkk3cbk/image/upload/v1747423639/WhatsApp_Image_2024-12-10_at_23.06.55_f90f4860_giuptz.jpg', // Profile photo from About section
    jobTitle: 'MERN Stack Developer, Freelancer, Quick Learner',
    description: 'Dedicated Fullstack Developer specializing in the MERN stack and Next.js, passionate about crafting intuitive, high-performance web applications.',
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
