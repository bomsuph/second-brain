import { getAllDocuments, getAllTags } from '@/lib/documents';
import DocumentCard from '@/components/DocumentCard';
import TagPill from '@/components/TagPill';
import Link from 'next/link';

export default function HomePage() {
  const docs = getAllDocuments();
  const tags = getAllTags();
  const recent = docs.slice(0, 5);
  const conceptCount = docs.filter(d => d.category === 'concepts').length;
  const journalCount = docs.filter(d => d.category === 'journal').length;
  const projectCount = docs.filter(d => d.category === 'projects').length;

  const stats = [
    { label: 'Concepts', count: conceptCount, href: '/concepts', color: 'from-blue-500 to-blue-600' },
    { label: 'Journal', count: journalCount, href: '/journal', color: 'from-green-500 to-green-600' },
    { label: 'Projects', count: projectCount, href: '/projects', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[var(--text-muted)]">{docs.length} documents in your second brain</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="relative overflow-hidden p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all group"
          >
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${s.color}`} />
            <div className="text-3xl font-bold text-white mb-1">{s.count}</div>
            <div className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Documents */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Documents</h2>
        <div className="space-y-3">
          {recent.map((doc) => (
            <DocumentCard
              key={doc.slug}
              slug={doc.slug}
              title={doc.title}
              date={doc.date}
              type={doc.type}
              tags={doc.tags}
              excerpt={doc.content.slice(0, 150).replace(/[#*_\[\]]/g, '').trim()}
            />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[var(--tag-bg)] text-[var(--tag-text)] rounded-full hover:bg-[var(--accent)]/20 transition-colors"
            >
              #{tag}
              <span className="text-xs text-[var(--text-muted)]">{count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
