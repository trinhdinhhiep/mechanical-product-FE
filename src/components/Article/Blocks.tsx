import React, { useState } from 'react'
import { Table } from 'antd'
import type {
  ParagraphBlock,
  HeadingBlock,
  ImageBlock,
  ImageGalleryBlock,
  VideoBlock,
  TableOfContentsBlock,
  TableBlock,
  ListBlock,
  CalloutBlock,
} from '@/types/article'

// ─── Paragraph ───────────────────────────────────────────────
export function ParagraphBlockComponent({ data }: { data: ParagraphBlock['data'] }) {
  return <p className='text-gray-700 leading-relaxed text-[15px]'>{data.text}</p>
}

// ─── Heading ─────────────────────────────────────────────────
export function HeadingBlockComponent({ data }: { data: HeadingBlock['data'] }) {
  const base = 'font-bold text-gray-900 scroll-mt-24 flex items-center gap-3 group'
  const sizeMap = {
    2: 'text-xl md:text-2xl mt-10 mb-4 border-l-4 border-red-600 pl-4',
    3: 'text-lg md:text-xl mt-7 mb-3 pl-4',
  }

  return React.createElement(
    `h${data.level}`,
    { id: data.anchor, className: `${base} ${sizeMap[data.level]}` },
    <>
      {data.text}
      <a
        href={`#${data.anchor}`}
        className='opacity-0 group-hover:opacity-40 text-gray-400 text-base font-normal transition-opacity'
        aria-label='link tới mục này'
      >
        #
      </a>
    </>,
  )
}

// ─── Image ───────────────────────────────────────────────────
export function ImageBlockComponent({ data }: { data: ImageBlock['data'] }) {
  const [error, setError] = useState(false)
  return (
    <figure className='my-4'>
      <div className='rounded-xl overflow-hidden bg-gray-100 border border-gray-200'>
        <img
          src={error ? `https://picsum.photos/seed/${encodeURIComponent(data.alt)}/900/500` : data.src}
          alt={data.alt}
          className='w-full object-cover max-h-[480px]'
          onError={() => setError(true)}
        />
      </div>
      {data.caption && (
        <figcaption className='text-center text-xs text-gray-400 mt-2 italic'>{data.caption}</figcaption>
      )}
    </figure>
  )
}

