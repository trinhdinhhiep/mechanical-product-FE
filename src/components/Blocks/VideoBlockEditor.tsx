import { Input } from 'antd'
import type { VideoBlock } from '@/types/article'

interface Props {
  block: VideoBlock
  onChange: (b: VideoBlock) => void
}

export const VideoBlockEditor = ({ block, onChange }: Props) => (
  <div className='space-y-2'>
    <Input
      placeholder='URL video (YouTube, Vimeo...)'
      value={block.data.url}
      onChange={(e) => onChange({ ...block, data: { ...block.data, url: e.target.value } })}
    />
    <Input
      placeholder='Caption (tuỳ chọn)'
      value={block.data.caption}
      onChange={(e) => onChange({ ...block, data: { ...block.data, caption: e.target.value } })}
    />
  </div>
)
