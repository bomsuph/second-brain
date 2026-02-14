'use client'

import { useEffect, useRef } from 'react'
import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: false })

export default function MarkdownContent({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = marked.parse(content) as string
    }
  }, [content])

  return <div ref={ref} className="prose" />
}
