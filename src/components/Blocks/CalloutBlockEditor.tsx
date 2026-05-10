import { Input, Select } from 'antd'
import type { CalloutBlock } from '@/types/article'

interface Props {
  block: CalloutBlock
  onChange: (b: CalloutBlock) => void
}

export const CalloutBlockEditor = ({ block, onChange }: Props) => (
  <div className='space-y-2'>
    <Select
      value={block.data.variant}
      onChange={(variant) => onChange({ ...block, data: { ...block.data, variant } })}
      options={[
        { label: 'ℹ️ Info', value: 'info' },
        { label: '✅ Success', value: 'success' },
        { label: '⚠️ Warning', value: 'warning' },
      ]}
    />
    <Input
      placeholder='Tiêu đề (tuỳ chọn)'
      value={block.data.title}
      onChange={(e) => onChange({ ...block, data: { ...block.data, title: e.target.value } })}
    />
    <Input.TextArea
      rows={3}
      placeholder='Nội dung callout...'
      value={block.data.text}
      onChange={(e) => onChange({ ...block, data: { ...block.data, text: e.target.value } })}
    />
  </div>
)
