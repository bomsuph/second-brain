import { getDocumentsByTag, getAllTags } from '@/lib/documents';
import DocumentCard from '@/components/DocumentCard';
import Link from 'next/link';

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const docs = getDocumentsByTag(decodedTag);

  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">Tag: #{decodedTag}</span>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">#{decodedTag}</h1>
        <p className="text-[var(--text-muted)]">{docs.length} documents</p>
      </div>
      <div className="space-y-3">
        {docs.map((doc) => (
          <DocumentCard key={doc.slug} slug={doc.slug} title={doc.title} date={doc.date} type={doc.type} tags={doc.tags} excerpt={doc.content.slice(0, 150).replace(/[#*_\[\]]/g, '').trim()} />
        ))}
      </div>
    </div>
  );
}
