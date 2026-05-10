import type { ImageGalleryBlock } from '@/types/article'
import ImageUpload from '@/components/ImageUpload'

interface Props {
  block: ImageGalleryBlock
  onChange: (b: ImageGalleryBlock) => void
}

export const ImageGalleryBlockEditor = ({ block, onChange }: Props) => {
  const handleChange = (index: number, file: File | undefined) => {
    const images = [...block.data.images]
    if (!file) {
      URL.revokeObjectURL(images[index].src)
      images.splice(index, 1)
    } else {
      if (images[index]?._file) URL.revokeObjectURL(images[index].src)
      images[index] = { src: URL.createObjectURL(file), alt: '', caption: '', _file: file }
    }
    onChange({ ...block, data: { images } })
  }

  const handleAdd = (file: File | undefined) => {
    if (!file) return
    onChange({
      ...block,
      data: {
        images: [...block.data.images, { src: URL.createObjectURL(file), alt: '', caption: '', _file: file }],
      },
    })
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {block.data.images.map((img, i) => (
        <div key={i} className='w-50 h-40 shrink-0 overflow-hidden'>
          <ImageUpload value={img._file} onChange={(file) => handleChange(i, file)} />
        </div>
      ))}

      <div className='w-50 h-40 shrink-0 overflow-hidden'>
        <ImageUpload value={undefined} onChange={handleAdd} />
      </div>
    </div>
  )
}
