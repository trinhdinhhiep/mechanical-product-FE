import { UploadOutlined } from '@ant-design/icons'
import { Row, Col, Button, Form, Input, message, Upload, UploadFile } from 'antd'

import { ReactNode } from 'react'

interface ContactItem {
  title: string
  icon: string
  content: ReactNode
}

interface PhoneItem {
  name: string
  phone: string
}

interface Department {
  title: string
  icon: string
  email: string
  phones: PhoneItem[]
}

interface ContactFormValues {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  file?: UploadFile
}

const contactItems: ContactItem[] = [
  {
    title: 'Địa chỉ Email',
    icon: 'https://hevtech.vn/uploads/images/common/mail-fill.png',
    content: (
      <a href='#' className='hover:text-blue-500'>
        info@hevtech.vn
      </a>
    ),
  },
  {
    title: 'Địa chỉ',
    icon: 'https://hevtech.vn/uploads/images/common/map-pin-2-fill.png',
    content: <p>Thôn Minh Quán 8, xã Trấn Yên, tỉnh Lào Cai, Viet Nam</p>,
  },
  {
    title: 'Hotline',
    icon: 'https://hevtech.vn/uploads/images/common/phone-fill.png',
    content: (
      <a href='#' className='hover:text-blue-500'>
        (+84) 2163.825.772
      </a>
    ),
  },
]

const departments: Department[] = [
  {
    title: 'Bộ phận kinh doanh',
    icon: 'https://hevtech.vn/uploads/images/common/icon-phone.png',
    email: 'sales@hevtech.vn',
    phones: [
      { name: 'Ms. Ngoc', phone: '0366120994' },
      { name: 'Ms. Hanh', phone: '0349597889' },
      { name: 'Ms. Linh', phone: '0326815147' },
      { name: 'Ms. Han', phone: '0369255922' },
    ],
  },
  {
    title: 'Hỗ trợ kỹ thuật',
    icon: 'https://hevtech.vn/uploads/images/common/icon-chat.png',
    email: 'technical@hevtech.vn',
    phones: [
      { name: 'Mr. Duy Hung', phone: '0387240588' },
      { name: 'Mr. Duc Hung', phone: '0348110995' },
    ],
  },
]

const Contact = () => {
  const [form] = Form.useForm()

  const onFinish = (values: ContactFormValues) => {
    message.success('Gửi thành công!')
    // eslint-disable-next-line no-console
    console.log(values)
  }

  const contactBannerRender = () => {
    return (
      <section className='w-full'>
        <div className='w-full px-4 pb-8'>
          <div className='w-full'>
            <img
              src='https://hevtech.vn/uploads/images/common/thong-tin-lien-he.jpg'
              alt='Liên hệ'
              className='w-full h-auto object-cover'
            />
          </div>
        </div>
      </section>
    )
  }
  const contactInfoRender = () => {
    return (
      <section className='max-w-[1050px] mx-auto px-4 py-6'>
        <Row gutter={[24, 24]}>
          {contactItems.map((item, index) => (
            <Col xs={24} md={8} key={index}>
              <div className='text-center flex flex-col items-center gap-3'>
                {/* ICON */}
                <img src={item.icon} alt={item.title} className='w-10 h-10 object-contain' />

                {/* TITLE */}
                <h3 className='text-red-700 text-lg font-medium'>{item.title}</h3>

                {/* CONTENT */}
                <div className='text-gray-800 text-sm leading-relaxed'>{item.content}</div>
              </div>
            </Col>
          ))}
        </Row>
      </section>
    )
  }
  const departmentInfoRender = () => {
    return (
      <section className='bg-gray-100 py-10'>
        <div className='max-w-[1080px] mx-auto px-4'>
          <Row gutter={[32, 32]}>
            {departments.map((dept, index) => (
              <Col xs={24} md={12} key={index}>
                <div className='text-center flex flex-col items-center gap-4'>
                  {/* ICON */}
                  <img src={dept.icon} alt={dept.title} className='w-16 h-16 object-contain' />

                  {/* TITLE */}
                  <h2 className='text-red-700 text-xl font-medium'>{dept.title}</h2>

                  {/* EMAIL BUTTON */}
                  <a href={`mailto:${dept.email}`} className='w-full'>
                    <Button type='primary' danger block size='large'>
                      Mail: {dept.email}
                    </Button>
                  </a>

                  {/* PHONE LIST */}
                  <div className='w-full flex flex-col gap-2'>
                    {dept.phones.map((p, i) => (
                      <a key={i} href={`tel:${p.phone}`}>
                        <Button block size='large' className='!bg-[#2d2f84] !text-white'>
                          {p.name}: {p.phone}
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    )
  }
  const contactFormRender = () => {
    return (
      <section className='py-10 bg-white'>
        <div className='max-w-[800px] mx-auto px-4'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>Liên hệ với chúng tôi</h2>

          <Form form={form} layout='vertical' onFinish={onFinish} size='large'>
            {/* NAME */}
            <Form.Item label='Họ tên' name='name' rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
              <Input placeholder='Nhập họ tên...' />
            </Form.Item>

            {/* EMAIL */}
            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input placeholder='example@gmail.com' />
            </Form.Item>

            {/* PHONE */}
            <Form.Item label='SĐT' name='phone' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
              <Input placeholder='Nhập số điện thoại...' />
            </Form.Item>

            {/* SUBJECT */}
            <Form.Item label='Tiêu đề' name='subject' rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
              <Input placeholder='Tiêu đề...' />
            </Form.Item>

            {/* MESSAGE */}
            <Form.Item label='Nội dung' name='message' rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
              <Input.TextArea rows={5} placeholder='Nhập nội dung...' />
            </Form.Item>

            {/* FILE */}
            <Form.Item label='File đính kèm' name='file'>
              <Upload beforeUpload={() => false} maxCount={2}>
                <Button icon={<UploadOutlined />}>Chọn file</Button>
              </Upload>
            </Form.Item>

            {/* SUBMIT */}
            <Form.Item>
              <Button type='primary' htmlType='submit' className='w-full !bg-black'>
                Gửi thư
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    )
  }
  return (
    <>
      {contactBannerRender()}
      {contactInfoRender()}
      {departmentInfoRender()}
      {contactFormRender()}
    </>
  )
}

export default Contact
