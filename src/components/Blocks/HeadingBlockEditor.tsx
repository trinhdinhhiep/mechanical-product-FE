import { Input, Select } from 'antd'
import type { HeadingBlock } from '@/types/article'

interface Props {
  block: HeadingBlock
  onChange: (b: HeadingBlock) => void
}

export const HeadingBlockEditor = ({ block, onChange }: Props) => (
  <div className='flex gap-2'>
    <Select
      value={block.data.level}
      onChange={(level) => onChange({ ...block, data: { ...block.data, level } })}
      options={[
        { label: 'H2', value: 2 },
        { label: 'H3', value: 3 },
      ]}
      className='w-20'
    />
    <Input
      value={block.data.text}
      placeholder='Tiêu đề...'
      onChange={(e) => {
        const text = e.target.value
        const anchor = text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
        onChange({ ...block, data: { ...block.data, text, anchor } })
      }}
      className='flex-1'
    />
  </div>
)
