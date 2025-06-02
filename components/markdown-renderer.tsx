"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"
import { CopyCodeButton } from "./copy-code-button"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("markdown-content text-sm text-gray-700 dark:text-gray-300", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ node, ...props }) => (
            <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mt-4 mb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mt-3 mb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-base font-semibold text-emerald-800 dark:text-emerald-300 mt-2 mb-1" {...props} />
          ),

          // Paragraph
          p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,

          // Bold text
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-emerald-900 dark:text-emerald-100" {...props} />
          ),

          // Italic text
          em: ({ node, ...props }) => <em className="italic text-emerald-700 dark:text-emerald-400" {...props} />,

          // Links
          a: ({ node, href, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              {...props}
            />
          ),

          // Lists
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
          li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,

          // Inline code and code blocks
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "")
            const codeString = String(children).replace(/\n$/, "")

            if (!inline && match) {
              return (
                <div className="my-3 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs text-gray-600 dark:text-gray-400 font-mono border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span>{match[1]}</span>
                    <CopyCodeButton code={codeString} />
                  </div>
                  <pre className="p-4 overflow-x-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm">
                    <code className="font-mono">{codeString}</code>
                  </pre>
                </div>
              )
            }

            return (
              <code
                className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            )
          },

          // Block quotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-emerald-200 dark:border-emerald-800 pl-4 my-3 italic text-gray-600 dark:text-gray-400"
              {...props}
            />
          ),

          // Horizontal rule
          hr: () => <hr className="my-4 border-emerald-200 dark:border-emerald-800" />,

          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3">
              <table className="min-w-full border border-emerald-200 dark:border-emerald-800 rounded-md" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-emerald-50 dark:bg-emerald-900/30" {...props} />,
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-emerald-100 dark:divide-emerald-800/50" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="border-b border-emerald-100 dark:border-emerald-800/50" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-3 py-2 text-left text-xs font-medium text-emerald-800 dark:text-emerald-300 uppercase tracking-wider"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-3 py-2 border-r last:border-r-0 border-emerald-100 dark:border-emerald-800/50"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
