import { Table, Button, Typography, Space, ConfigProvider, App, Tooltip, Badge } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, ExclamationCircleOutlined, AppstoreOutlined, InboxOutlined } from '@ant-design/icons'
import { useGetAllCategoriesQuery, useDeleteProductMutation, useDeleteCategoryMutation } from '@/services/productsApi'
import type { CategoryNavItem, ProductItem } from '@/services/productsApi'

const { Text, Title } = Typography

// ─── Antd theme ───────────────────────────────────────────────────────────────
const theme = {
  token: {
    colorPrimary: '#111827',
    colorBgContainer: '#ffffff',
    borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
  },
  components: {
    Table: {
      headerBg: '#f9fafb',
      headerColor: '#6b7280',
      headerSplitColor: 'transparent',
      rowHoverBg: '#f9fafb',
      borderColor: '#f3f4f6',
      expandIconBg: 'transparent',
    },
    Button: {
      defaultBorderColor: '#e5e7eb',
      defaultColor: '#374151',
    },
    Modal: {
      titleFontSize: 16,
    },
  },
}

// ─── Inner component ──────────────────────────────────────────────────────────
function DeleteProductInner() {
  const { modal } = App.useApp()

  const { data: categories = [], isLoading, isFetching } = useGetAllCategoriesQuery()
  const [deleteProduct] = useDeleteProductMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleDeleteProduct = (product: ProductItem, categoryName: string) => {
    modal.confirm({
      title: 'Xác nhận xóa sản phẩm',
      icon: <ExclamationCircleOutlined className='text-red-500' />,
      content: (
        <div className='py-2'>
          <p className='text-gray-500 text-sm mb-3'>Sản phẩm sau sẽ bị xóa vĩnh viễn và không thể khôi phục.</p>
          <div className='bg-gray-50 rounded-lg p-3 border border-gray-200'>
            <p className='font-medium text-gray-900 text-sm leading-snug'>{product.title}</p>
            <p className='text-gray-400 text-xs mt-1'>Thuộc · {categoryName}</p>
          </div>
        </div>
      ),
      okText: 'Xóa sản phẩm',
      cancelText: 'Hủy',
      okButtonProps: { danger: true, className: 'rounded-lg' },
      cancelButtonProps: { className: 'rounded-lg' },
      centered: true,
      onOk: async () => {
        await deleteProduct(product.id).unwrap()
      },
    })
  }

  const handleDeleteCategory = (category: CategoryNavItem) => {
    modal.confirm({
      title: 'Xác nhận xóa danh mục',
      icon: <ExclamationCircleOutlined className='text-red-500' />,
      content: (
        <div className='py-2'>
          <p className='text-gray-500 text-sm mb-3'>Danh mục sau sẽ bị xóa vĩnh viễn và không thể khôi phục.</p>
          <div className='bg-gray-50 rounded-lg p-3 border border-gray-200'>
            <p className='font-medium text-gray-900 text-sm'>{category.name}</p>
            <p className='text-gray-400 text-xs mt-1'>{category.slug}</p>
          </div>
        </div>
      ),
      okText: 'Xóa danh mục',
      cancelText: 'Hủy',
      okButtonProps: { danger: true, className: 'rounded-lg' },
      cancelButtonProps: { className: 'rounded-lg' },
      centered: true,
      onOk: async () => {
        await deleteCategory(category.id).unwrap()
      },
    })
  }

  // ─── Expanded row — product table ────────────────────────────────────────────
  const productColumns: ColumnsType<ProductItem> = [
    {
      title: 'Sản phẩm',
      key: 'product',
      render: (_, record) => (
        <div className='flex items-center gap-3 py-0.5'>
          <img
            src={record.image}
            alt={record.title}
            className='w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0'
          />
          <div className='min-w-0'>
            <p className='text-sm font-medium text-gray-900 leading-snug line-clamp-1'>{record.title}</p>
            <p className='text-xs text-gray-400 line-clamp-1'>{record.slug}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 200,
      render: (link: string) => (
        <a
          href={link}
          target='_blank'
          rel='noreferrer'
          className='text-xs text-blue-500 hover:underline line-clamp-1 block max-w-[180px]'
        >
          {link}
        </a>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 60,
      render: (_, record) => {
        // Lấy category name từ closure của expandedRowRender
        const categoryName = (record as ProductItem & { __categoryName: string }).__categoryName ?? ''
        return (
          <Button
            type='text'
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record, categoryName)}
            className='text-gray-400 hover:!text-red-500 hover:!bg-red-50 rounded-lg transition-colors'
            size='small'
          />
        )
      },
    },
  ]

  const expandedRowRender = (category: CategoryNavItem) => {
    // Inject categoryName vào từng product để dùng trong productColumns
    type ProductItemWithCategory = ProductItem & { __categoryName: string }
    const products: ProductItemWithCategory[] = category.products.map((p) => ({
      ...p,
      __categoryName: category.name,
    })) as ProductItemWithCategory[]

    if (products.length === 0) {
      return (
        <div className='flex items-center gap-2 py-4 pl-12 text-gray-400'>
          <InboxOutlined />
          <Text className='text-gray-400 text-sm'>Danh mục trống</Text>
        </div>
      )
    }

    return (
      <div className='pl-8 pr-4 py-2 bg-gray-50/60'>
        <Table<ProductItem>
          dataSource={products}
          columns={productColumns}
          rowKey='id'
          pagination={false}
          size='small'
          showHeader={true}
          className='nested-table'
        />
      </div>
    )
  }

  // ─── Category columns ────────────────────────────────────────────────────────
  const categoryColumns: ColumnsType<CategoryNavItem> = [
    {
      title: 'Danh mục',
      key: 'category',
      render: (_, record) => (
        <div className='flex items-center gap-3 py-1'>
          <div className='w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0'>
            <img src={record.banner_image} alt={record.name} className='w-full h-full object-cover' />
          </div>
          <div>
            <p className='text-sm font-medium text-gray-900'>{record.name}</p>
            <p className='text-xs text-gray-400'>{record.slug}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Sản phẩm',
      key: 'productCount',
      width: 120,
      render: (_, record) => (
        <Badge
          count={record.products.length}
          showZero
          color={record.products.length === 0 ? '#d1d5db' : '#6b7280'}
          className='text-xs'
        />
      ),
    },
    {
      title: '',
      key: 'action',
      width: 80,
      render: (_, record) => {
        const hasProducts = record.products.length > 0
        return (
          <Tooltip title={hasProducts ? `Xóa hết ${record.products.length} sản phẩm trước` : ''} placement='left'>
            <Button
              type='text'
              icon={<DeleteOutlined />}
              onClick={() => !hasProducts && handleDeleteCategory(record)}
              disabled={hasProducts}
              className={
                hasProducts
                  ? 'text-gray-200 cursor-not-allowed rounded-lg'
                  : 'text-gray-400 hover:!text-red-500 hover:!bg-red-50 rounded-lg transition-colors'
              }
              size='small'
            />
          </Tooltip>
        )
      },
    },
  ]

  const totalProducts = categories.reduce((sum, c) => sum + c.products.length, 0)

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 px-8 py-5'>
        <div className='max-w-5xl mx-auto flex items-center justify-between'>
          <div>
            <Title level={4} className='!mb-0 !text-gray-900'>
              Quản lý sản phẩm
            </Title>
            <Text className='text-gray-400 text-sm'>
              {categories.length} danh mục · {totalProducts} sản phẩm
            </Text>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='max-w-5xl mx-auto px-8 py-6'>
        <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
          <Table<CategoryNavItem>
            dataSource={categories}
            columns={categoryColumns}
            rowKey='id'
            loading={isLoading || isFetching}
            pagination={false}
            expandable={{
              expandedRowRender,
              rowExpandable: () => true,
              expandRowByClick: true,
            }}
            locale={{
              emptyText: (
                <Space direction='vertical' className='py-12'>
                  <AppstoreOutlined className='text-4xl text-gray-200' />
                  <Text className='text-gray-400'>Chưa có danh mục nào</Text>
                </Space>
              ),
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Outer component ──────────────────────────────────────────────────────────
export default function DeleteProduct() {
  return (
    <ConfigProvider theme={theme}>
      <App>
        <DeleteProductInner />
      </App>
    </ConfigProvider>
  )
}
