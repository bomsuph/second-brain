import { getDocumentsByType } from '@/lib/documents';
import DocumentCard from '@/components/DocumentCard';

export default function JournalPage() {
  const docs = getDocumentsByType('journal');
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Journal</h1>
        <p className="text-[var(--text-muted)]">{docs.length} journal entries</p>
      </div>
      <div className="space-y-3">
        {docs.map((doc) => (
          <DocumentCard key={doc.slug} slug={doc.slug} title={doc.title} date={doc.date} type={doc.type} tags={doc.tags} excerpt={doc.content.slice(0, 150).replace(/[#*_\[\]]/g, '').trim()} />
        ))}
      </div>
    </div>
  );
}
