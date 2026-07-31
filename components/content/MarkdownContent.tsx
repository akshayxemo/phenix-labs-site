import Image from 'next/image'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
  className?: string
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 text-4xl font-bold leading-tight tracking-[-0.04em] text-[#111827] md:text-6xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="clear-both mb-5 pt-12 text-3xl font-bold tracking-[-0.03em] text-[#111827] md:text-4xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-2xl font-semibold text-[#111827]">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-3 mt-6 text-xl font-semibold text-[#111827]">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-lg leading-8 text-[#526071]">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#111827]">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-semibold text-[#1767d2] underline decoration-[#1767d2]/30 underline-offset-4 transition-colors hover:text-[#0f4fa8]"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-lg leading-8 text-[#526071]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg leading-8 text-[#526071]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-[20px] border-l-4 border-[#1767d2] bg-white px-7 py-6 shadow-sm [&>p:last-child]:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 clear-both border-[#cbd5df]" />,
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-[20px] border border-[#d7e0e8] bg-white">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-[#d7e0e8] bg-[#e2e9ef] px-5 py-4 text-sm font-semibold uppercase tracking-wider text-[#1d2738]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[#e5ebf0] px-5 py-4 text-base leading-7 text-[#526071] last:[tr:last-child_&]:border-b-0">
      {children}
    </td>
  ),
  code: ({ children }) => (
    <code className="rounded-md bg-[#dfe7ed] px-1.5 py-0.5 text-[0.9em] text-[#1d2738]">
      {children}
    </code>
  ),
  input: (props) => (
    <input
      {...props}
      className="mr-2 size-4 accent-[#1767d2]"
      disabled
    />
  ),
  img: ({ alt = '', src }) => {
    if (typeof src !== 'string' || !src) {
      return null
    }

    const side = alt.match(/^side-(left|right):\s*/i)?.[1]?.toLowerCase()
    const cleanAlt = alt.replace(/^side-(left|right):\s*/i, '')
    const baseClassName = 'h-auto object-cover'
    const className =
      side === 'left'
        ? `${baseClassName} my-2 w-full rounded-[20px] md:float-left md:mb-8 md:mr-10 md:max-w-[46%]`
        : side === 'right'
          ? `${baseClassName} my-2 w-full rounded-[20px] md:float-right md:mb-8 md:ml-10 md:max-w-[46%]`
          : `${baseClassName} my-10 w-full rounded-[20px]`

    return (
      <Image
        src={src}
        alt={cleanAlt}
        width={1400}
        height={900}
        sizes={
          side
            ? '(min-width: 768px) 46vw, 100vw'
            : '(min-width: 1200px) 1100px, 100vw'
        }
        className={className}
      />
    )
  },
}

export function MarkdownContent({
  content,
  className = '',
}: MarkdownContentProps) {
  return (
    <article className={`mx-auto max-w-[1100px] ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
