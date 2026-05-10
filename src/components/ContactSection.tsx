import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  PinterestFilled,
  LinkedinFilled,
  YoutubeFilled,
} from '@ant-design/icons'
import { Form, message, Input, Button, Typography } from 'antd'
import { ReactNode } from 'react'

interface SocialLink {
  icon: ReactNode
  href: string
  bg: string
}

interface QuoteFormValues {
  name: string
  phone: string
  email?: string
  quantity: number
  product: string
  location: string
}

const { Title, Paragraph } = Typography

const socialLinks: SocialLink[] = [
  {
    icon: <FacebookFilled />,
    href: '#',
    bg: 'bg-[#3a589d]',
  },
  {
    icon: <InstagramOutlined />,
    href: '#',
    bg: 'bg-[#3b6994]',
  },
  {
    icon: <TwitterOutlined />,
    href: '#',
    bg: 'bg-[#2478ba]',
  },
  {
    icon: <MailOutlined />,
    href: '#',
    bg: 'bg-black',
  },
  {
    icon: <PinterestFilled />,
    href: '#',
    bg: 'bg-[#cb2320]',
  },
  {
    icon: <LinkedinFilled />,
    href: '#',
    bg: 'bg-[#0072b7]',
  },
  {
    icon: <YoutubeFilled />,
    href: '#',
    bg: 'bg-[#c33223]',
  },
]

const ContactSection = () => {
  const [form] = Form.useForm()

  const onFinish = (values: QuoteFormValues) => {
    message.success('Yêu cầu báo giá đã được gửi thành công!')
    // eslint-disable-next-line no-console
    console.log(values)
    form.resetFields()
  }

  return (
    <section
      className='relative min-h-[450px] py-12 bg-cover bg-center'
      style={{
        backgroundImage: 'url(https://hevtech.vn/uploads/images/common/bg-info-contact.jpg)',
      }}
    >
      {/* overlay */}
      <div className='absolute inset-0 bg-black/60' />

      <div className='relative z-10 max-w-[1200px] mx-auto px-4'>
        <div className='bg-white/90 backdrop-blur rounded-2xl p-6 md:p-10 shadow-2xl'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            {/* LEFT */}
            <div className='text-center lg:pr-8 flex flex-col justify-center h-full'>
              <Title level={2} className='!text-red-700 !text-2xl !mb-3'>
                Liên hệ với 83MEC
              </Title>

              <Paragraph className='text-gray-600 mb-8'>
                Đội ngũ chuyên viên tư vấn của chúng tôi sẵn sàng hỗ trợ các yêu cầu từ Quý khách hàng
              </Paragraph>

              {/* social */}
              <div className='flex flex-wrap justify-center gap-3'>
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`
                      ${item.bg}
                      w-11 h-11
                      flex items-center justify-center
                      rounded-full
                      text-white
                      shadow-md
                      transition
                      hover:scale-110
                    `}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT - FORM */}
            <div>
              <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                initialValues={{
                  product: 'Van góc chữa cháy D50 - D65',
                }}
                className='space-y-4'
              >
                <div className='text-blue-900 font-bold text-lg'>Yêu cầu báo giá</div>

                <Form.Item name='name' rules={[{ required: true, message: 'Nhập họ tên' }]}>
                  <Input size='large' placeholder='Họ tên' />
                </Form.Item>

                <Form.Item name='phone' rules={[{ required: true, message: 'Nhập SĐT' }]}>
                  <Input size='large' placeholder='SĐT' />
                </Form.Item>

                <Form.Item name='email'>
                  <Input size='large' placeholder='Email' />
                </Form.Item>

                <Form.Item name='quantity' rules={[{ required: true, message: 'Nhập số lượng' }]}>
                  <Input size='large' type='number' placeholder='Số lượng' />
                </Form.Item>

                <Form.Item name='product'>
                  <Input size='large' readOnly />
                </Form.Item>

                <Form.Item name='location' rules={[{ required: true, message: 'Nhập khu vực' }]}>
                  <Input size='large' placeholder='Khu vực' />
                </Form.Item>

                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  block
                  className='!bg-red-600 !border-red-600 h-12 font-bold uppercase'
                >
                  Gửi yêu cầu
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ContactSection
