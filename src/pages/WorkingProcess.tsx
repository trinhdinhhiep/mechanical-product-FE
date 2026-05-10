import { Typography } from 'antd'

const { Title, Paragraph, Text } = Typography

const steps = [
  {
    title: 'Bước 1 (TIẾP NHẬN YÊU CẦU)',
    content:
      'Tiếp nhận các bản vẽ hoặc sản phẩm mẫu qua đường bưu điện, email hoặc gặp gỡ trực tiếp để thuận tiện trao đổi cụ thể với Quý khách.',
  },
  {
    title: 'Bước 2 (TƯ VẤN THIẾT KẾ & BÁO GIÁ)',
    content: 'Chúng tôi sẽ lên phương án chế tạo, gia công chi tiết và gửi báo giá trong thời gian ngắn nhất.',
  },
  {
    title: 'Bước 3 (KÝ HỢP ĐỒNG)',
    content:
      'Thực hiện ký kết Hợp đồng và chốt tiến độ, thời gian cung ứng, thanh toán đảm bảo tối ưu và phù hợp với nhu cầu mong muốn của Quý khách.',
  },
  {
    title: 'Bước 4 (SẢN XUẤT VÀ KIỂM SOÁT CHẤT LƯỢNG)',
    content:
      'Bộ phận Kỹ thuật sẽ tiến hành thực hiện, giám sát chặt chẽ quá trình gia công, chế tạo theo đơn đặt hàng. Bộ phận QC sẽ kiểm tra nghiệm thu 100% sản phẩm nhằm đảm bảo chất lượng hoàn hảo nhất trước khi bàn giao cho Quý khách.',
  },
  {
    title: 'Bước 5 (BÀN GIAO NGHIỆM THU & THANH LÝ HỢP ĐỒNG)',
    content:
      'Chúng tôi sẽ tiến hành bàn giao sản phẩm cho Quý khách nghiệm thu và thực hiện quyết toán Hợp đồng như đã thỏa thuận.',
  },
  {
    title: 'Bước 6 (CHĂM SÓC KHÁCH HÀNG SAU BÁN HÀNG)',
    content:
      'Chúng tôi lưu giữ thường xuyên thông tin khách hàng để trao đổi, cung cấp sự hỗ trợ, kịp thời xử lý sự cố trong quá trình sử dụng sản phẩm xuất phát từ lỗi của nhà sản xuất. 83MEC luôn lắng nghe ý kiến đóng góp của Quý khách để hoàn thiện hơn về chất lượng sản phẩm và dịch vụ mà chúng tôi cung cấp.',
  },
]

const Brand = () => (
  <Text>
    <Text strong style={{ color: '#b20000' }}>
      83
    </Text>
    <Text strong style={{ color: '#2d2f84' }}>
      MEC
    </Text>
  </Text>
)

const WorkProcess = () => {
  return (
    <section className='max-w-[1080px] mx-auto px-[50px] py-[30px]'>
      {/* TITLE */}
      <Title level={2} className='!text-[#b71414] !font-normal !text-[1.6em] flex items-center gap-4 uppercase'>
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
        Quy trình làm việc
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
      </Title>

      {/* INTRO */}
      <Paragraph>
        Nhằm giúp Quý khách hình dung rõ hơn về quy trình làm việc như thế nào để có những sản phẩm cơ khí chuẩn xác, tỉ
        mỉ và chất lượng cao nhất tại <Brand />. Chúng tôi xin công khai quy trình gồm 6 bước tiêu chuẩn trong quy trình
        làm việc như sau:
      </Paragraph>

      {/* STEPS */}
      {steps.map((step, index) => (
        <Paragraph key={index}>
          – <Text strong>{step.title}: </Text>
          {step.content}
        </Paragraph>
      ))}

      {/* OUTRO */}
      <Paragraph>
        Trên đây là quy trình 6 bước làm việc của <Brand /> muốn chia sẻ tới Quý khách. Chúng tôi hy vọng qua bài viết
        này giúp Quý khách hiểu rõ hơn về quy trình làm việc của chúng tôi và tin tưởng hơn về sản phẩm, dịch vụ của{' '}
        <Brand />.
      </Paragraph>
    </section>
  )
}

export default WorkProcess
