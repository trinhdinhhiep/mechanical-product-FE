import { useState } from 'react'
import { Form, Input, Button, Select, DatePicker, message } from 'antd'
import type { ArticleFormValues, CreateArticlePayload, Block } from '@/types/article'
import ImageUpload from '@/components/ImageUpload'
import { BlockEditor } from '@/components/Blocks/BlockEditor'
import { useUploadArticleImageMutation } from '@/services/uploadApi'
import { useCreateArticleMutation } from '@/services/newsApi'

const CATEGORIES = ['Tin tức', 'Sản phẩm', 'Thông báo']

const AddArticle = () => {
  const [form] = Form.useForm<ArticleFormValues>()
  const [blocks, setBlocks] = useState<Block[]>([])
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>()

  const [uploadImage] = useUploadArticleImageMutation()
  const [createArticle, { isLoading }] = useCreateArticleMutation()

  const handleSubmit = async (values: ArticleFormValues) => {
    if (!thumbnailFile) {
      message.error('Vui lòng chọn thumbnail')
      return
    }
    if (blocks.length === 0) {
      message.error('Vui lòng thêm ít nhất 1 block nội dung')
      return
    }

    try {
      // 1. Upload thumbnail
      const fd = new FormData()
      fd.append('file', thumbnailFile)
      const { url: thumbnailUrl } = await uploadImage(fd).unwrap()

      // 2. Upload tất cả image blocks có _file
      const resolvedBlocks = await Promise.all(
        blocks.map(async (block) => {
          if (block.type === 'image' && block.data._file) {
            const fd = new FormData()
            fd.append('file', block.data._file)
            const { url } = await uploadImage(fd).unwrap()
            // Strip _file khỏi payload gửi lên server
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _file, ...cleanData } = { ...block.data, src: url }
            return { ...block, data: cleanData }
          }
          if (block.type === 'image_gallery') {
            const images = await Promise.all(
              block.data.images.map(async (img) => {
                if (!img._file) return img
                const fd = new FormData()
                fd.append('file', img._file)
                const { url } = await uploadImage(fd).unwrap()
                return { src: url, alt: img.alt, caption: img.caption } // strip _file
              }),
            )
            return { ...block, data: { images } }
          }
          return block
        }),
      )

      // 3. Build payload
      const payload: CreateArticlePayload = {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        thumbnail: thumbnailUrl,
        category: values.category,
        tags: values.tags
          ? values.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        author: values.author,
        content: resolvedBlocks,
        published_at: values.published_at.toISOString(),
      }

      await createArticle(payload).unwrap()
      message.success('Tạo bài viết thành công!')
      form.resetFields()
      setBlocks([])
      setThumbnailFile(undefined)
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    form.setFieldValue('slug', slug)
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Tạo bài viết mới</h1>

      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        {/* ── Meta info ──────────────────────────────────── */}
        <div className='bg-white rounded-xl border border-gray-100 p-6 mb-4 space-y-4'>
          <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4'>Thông tin bài viết</h2>

          <Form.Item label='Tiêu đề' name='title' rules={[{ required: true, message: 'Nhập tiêu đề' }]}>
            <Input placeholder='Tiêu đề bài viết...' onChange={handleTitleChange} />
          </Form.Item>

          <Form.Item label='Slug' name='slug' rules={[{ required: true }]}>
            <Input placeholder='ten-bai-viet' addonBefore='/' />
          </Form.Item>

          <Form.Item label='Tóm tắt' name='excerpt' rules={[{ required: true }]}>
            <Input.TextArea rows={2} placeholder='Mô tả ngắn về bài viết...' />
          </Form.Item>

          <div className='grid grid-cols-2 gap-4'>
            <Form.Item label='Danh mục' name='category' rules={[{ required: true }]}>
              <Select placeholder='Chọn danh mục' options={CATEGORIES.map((c) => ({ label: c, value: c }))} />
            </Form.Item>

            <Form.Item label='Tác giả' name='author' rules={[{ required: true }]}>
              <Input placeholder='Tên tác giả' />
            </Form.Item>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <Form.Item label='Tags' name='tags'>
              <Input placeholder='tag1, tag2, tag3 (cách nhau bằng dấu phẩy)' />
            </Form.Item>

            <Form.Item label='Ngày đăng' name='published_at' rules={[{ required: true }]}>
              <DatePicker className='w-full' format='DD/MM/YYYY' />
            </Form.Item>
          </div>

          <Form.Item label='Thumbnail'>
            <ImageUpload value={thumbnailFile} onChange={setThumbnailFile} />
          </Form.Item>
        </div>

        {/* ── Block editor ───────────────────────────────── */}
        <div className='bg-white rounded-xl border border-gray-100 p-6 mb-6'>
          <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4'>Nội dung</h2>
          <BlockEditor value={blocks} onChange={setBlocks} />
        </div>

        <div className='flex justify-end gap-3'>
          <Button
            onClick={() => {
              form.resetFields()
              setBlocks([])
              setThumbnailFile(undefined)
            }}
          >
            Huỷ
          </Button>
          <Button type='primary' htmlType='submit' loading={isLoading} className='bg-red-600 hover:bg-red-700'>
            Đăng bài
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default AddArticle
