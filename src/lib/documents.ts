import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BRAIN_PATH = process.env.BRAIN_PATH || path.join(process.cwd(), '..', '..', 'brain', 'documents');

export interface Document {
  slug: string;
  title: string;
  date: string;
  type: 'concept' | 'journal' | 'project';
  tags: string[];
  related: string[];
  content: string;
  category: string;
}

function getFilesRecursively(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath, baseDir));
    } else if (entry.name.endsWith('.md')) {
      files.push(path.relative(baseDir, fullPath));
    }
  }
  return files;
}

export function getAllDocuments(): Document[] {
  const files = getFilesRecursively(BRAIN_PATH);
  return files.map((relativePath) => {
    const fullPath = path.join(BRAIN_PATH, relativePath);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = relativePath.replace(/\.md$/, '');
    const category = slug.split('/')[0] || 'uncategorized';
    return {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date).split('T')[0] : '',
      type: data.type || category,
      tags: data.tags || [],
      related: data.related || [],
      content,
      category,
    };
  }).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getDocumentBySlug(slug: string): Document | undefined {
  const docs = getAllDocuments();
  return docs.find((d) => d.slug === slug);
}

export function getDocumentsByType(type: string): Document[] {
  return getAllDocuments().filter((d) => d.category === type || d.type === type);
}

export function getDocumentsByTag(tag: string): Document[] {
  return getAllDocuments().filter((d) => d.tags.includes(tag));
}

export function getAllTags(): { tag: string; count: number }[] {
  const docs = getAllDocuments();
  const tagMap: Record<string, number> = {};
  docs.forEach((d) => d.tags.forEach((t) => { tagMap[t] = (tagMap[t] || 0) + 1; }));
  return Object.entries(tagMap)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
