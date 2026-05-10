import { Button, Input, Select } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ListBlock } from '@/types/article'

interface Props {
  block: ListBlock
  onChange: (b: ListBlock) => void
}

export const ListBlockEditor = ({ block, onChange }: Props) => {
  const { style, items } = block.data

  const updateItem = (i: number, val: string) => {
    const next = [...items]
    next[i] = val
    onChange({ ...block, data: { ...block.data, items: next } })
  }
  const addItem = () => onChange({ ...block, data: { ...block.data, items: [...items, ''] } })
  const removeItem = (i: number) =>
    onChange({ ...block, data: { ...block.data, items: items.filter((_, idx) => idx !== i) } })

  return (
    <div className='space-y-2'>
      <Select
        value={style}
        onChange={(s) => onChange({ ...block, data: { ...block.data, style: s } })}
        options={[
          { label: 'Unordered (•)', value: 'unordered' },
          { label: 'Ordered (1.)', value: 'ordered' },
        ]}
      />
      {items.map((item, i) => (
        <div key={i} className='flex gap-2'>
          <span className='text-gray-400 pt-1 text-sm'>{style === 'ordered' ? `${i + 1}.` : '•'}</span>
          <Input value={item} onChange={(e) => updateItem(i, e.target.value)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => removeItem(i)} />
        </div>
      ))}
      <Button size='small' icon={<PlusOutlined />} onClick={addItem}>
        Thêm mục
      </Button>
    </div>
  )
}
