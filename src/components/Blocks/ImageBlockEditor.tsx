import { Input } from 'antd'
import type { ImageBlock } from '@/types/article'
import ImageUpload from '@/components/ImageUpload'

interface Props {
  block: ImageBlock
  onChange: (b: ImageBlock) => void
}

export const ImageBlockEditor = ({ block, onChange }: Props) => {
  const handleFile = (file: File | undefined) => {
    if (!file) {
      onChange({ ...block, data: { ...block.data, src: '', _file: undefined } })
      return
    }
    // Chỉ lưu file local, KHÔNG upload
    onChange({ ...block, data: { ...block.data, _file: file, src: '' } })
  }

  // Preview: ưu tiên _file (local), fallback về src (url đã upload)
  const previewSrc = block.data._file ? URL.createObjectURL(block.data._file) : block.data.src

  return (
    <div className='space-y-2'>
      <ImageUpload value={block.data._file} onChange={handleFile} />
      {previewSrc && <img src={previewSrc} className='h-32 object-cover rounded border' alt='' />}
      <Input
        placeholder='Alt text'
        value={block.data.alt}
        onChange={(e) => onChange({ ...block, data: { ...block.data, alt: e.target.value } })}
      />
      <Input
        placeholder='Caption (tuỳ chọn)'
        value={block.data.caption}
        onChange={(e) => onChange({ ...block, data: { ...block.data, caption: e.target.value } })}
      />
    </div>
  )
}
