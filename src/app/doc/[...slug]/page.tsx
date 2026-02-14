import { getAllDocuments, getDocumentBySlug } from '@/lib/documents';
import MarkdownContent from '@/components/MarkdownContent';
import TagPill from '@/components/TagPill';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const docs = getAllDocuments();
  return docs.map((doc) => ({
    slug: doc.slug.split('/'),
  }));
}

const typeColors: Record<string, string> = {
  concept: 'bg-blue-500/10 text-blue-400',
  journal: 'bg-green-500/10 text-green-400',
  project: 'bg-purple-500/10 text-purple-400',
};

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugStr = slug.join('/');
  const doc = getDocumentBySlug(slugStr);
  if (!doc) notFound();

  const allDocs = getAllDocuments();
  const relatedDocs = doc.related
    .map((r) => allDocs.find((d) => d.slug.endsWith(r)))
    .filter(Boolean);

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
        <span>/</span>
        <Link href={`/${doc.category}`} className="hover:text-[var(--accent)] capitalize">{doc.category}</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)] truncate">{doc.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${typeColors[doc.type] || 'bg-gray-500/10 text-gray-400'}`}>
            {doc.type}
          </span>
          {doc.date && <span className="text-sm text-[var(--text-muted)]">{doc.date}</span>}
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">{doc.title}</h1>
        {doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {doc.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
          </div>
        )}
      </div>

      {/* Content */}
      <MarkdownContent content={doc.content} />

      {/* Related Documents */}
      {relatedDocs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <h2 className="text-lg font-semibold text-white mb-4">Related Documents</h2>
          <div className="space-y-2">
            {relatedDocs.map((rd) => rd && (
              <Link
                key={rd.slug}
                href={`/doc/${rd.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all"
              >
                <span className={`px-2 py-0.5 text-xs rounded-md ${typeColors[rd.type] || 'bg-gray-500/10 text-gray-400'}`}>{rd.type}</span>
                <span className="text-[var(--text-primary)] hover:text-[var(--accent)]">{rd.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
