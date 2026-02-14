import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { getAllDocuments } from '@/lib/documents';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Second Brain',
  description: 'Personal knowledge system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllDocuments();
  const concepts = docs.filter(d => d.category === 'concepts').map(d => ({ slug: d.slug, title: d.title, date: d.date }));
  const journal = docs.filter(d => d.category === 'journal').map(d => ({ slug: d.slug, title: d.title, date: d.date }));
  const projects = docs.filter(d => d.category === 'projects').map(d => ({ slug: d.slug, title: d.title, date: d.date }));

  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Sidebar concepts={concepts} journal={journal} projects={projects} />
        <main className="lg:ml-64 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
