import React, { useCallback } from 'react'
import { Button, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { Block } from '@/types/article'
import { BlockItem } from './BlockItem'

interface Props {
  value: Block[]
  onChange: (blocks: Block[]) => void
}

const BLOCK_OPTIONS = [
  { label: '📝 Paragraph', value: 'paragraph' },
  { label: '📌 Heading', value: 'heading' },
  { label: '🖼️ Image', value: 'image' },
  { label: '🖼️ Image Gallery', value: 'image_gallery' },
  { label: '🎬 Video', value: 'video' },
  { label: '📋 Table of Contents', value: 'table_of_contents' },
  { label: '📊 Table', value: 'table' },
  { label: '📃 List', value: 'list' },
  { label: '💡 Callout', value: 'callout' },
  { label: '➖ Divider', value: 'divider' },
]

const createDefaultBlock = (type: Block['type']): Block => {
  switch (type) {
    case 'paragraph':
      return { type, data: { text: '' } }
    case 'heading':
      return { type, data: { level: 2, text: '', anchor: '' } }
    case 'image':
      return { type, data: { src: '', alt: '', caption: '' } }
    case 'image_gallery':
      return { type, data: { images: [] } }
    case 'video':
      return { type, data: { url: '', caption: '' } }
    case 'table_of_contents':
      return { type, data: { items: [] } }
    case 'table':
      return { type, data: { caption: '', columns: ['Cột 1', 'Cột 2'], rows: [['', '']] } }
    case 'list':
      return { type, data: { style: 'unordered', items: [''] } }
    case 'callout':
      return { type, data: { variant: 'info', title: '', text: '' } }
    case 'divider':
      return { type, data: {} }
  }
}

export const BlockEditor = ({ value, onChange }: Props) => {
  const [addType, setAddType] = React.useState<Block['type']>('paragraph')

  const addBlock = useCallback(() => {
    onChange([...value, createDefaultBlock(addType)])
  }, [value, onChange, addType])

  const updateBlock = useCallback(
    (index: number, block: Block) => {
      const next = [...value]
      next[index] = block
      onChange(next)
    },
    [value, onChange],
  )

  const removeBlock = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index))
    },
    [value, onChange],
  )

  const moveBlock = useCallback(
    (from: number, to: number) => {
      if (to < 0 || to >= value.length) return
      const next = [...value]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      onChange(next)
    },
    [value, onChange],
  )

  return (
    <div className='space-y-3'>
      {value.map((block, index) => (
        <BlockItem
          key={index}
          index={index}
          block={block}
          total={value.length}
          allBlocks={value} // thêm
          onChange={(b: Block) => updateBlock(index, b)}
          onRemove={() => removeBlock(index)}
          onMoveUp={() => moveBlock(index, index - 1)}
          onMoveDown={() => moveBlock(index, index + 1)}
        />
      ))}

      {/* Add block bar */}
      <div className='flex items-center gap-2 pt-2'>
        <Select value={addType} onChange={setAddType} options={BLOCK_OPTIONS} className='flex-1' />
        <Button type='dashed' icon={<PlusOutlined />} onClick={addBlock}>
          Thêm block
        </Button>
      </div>
    </div>
  )
}
