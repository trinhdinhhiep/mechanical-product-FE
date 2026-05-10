import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons'
import { useCreateCategoryMutation, type CreateCategoryPayload } from '@/services/productsApi'
import ImageUpload from '@/components/ImageUpload'
import FeatureInput, { FeatureItem } from '@/components/FeatureInput'
import { useUploadProductImageMutation } from '@/services/uploadApi'

const { TextArea } = Input

interface CategoryFormValues {
  name: string
  slug: string
  subtitle: string
  banner_image?: File
  description_image?: File
  description_text: string
  features: FeatureItem[]
}

const Section = ({ index, label, children }: { index: string; label: string; children: React.ReactNode }) => (
  <div className='px-6 py-5 border-b last:border-none'>
    <p className='text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4'>
      {index} · {label}
    </p>
    {children}
  </div>
)

const AddCategory = () => {
  const [form] = Form.useForm<CategoryFormValues>()
  const [lineCount, setLineCount] = useState(0)

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadProductImageMutation()

  const isLoading = isCreating || isUploading

  const resetForm = () => {
    form.resetFields()
    setLineCount(0)
  }

  const autoSlug = (value: string) => {
    const slug = value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    form.setFieldValue('slug', slug)
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    const { url } = await uploadImage(formData).unwrap()
    return url
  }

  const onFinish = async (values: CategoryFormValues) => {
    try {
      const [bannerUrl, descriptionImageUrl] = await Promise.all([
        uploadFile(values.banner_image as File),
        uploadFile(values.description_image as File),
      ])

      const payload: CreateCategoryPayload = {
        name: values.name,
        slug: values.slug,
        subtitle: values.subtitle,
        banner_image: bannerUrl,
        description_image: descriptionImageUrl,
        description_text: (values.description_text || '').split('\n').filter((line) => line.trim() !== ''),
        features: values.features ?? [],
      }

      await createCategory(payload).unwrap()
      message.success('Thêm danh mục thành công!')
      resetForm()
    } catch {
      message.error('Lỗi khi tạo danh mục')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-xl font-semibold text-gray-800 mb-6'>Thêm Danh Mục Mới</h1>

        <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
          <Form form={form} layout='vertical' onFinish={onFinish} requiredMark='optional'>
            <Section index='01' label='Định danh'>
              <div className='grid grid-cols-2 gap-4'>
                <Form.Item
                  label='Tên Danh Mục'
                  name='name'
                  rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
                  className='mb-0'
                >
                  <Input placeholder='Bình Chữa Cháy' onChange={(e) => autoSlug(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label='Slug'
                  name='slug'
                  rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
                  className='mb-0'
                >
                  <Input placeholder='binh-chua-chay' />
                </Form.Item>
              </div>
            </Section>

            <Section index='02' label='Nội dung'>
              <div className='flex flex-col gap-4'>
                <Form.Item
                  label='Subtitle'
                  name='subtitle'
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                  className='mb-0'
                >
                  <Input placeholder='Thiết bị phòng cháy chữa cháy chuyên dụng' />
                </Form.Item>

                <div className='grid grid-cols-2 gap-4'>
                  <Form.Item
                    label='Banner Image'
                    name='banner_image'
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh banner' }]}
                    className='mb-0'
                  >
                    <ImageUpload />
                  </Form.Item>

                  <Form.Item
                    label='Description Image'
                    name='description_image'
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh mô tả' }]}
                    className='mb-0'
                  >
                    <ImageUpload />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    label='Mô Tả (mỗi dòng 1 ý)'
                    name='description_text'
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    className='mb-0'
                  >
                    <TextArea
                      rows={5}
                      placeholder={'Thiết kế thông minh\nNguồn gốc rõ ràng\nChứng nhận quốc tế'}
                      onChange={(e) => setLineCount(e.target.value.split('\n').filter((l) => l.trim()).length)}
                    />
                  </Form.Item>
                  <p className='text-right text-xs text-gray-400 mt-1'>{lineCount} dòng</p>
                </div>
              </div>
            </Section>

            <Section index='03' label='Features'>
              <Form.Item
                name='features'
                initialValue={[]}
                rules={[{ required: true, message: 'Vui lòng nhập tính năng' }]}
                className='mb-0'
              >
                <FeatureInput />
              </Form.Item>
            </Section>

            <div className='px-6 py-4 bg-gray-50 flex gap-3'>
              <Button icon={<ReloadOutlined />} onClick={resetForm} disabled={isLoading}>
                Đặt lại
              </Button>
              <Button type='primary' htmlType='submit' icon={<SaveOutlined />} loading={isLoading} className='flex-1'>
                {isUploading ? 'Đang upload ảnh...' : isCreating ? 'Đang lưu...' : 'Lưu Danh Mục'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddCategory
