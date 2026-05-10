import { useState } from 'react'
import { Table, Button, Tag, Typography, Space, ConfigProvider, App } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { DeleteOutlined, ExclamationCircleOutlined, FileTextOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useGetNewsListQuery, useDeleteArticleMutation } from '@/services/newsApi'
import type { Article } from '@/types/article'

const { Text, Title } = Typography

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
function DeleteArticleInner() {
  const { modal } = App.useApp() // ✅ nằm bên trong App provider

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const { data, isLoading, isFetching } = useGetNewsListQuery({ page, limit })
  const [deleteArticle] = useDeleteArticleMutation()

  const articles = [...(data?.data ?? [])].sort((a, b) => {
    const diff = dayjs(a.published_at).unix() - dayjs(b.published_at).unix()
    return sortOrder === 'desc' ? -diff : diff
  })

  const handleDelete = (article: Article) => {
    modal.confirm({
      title: 'Xác nhận xóa bài viết',
      icon: <ExclamationCircleOutlined className='text-red-500' />,
      content: (
        <div className='py-2'>
          <p className='text-gray-500 text-sm mb-3'>Bài viết sau sẽ bị xóa vĩnh viễn và không thể khôi phục.</p>
          <div className='bg-gray-50 rounded-lg p-3 border border-gray-200'>
            <p className='font-medium text-gray-900 text-sm leading-snug'>{article.title}</p>
            <p className='text-gray-400 text-xs mt-1'>
              {dayjs(article.published_at).format('DD/MM/YYYY')} · {article.category}
            </p>
          </div>
        </div>
      ),
      okText: 'Xóa bài viết',
      cancelText: 'Hủy',
      okButtonProps: {
        danger: true,
        className: 'rounded-lg',
      },
      cancelButtonProps: { className: 'rounded-lg' },
      centered: true,
      onOk: async () => {
        await deleteArticle(String(article.id)).unwrap()
      },
    })
  }

  const handleTableChange: TableProps<Article>['onChange'] = (_pagination, _filters, sorter) => {
    if (!Array.isArray(sorter) && sorter.field === 'published_at') {
      setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc')
    }
  }

  const columns: ColumnsType<Article> = [
    {
      title: 'Bài viết',
      key: 'article',
      render: (_, record) => (
        <div className='flex items-start gap-3 py-1'>
          {record.thumbnail ? (
            <img
              src={record.thumbnail}
              alt={record.title}
              className='w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-gray-100'
            />
          ) : (
            <div className='w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0'>
              <FileTextOutlined className='text-gray-300 text-lg' />
            </div>
          )}
          <div className='min-w-0'>
            <p className='font-medium text-gray-900 text-sm leading-snug line-clamp-2 mb-1'>{record.title}</p>
            <Text className='text-gray-400 text-xs line-clamp-1'>{record.excerpt}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Chuyên mục',
      dataIndex: 'category',
      key: 'category',
      width: 140,
      render: (category: string) => (
        <Tag className='rounded-full border-0 bg-gray-100 text-gray-600 font-normal text-xs px-3'>{category}</Tag>
      ),
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      width: 130,
      render: (author: string) => <Text className='text-gray-600 text-sm'>{author}</Text>,
    },
    {
      title: 'Ngày xuất bản',
      dataIndex: 'published_at',
      key: 'published_at',
      width: 160,
      sorter: true,
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: (date: string) => (
        <Text className='text-gray-500 text-sm tabular-nums'>{dayjs(date).format('DD/MM/YYYY')}</Text>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 60,
      render: (_, record) => (
        <Button
          type='text'
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
          className='text-gray-400 hover:!text-red-500 hover:!bg-red-50 rounded-lg transition-colors'
          size='small'
        />
      ),
    },
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 px-8 py-5'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <div>
            <Title level={4} className='!mb-0 !text-gray-900'>
              Quản lý bài viết
            </Title>
            <Text className='text-gray-400 text-sm'>{data?.pagination.total ?? 0} bài viết</Text>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='max-w-6xl mx-auto px-8 py-6'>
        <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
          <Table<Article>
            dataSource={articles}
            columns={columns}
            rowKey='id'
            loading={isLoading || isFetching}
            onChange={handleTableChange}
            pagination={{
              current: page,
              pageSize: limit,
              total: data?.pagination.total,
              onChange: setPage,
              showSizeChanger: false,
              showTotal: (total, range) => `${range[0]}–${range[1]} / ${total} bài`,
              className: 'px-4',
            }}
            locale={{
              emptyText: (
                <Space direction='vertical' className='py-12'>
                  <FileTextOutlined className='text-4xl text-gray-200' />
                  <Text className='text-gray-400'>Chưa có bài viết nào</Text>
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
export default function DeleteArticle() {
  return (
    <ConfigProvider theme={theme}>
      <App>
        <DeleteArticleInner />
      </App>
    </ConfigProvider>
  )
}
