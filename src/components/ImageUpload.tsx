import { PictureOutlined, DeleteOutlined } from '@ant-design/icons'
import { message, Button } from 'antd'
import React from 'react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5

interface ImageUploadProps {
  value?: File
  onChange?: (file: File | undefined) => void
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>()

  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(undefined)
      return
    }
    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  const validate = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      message.error('Chỉ chấp nhận JPG, PNG, WEBP')
      return false
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      message.error(`Ảnh không được vượt quá ${MAX_SIZE_MB}MB`)
      return false
    }
    return true
  }

  const handleFile = (file: File) => {
    if (!validate(file)) return
    onChange?.(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleRemove = () => {
    onChange?.(undefined)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className='h-full w-full'>
      <input
        ref={inputRef}
        type='file'
        accept={ACCEPTED_TYPES.join(',')}
        className='hidden'
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />

      {previewUrl ? (
        <div className='relative h-full w-full rounded-lg border border-gray-200 overflow-hidden group bg-gray-50'>
          <img src={previewUrl} alt='preview' className='w-full h-full object-contain' />
          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
            <Button size='small' icon={<PictureOutlined />} onClick={() => inputRef.current?.click()}>
              Thay ảnh
            </Button>
            <Button size='small' danger icon={<DeleteOutlined />} onClick={handleRemove}>
              Xoá
            </Button>
          </div>
        </div>
      ) : (
        <div
          className='h-full w-full rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-500'
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <PictureOutlined className='text-2xl' />
          <span className='text-xs'>Kéo thả hoặc click để chọn ảnh</span>
          <span className='text-[11px]'>JPG, PNG, WEBP · Tối đa {MAX_SIZE_MB}MB</span>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
