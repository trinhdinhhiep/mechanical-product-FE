import { Input } from 'antd'
import type { ParagraphBlock } from '@/types/article'

interface Props {
  block: ParagraphBlock
  onChange: (b: ParagraphBlock) => void
}

export const ParagraphBlockEditor = ({ block, onChange }: Props) => (
  <Input.TextArea
    rows={4}
    value={block.data.text}
    placeholder='Nội dung đoạn văn...'
    onChange={(e) => onChange({ ...block, data: { text: e.target.value } })}
  />
)
