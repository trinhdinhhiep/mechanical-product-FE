import {
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  MailOutlined,
  LinkedinFilled,
  YoutubeFilled,
} from '@ant-design/icons'
import { Button, Row, Col, Table, Form, Input } from 'antd'
import { ColumnsType } from 'antd/es/table'

interface DrawingItem {
  key: string
  name: string
  link: string
}

interface ContactFormValues {
  name: string
  email?: string
  phone?: string
  note?: string
}

const dataSource: DrawingItem[] = [
  {
    key: '1',
    name: 'Trụ cứu hỏa, trụ nước chữa cháy 3 cửa D100',
    link: '#',
  },
  {
    key: '2',
    name: 'Họng tiếp nước 2 cửa',
    link: '#',
  },
  {
    key: '3',
    name: 'Van góc chữa cháy D50',
    link: '#',
  },
  {
    key: '4',
    name: 'Van góc chữa cháy D65',
    link: '#',
  },
  {
    key: '5',
    name: 'Bình chữa cháy bột ABC 4kg',
    link: '#',
  },
  {
    key: '6',
    name: 'Bình chữa cháy bột ABC 8kg',
    link: '#',
  },
  {
    key: '7',
    name: 'Bình chữa cháy tự động bột ABC 6kg',
    link: '#',
  },
  {
    key: '8',
    name: 'Bình chữa cháy tự động bột ABC 8kg',
    link: '#',
  },
]

const columns: ColumnsType<DrawingItem> = [
  {
    title: 'Bản vẽ kỹ thuật',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tải về',
    key: 'download',
    render: (_, record) => (
      <a href={record.link} target='_blank'>
        <Button type='primary' danger>
          Download
        </Button>
      </a>
    ),
  },
]

function ContactSection() {
  const [form] = Form.useForm()

  const onFinish = (values: ContactFormValues) => {
    // eslint-disable-next-line no-console
    console.log('Form values:', values)
  }
  return (
    <div className='max-w-[1400px] mx-auto p-4'>
      <div className='bg-white/90 rounded-xl p-8 md:p-12 shadow-none border-0'>
        <Row gutter={[32, 32]} align='middle' justify='center'>
          {/* LEFT */}
          <Col xs={24} md={12} className='text-center md:text-left'>
            <h2 className='text-2xl md:text-3xl font-semibold text-red-700 mb-3'>Liên hệ với 83MEC</h2>

            <p className='text-gray-600 mb-6'>Đội ngũ chuyên viên tư vấn sẵn sàng hỗ trợ bạn</p>

            {/* SOCIAL */}
            <div className='flex justify-center md:justify-start gap-3 flex-wrap'>
              <a href='#' target='_blank'>
                <Button shape='circle' icon={<FacebookFilled />} />
              </a>
              <a href='#' target='_blank'>
                <Button shape='circle' icon={<InstagramFilled />} />
              </a>
              <a href='#' target='_blank'>
                <Button shape='circle' icon={<TwitterOutlined />} />
              </a>
              <a href='#'>
                <Button shape='circle' icon={<MailOutlined />} />
              </a>
              <a href='#' target='_blank'>
                <Button shape='circle' icon={<LinkedinFilled />} />
              </a>
              <a href='#' target='_blank'>
                <Button shape='circle' icon={<YoutubeFilled />} />
              </a>
            </div>
          </Col>

          {/* RIGHT - FORM */}
          <Col xs={24} md={12}>
            <Form form={form} layout='vertical' onFinish={onFinish} className='bg-white'>
              <Form.Item label='Họ tên' name='name' rules={[{ required: true, message: 'Nhập họ tên' }]}>
                <Input placeholder='Nhập họ tên' />
              </Form.Item>

              <Form.Item label='Email' name='email' rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                <Input placeholder='Email' />
              </Form.Item>

              <Form.Item label='SĐT' name='phone'>
                <Input placeholder='Số điện thoại' />
              </Form.Item>

              <Form.Item label='Ghi chú' name='note'>
                <Input placeholder='Bạn cần báo giá gì?' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' className='w-full'>
                  Gửi thông tin liên hệ
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

const TechLib = () => {
  const technicalDrawingsRender = () => {
    return (
      <div className='max-w-[1800px] mx-auto p-5'>
        <Row gutter={[48, 24]} align='stretch'>
          {/* LEFT IMAGE */}
          <Col xs={24} md={15}>
            <a href='#'>
              <img
                src='https://hevtech.vn/uploads/images/common/ban-ve-thiet-ke-san-pham.jpg'
                alt='Bản vẽ kỹ thuật'
                className='w-full rounded-lg shadow hover:scale-105 transition'
              />
            </a>
          </Col>

          {/* RIGHT TABLE */}
          <Col xs={24} md={9}>
            <Table dataSource={dataSource} columns={columns} pagination={false} bordered className='shadow' />
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <>
      {technicalDrawingsRender()}
      <ContactSection />
    </>
  )
}

export default TechLib
