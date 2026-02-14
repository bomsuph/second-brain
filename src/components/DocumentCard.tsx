import Link from 'next/link';
import TagPill from './TagPill';

interface Props {
  slug: string;
  title: string;
  date: string;
  type: string;
  tags: string[];
  excerpt?: string;
}

const typeColors: Record<string, string> = {
  concept: 'bg-blue-500/10 text-blue-400',
  journal: 'bg-green-500/10 text-green-400',
  project: 'bg-purple-500/10 text-purple-400',
};

export default function DocumentCard({ slug, title, date, type, tags, excerpt }: Props) {
  return (
    <Link
      href={`/doc/${slug}`}
      className="block p-5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--bg-hover)] transition-all group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${typeColors[type] || 'bg-gray-500/10 text-gray-400'}`}>
          {type}
        </span>
        {date && <span className="text-xs text-[var(--text-muted)]">{date}</span>}
      </div>
      <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
        {title}
      </h3>
      {excerpt && (
        <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">{excerpt}</p>
      )}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => <TagPill key={tag} tag={tag} />)}
        </div>
      )}
    </Link>
  );
}
