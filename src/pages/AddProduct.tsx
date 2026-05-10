import React, { useState } from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import { SaveOutlined, ReloadOutlined, AppstoreOutlined, BarcodeOutlined, LinkOutlined } from '@ant-design/icons'
import { useGetAllCategoriesQuery, useCreateProductMutation, type CreateProductPayload } from '@/services/productsApi'
import ImageUpload from '@/components/ImageUpload'
import { useUploadProductImageMutation } from '@/services/uploadApi'

const { TextArea } = Input

interface ProductFormValues {
  category_id: string
  code: string
  title: string
  slug: string
  image?: File
  description_image?: File
  link: string
  specs: string
  points: string
  desc_detail: string
  desc_text: string
}

const Section = ({ index, label, children }: { index: string; label: string; children: React.ReactNode }) => (
  <div className='px-6 py-5 border-b last:border-none'>
    <p className='text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4'>
      {index} · {label}
    </p>
    {children}
  </div>
)

const AddProduct = () => {
  const [form] = Form.useForm<ProductFormValues>()
  const [specCount, setSpecCount] = useState(0)
  const [pointCount, setPointCount] = useState(0)
  const [descDetailCount, setDescDetailCount] = useState(0)
  const [descTextCount, setDescTextCount] = useState(0)

  const { data: categories = [] } = useGetAllCategoriesQuery()
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadProductImageMutation()

  const isLoading = isCreating || isUploading

  const resetForm = () => {
    form.resetFields()
    setSpecCount(0)
    setPointCount(0)
    setDescDetailCount(0)
    setDescTextCount(0)
  }

  const generateLink = (categoryId?: string, slug?: string) => {
    const category = categories.find((c) => c.id === categoryId)
    if (category?.slug && slug) {
      form.setFieldValue('link', `/product/${category.slug}/${slug}`)
    }
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
    generateLink(form.getFieldValue('category_id'), slug)
  }

  const onFinish = async (values: ProductFormValues) => {
    try {
      const [imageResult, descImageResult] = await Promise.all([
        uploadImage(
          (() => {
            const f = new FormData()
            f.append('file', values.image as File)
            return f
          })(),
        ).unwrap(),
        uploadImage(
          (() => {
            const f = new FormData()
            f.append('file', values.description_image as File)
            return f
          })(),
        ).unwrap(),
      ])

      const payload: CreateProductPayload = {
        title: values.title,
        slug: values.slug,
        image: imageResult.url,
        description_image: descImageResult.url,
        link: values.link,
        category_id: values.category_id,
        specs: (values.specs || '').split('\n').filter((s) => s.trim() !== ''),
        detail: {
          code: values.code,
          points: (values.points || '').split('\n').filter((p) => p.trim() !== ''),
          description_text: (values.desc_text || '').split('\n').filter((s) => s.trim() !== ''),
        },
      }

      await createProduct(payload).unwrap()
      message.success('Thêm sản phẩm thành công!')
      resetForm()
    } catch {
      message.error('Lỗi khi tạo sản phẩm')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-xl font-semibold text-gray-800 mb-6'>Thêm Sản Phẩm Mới</h1>

        <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
          <Form form={form} layout='vertical' onFinish={onFinish} requiredMark='optional'>
            <Section index='01' label='Phân loại & Mã sản phẩm'>
              <div className='grid grid-cols-2 gap-4'>
                <Form.Item
                  label='Danh Mục'
                  name='category_id'
                  rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                  className='mb-0'
                >
                  <Select
                    placeholder='Chọn một danh mục...'
                    suffixIcon={<AppstoreOutlined />}
                    onChange={(val) => generateLink(val, form.getFieldValue('slug'))}
                  >
                    {categories.map((cat) => (
                      <Select.Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label='Mã Sản Phẩm'
                  name='code'
                  rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}
                  className='mb-0'
                >
                  <Input prefix={<BarcodeOutlined className='text-gray-400' />} placeholder='BCC-ABC-4' />
                </Form.Item>
              </div>
            </Section>

            <Section index='02' label='Thông tin cơ bản'>
              <div className='flex flex-col gap-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <Form.Item
                    label='Tên Sản Phẩm'
                    name='title'
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                    className='mb-0'
                  >
                    <Input placeholder='Máy khoan đa năng XYZ-2000' onChange={(e) => autoSlug(e.target.value)} />
                  </Form.Item>

                  <Form.Item
                    label='Slug'
                    name='slug'
                    rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
                    className='mb-0'
                  >
                    <Input
                      placeholder='may-khoan-da-nang-xyz-2000'
                      onChange={(e) => generateLink(form.getFieldValue('category_id'), e.target.value)}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label='Link'
                  name='link'
                  rules={[{ required: true, message: 'Vui lòng nhập link' }]}
                  className='mb-0'
                  extra='Tự generate từ danh mục + slug, có thể sửa tay nếu cần'
                >
                  <Input
                    prefix={<LinkOutlined className='text-gray-400' />}
                    placeholder='/product/category-slug/product-slug'
                  />
                </Form.Item>

                <Form.Item
                  label='Ảnh Chính'
                  name='image'
                  rules={[{ required: true, message: 'Vui lòng chọn ảnh sản phẩm' }]}
                  className='mb-0'
                >
                  <ImageUpload />
                </Form.Item>

                <Form.Item
                  label='Ảnh Mô Tả'
                  name='description_image'
                  rules={[{ required: true, message: 'Vui lòng chọn ảnh mô tả' }]}
                  className='mb-0'
                >
                  <ImageUpload />
                </Form.Item>
              </div>
            </Section>

            <Section index='03' label='Thông số kỹ thuật'>
              <div>
                <Form.Item
                  label='Specs (mỗi dòng 1 thông số)'
                  name='specs'
                  rules={[{ required: true, message: 'Vui lòng nhập thông số kỹ thuật' }]}
                  className='mb-0'
                >
                  <TextArea
                    rows={6}
                    placeholder={'Tiêu chuẩn: TCVN 5715:1993\nVật liệu: Gang xám GX 15-32\nÁp lực làm việc: 1.6 MPa'}
                    onChange={(e) => setSpecCount(e.target.value.split('\n').filter((l) => l.trim()).length)}
                  />
                </Form.Item>
                <p className='text-right text-xs text-gray-400 mt-1'>{specCount} thông số</p>
              </div>
            </Section>

            <Section index='04' label='Nội dung & Mô tả'>
              <div className='flex flex-col gap-4'>
                <div>
                  <Form.Item
                    label='Đặc Điểm Nổi Bật (mỗi dòng 1 điểm)'
                    name='points'
                    rules={[{ required: true, message: 'Vui lòng nhập đặc điểm nổi bật' }]}
                    className='mb-0'
                  >
                    <TextArea
                      rows={3}
                      placeholder={'Mỗi dòng là một điểm nổi bật\nĐộ bền cao, chịu nhiệt tốt'}
                      onChange={(e) => setPointCount(e.target.value.split('\n').filter((l) => l.trim()).length)}
                    />
                  </Form.Item>
                  <p className='text-right text-xs text-gray-400 mt-1'>{pointCount} dòng</p>
                </div>

                <div>
                  <Form.Item
                    label='Mô Tả Chi Tiết (mỗi dòng 1 đoạn)'
                    name='desc_text'
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết' }]}
                    className='mb-0'
                  >
                    <TextArea
                      rows={4}
                      placeholder={
                        'Trụ cứu hỏa 3 cửa sản xuất theo tiêu chuẩn TCVN 5715:1993.\nPhù hợp lắp đặt tại căn cứ quân sự, khu công nghiệp.'
                      }
                      onChange={(e) => setDescTextCount(e.target.value.split('\n').filter((l) => l.trim()).length)}
                    />
                  </Form.Item>
                  <p className='text-right text-xs text-gray-400 mt-1'>{descTextCount} dòng</p>
                </div>

                <div>
                  <Form.Item
                    label='Mô Tả Tóm Tắt'
                    name='desc_detail'
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    className='mb-0'
                  >
                    <TextArea
                      rows={3}
                      placeholder='Nhập mô tả tóm tắt sản phẩm...'
                      onChange={(e) => setDescDetailCount(e.target.value.length)}
                    />
                  </Form.Item>
                  <p className='text-right text-xs text-gray-400 mt-1'>{descDetailCount} ký tự</p>
                </div>
              </div>
            </Section>

            <div className='px-6 py-4 bg-gray-50 flex gap-3'>
              <Button icon={<ReloadOutlined />} onClick={resetForm} disabled={isLoading}>
                Đặt lại
              </Button>
              <Button type='primary' htmlType='submit' icon={<SaveOutlined />} loading={isLoading} className='flex-1'>
                {isUploading ? 'Đang upload ảnh...' : isCreating ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
