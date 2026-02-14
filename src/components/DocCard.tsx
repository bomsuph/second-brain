import Link from 'next/link'

interface DocCardProps {
  slug: string
  title: string
  date: string
  type: string
  tags: string[]
  excerpt: string
}

const typeColors = {
  concept: 'bg-concept/10 text-concept',
  journal: 'bg-journal/10 text-journal',
  project: 'bg-project/10 text-project',
}

export default function DocCard({ slug, title, date, type, tags, excerpt }: DocCardProps) {
  return (
    <Link href={`/doc/${slug}`} className="group block">
      <article className="p-5 bg-bg-surface border border-border rounded-xl hover:border-accent/30 hover:bg-bg-hover transition-all">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${typeColors[type as keyof typeof typeColors] || 'bg-tag-bg text-tag-text'}`}>
            {type}
          </span>
          {date && <span className="text-xs text-text-muted">{date}</span>}
        </div>
        <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2 mb-3">{excerpt}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 bg-tag-bg text-tag-text rounded-full">
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-[11px] text-text-muted">+{tags.length - 4}</span>
            )}
          </div>
        )}
      </article>
    </Link>
  )
}
