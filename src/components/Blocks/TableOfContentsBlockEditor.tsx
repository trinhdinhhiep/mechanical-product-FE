import { useEffect } from 'react'
import { Button, Input } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import type { Block, HeadingBlock, TableOfContentsBlock } from '@/types/article'

interface Props {
  block: TableOfContentsBlock
  onChange: (b: TableOfContentsBlock) => void
  allBlocks: Block[]
}

export const TableOfContentsBlockEditor = ({ block, onChange, allBlocks }: Props) => {
  const items = block.data.items

  // Auto-sync mỗi khi heading blocks thay đổi
  useEffect(() => {
    const headings = allBlocks
      .filter((b): b is HeadingBlock => b.type === 'heading')
      .map((b) => ({ label: b.data.text, anchor: b.data.anchor }))

    // Chỉ update nếu thực sự thay đổi để tránh infinite loop
    const isDiff = JSON.stringify(headings) !== JSON.stringify(items)
    if (isDiff) onChange({ ...block, data: { items: headings } })
  }, [allBlocks, block, items, onChange])

  const updateItem = (i: number, field: 'label' | 'anchor', val: string) => {
    const next = [...items]
    next[i] = { ...next[i], [field]: val }
    onChange({ ...block, data: { items: next } })
  }

  const addItem = () => onChange({ ...block, data: { items: [...items, { label: '', anchor: '' }] } })
  const removeItem = (i: number) => onChange({ ...block, data: { items: items.filter((_, idx) => idx !== i) } })

  return (
    <div className='space-y-2'>
      {items.length === 0 && (
        <p className='text-xs text-gray-400'>Chưa có heading nào — thêm Heading block để tự động điền mục lục</p>
      )}
      {items.map((item, i) => (
        <div key={i} className='flex gap-2'>
          <Input placeholder='Label' value={item.label} onChange={(e) => updateItem(i, 'label', e.target.value)} />
          <Input
            placeholder='Anchor (#id)'
            value={item.anchor}
            onChange={(e) => updateItem(i, 'anchor', e.target.value)}
            className='w-40'
          />
          <Button danger icon={<DeleteOutlined />} onClick={() => removeItem(i)} />
        </div>
      ))}
      <Button size='small' icon={<PlusOutlined />} onClick={addItem}>
        Thêm mục
      </Button>
    </div>
  )
}