// ─── Image Gallery ───────────────────────────────────────────
export function ImageGalleryBlockComponent({ data }: { data: ImageGalleryBlock['data'] }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [errors, setErrors] = useState<Record<number, boolean>>({})

  const handleError = (i: number) => setErrors((prev) => ({ ...prev, [i]: true }))

  const getSrc = (img: { src: string; alt: string }, i: number) =>
    errors[i] ? `https://picsum.photos/seed/${i + 10}/600/400` : img.src

  const cols =
    data.images.length === 1
      ? 'grid-cols-1'
      : data.images.length === 2
        ? 'grid-cols-2'
        : data.images.length === 3
          ? 'grid-cols-3'
          : 'grid-cols-2 md:grid-cols-4'

  return (
    <div className='my-4'>
      <div className={`grid ${cols} gap-2`}>
        {data.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className='relative group overflow-hidden rounded-lg bg-gray-100 border border-gray-200 aspect-[4/3] cursor-zoom-in'
          >
            <img
              src={getSrc(img, i)}
              alt={img.alt}
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
              onError={() => handleError(i)}
            />
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end'>
              {img.caption && (
                <span className='text-white text-[11px] px-2 py-1 bg-black/50 w-full opacity-0 group-hover:opacity-100 transition-opacity line-clamp-1'>
                  {img.caption}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
          onClick={() => setSelected(null)}
        >
          <div className='relative max-w-4xl w-full' onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className='absolute -top-10 right-0 text-white/70 hover:text-white text-2xl'
            >
              ✕
            </button>
            <button
              onClick={() => setSelected((s) => (s! > 0 ? s! - 1 : data.images.length - 1))}
              className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/70 hover:text-white text-3xl px-2'
            >
              ‹
            </button>
            <img
              src={getSrc(data.images[selected], selected)}
              alt={data.images[selected].alt}
              className='w-full rounded-lg max-h-[80vh] object-contain'
            />
            {data.images[selected].caption && (
              <p className='text-center text-white/60 text-sm mt-3'>{data.images[selected].caption}</p>
            )}
            <button
              onClick={() => setSelected((s) => (s! < data.images.length - 1 ? s! + 1 : 0))}
              className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/70 hover:text-white text-3xl px-2'
            >
              ›
            </button>
            <div className='flex justify-center gap-1.5 mt-4'>
              {data.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === selected ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Video ───────────────────────────────────────────────────
export function VideoBlockComponent({ data }: { data: VideoBlock['data'] }) {
  const getEmbedUrl = (url: string) => {
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
    return url
  }

  return (
    <figure className='my-4'>
      <div className='aspect-video rounded-xl overflow-hidden bg-gray-900 border border-gray-200 shadow-sm'>
        <iframe
          src={getEmbedUrl(data.url)}
          title={data.caption ?? 'Video'}
          className='w-full h-full'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
      {data.caption && (
        <figcaption className='text-center text-xs text-gray-400 mt-2 italic'>{data.caption}</figcaption>
      )}
    </figure>
  )
}

// ─── Table of Contents ───────────────────────────────────────
export function TableOfContentsBlockComponent({ data }: { data: TableOfContentsBlock['data'] }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault()
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className='bg-gray-50 border border-gray-200 rounded-xl p-5 my-6'>
      <p className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3'>Mục lục</p>
      <ol className='space-y-1.5 list-none m-0 p-0'>
        {data.items.map((item, i) => (
          <li key={item.anchor} className='flex items-baseline gap-2'>
            <span className='text-xs text-red-500 font-mono tabular-nums w-4 shrink-0'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <a
              href={`#${item.anchor}`}
              onClick={(e) => handleClick(e, item.anchor)}
              className='text-[14px] text-gray-600 hover:text-red-600 hover:underline underline-offset-2 transition-colors'
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ─── Table ───────────────────────────────────────────────────
export function TableBlockComponent({ data }: { data: TableBlock['data'] }) {
  const columns = data.columns.map((col, i) => ({
    title: col,
    dataIndex: String(i),
    key: String(i),
    className: i === 0 ? 'font-medium text-gray-700 bg-gray-50' : 'text-gray-600',
  }))
  const dataSource = data.rows.map((row, i) => ({
    key: i,
    ...Object.fromEntries(row.map((cell, j) => [String(j), cell])),
  }))

  return (
    <div className='my-4 overflow-x-auto rounded-xl border border-gray-200 shadow-sm'>
      {data.caption && <p className='text-xs text-gray-400 text-center px-4 pt-3 italic'>{data.caption}</p>}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size='small'
        className='article-table'
        bordered={false}
      />
    </div>
  )
}

// ─── List ────────────────────────────────────────────────────
export function ListBlockComponent({ data }: { data: ListBlock['data'] }) {
  const Tag = data.style === 'ordered' ? 'ol' : 'ul'
  return (
    <Tag
      className={`my-3 pl-5 space-y-2 text-[15px] text-gray-700 ${
        data.style === 'ordered' ? 'list-decimal' : 'list-none'
      }`}
    >
      {data.items.map((item, i) => (
        <li key={i} className='flex items-start gap-2 leading-relaxed'>
          {data.style === 'unordered' && <span className='mt-[6px] w-1.5 h-1.5 rounded-full bg-red-500 shrink-0' />}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  )
}

// ─── Callout ─────────────────────────────────────────────────
const calloutConfig = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'ℹ️',
    titleColor: 'text-blue-800',
    textColor: 'text-blue-700',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '✅',
    titleColor: 'text-green-800',
    textColor: 'text-green-700',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '⚠️',
    titleColor: 'text-amber-800',
    textColor: 'text-amber-700',
  },
}

export function CalloutBlockComponent({ data }: { data: CalloutBlock['data'] }) {
  const cfg = calloutConfig[data.variant]
  return (
    <div className={`my-4 rounded-xl border ${cfg.bg} ${cfg.border} p-4`}>
      <div className='flex gap-3'>
        <span className='text-xl shrink-0 mt-0.5'>{cfg.icon}</span>
        <div>
          {data.title && <p className={`font-semibold text-sm mb-1 ${cfg.titleColor}`}>{data.title}</p>}
          <p className={`text-sm leading-relaxed whitespace-pre-line ${cfg.textColor}`}>{data.text}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Divider ─────────────────────────────────────────────────
export function DividerBlockComponent() {
  return <hr className='my-8 border-gray-200' />
}
