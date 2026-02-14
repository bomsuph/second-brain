'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarDoc {
  slug: string;
  title: string;
  date: string;
}

interface SidebarProps {
  concepts: SidebarDoc[];
  journal: SidebarDoc[];
  projects: SidebarDoc[];
}

const icons = {
  concepts: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  journal: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  projects: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

function SidebarSection({ label, icon, docs, basePath }: { label: string; icon: React.ReactNode; docs: SidebarDoc[]; basePath: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
      >
        {icon}
        <span className="flex-1 text-left">{label}</span>
        <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">{docs.length}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-0' : '-rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="ml-3 mt-0.5 space-y-0.5">
          {docs.map((doc) => {
            const href = `/doc/${doc.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={doc.slug}
                href={href}
                className={`block px-3 py-1.5 text-sm rounded-lg transition-colors truncate ${
                  isActive
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {doc.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ concepts, journal, projects }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/concepts', label: 'Concepts' },
    { href: '/journal', label: 'Journal' },
    { href: '/projects', label: 'Projects' },
  ];

  const sidebar = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center text-white font-bold text-sm">B</div>
          <span className="font-semibold text-[var(--text-primary)]">Second Brain</span>
        </Link>
      </div>

      {/* Nav Links */}
      <div className="px-3 py-3 space-y-0.5 border-b border-[var(--border)]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname === link.href
                ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Document Tree */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <SidebarSection label="Concepts" icon={icons.concepts} docs={concepts} basePath="concepts" />
        <SidebarSection label="Journal" icon={icons.journal} docs={journal} basePath="journal" />
        <SidebarSection label="Projects" icon={icons.projects} docs={projects} basePath="projects" />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--bg-surface)] rounded-lg border border-[var(--border)]"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-[var(--bg-secondary)] border-r border-[var(--border)] z-40 transform transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebar}
      </aside>
    </>
  );
}
