import Link from 'next/link';

export default function TagPill({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="inline-block px-2.5 py-1 text-xs font-medium bg-[var(--tag-bg)] text-[var(--tag-text)] rounded-full hover:bg-[var(--accent)]/20 transition-colors"
    >
      #{tag}
    </Link>
  );
}
