import { Collapse, Typography } from 'antd'

const { Title, Paragraph, Text } = Typography

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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className='flex items-center gap-4 mb-6 mt-6'>
    <span className='uppercase font-medium px-3 py-1 text-[#020493]' style={{ border: '2px solid rgba(0,0,0,0.1)' }}>
      {children}
    </span>
    <span className='flex-1 h-[2px] bg-current opacity-10 block' />
  </div>
)

const scopeItems = [
  {
    key: '1',
    label: '1.1 Trường hợp được bảo hành',
    children: (
      <>
        <Paragraph>
          – Sản phẩm bị lỗi do nhà sản xuất và phải còn thời hạn bảo hành theo quy định trong Hợp đồng.
        </Paragraph>
        <Paragraph>
          – Quý khách cung cấp đầy đủ tài liệu bảo hành liên quan theo quy định của <Brand />.
        </Paragraph>
      </>
    ),
  },
  {
    key: '2',
    label: '1.2 Trường hợp không được bảo hành',
    children: (
      <>
        <Paragraph>
          – Sản phẩm không do <Brand /> sản xuất hay phân phối.
        </Paragraph>
        <Paragraph>
          – Mất Phiếu bảo hành; phiếu bảo hành không ghi rõ mã số sản phẩm và ngày mua hàng; thông tin về mã sản phẩm và
          phiếu bảo hành không trùng khớp nhau.
        </Paragraph>
        <Paragraph>
          – Sản phẩm bị lỗi do nguyên nhân chủ quan từ phía Quý khách như làm bể móp, biến dạng do va đập, sử dụng sai
          hướng dẫn,…
        </Paragraph>
        <Paragraph>
          – Sản phẩm bị hỏng do các nguyên nhân khách quan như hỏa hoạn, thiên tai, bảo lũ, chập cháy điện, sét đánh,…
        </Paragraph>
        <Paragraph>
          – Quý khách tự ý can thiệp đến sản phẩm hoặc đem đến một cơ sở khác sửa chữa trước khi thông báo về yêu cầu
          bảo hành đến <Brand />.
        </Paragraph>
      </>
    ),
  },
  {
    key: '3',
    label: '1.3 Trường hợp khác',
    children: (
      <Paragraph>
        – <Brand /> vẫn tiếp tục hỗ trợ kỹ thuật cho Quý khách trong trường hợp không được bảo hành. Căn cứ vào điều
        kiện thực tế và nhu cầu của Quý khách, Công ty và Quý khách có thể trao đổi để sửa chữa sản phẩm miễn phí hoặc
        tính phí.
      </Paragraph>
    ),
  },
]

const steps = [
  {
    step: 'Bước 1',
    content:
      'Quý khách gọi điện cho bộ phận hỗ trợ khách hàng theo số hotline 0349.597.889 để được hướng dẫn. Để giúp chúng tôi có thể dự đoán đúng tình trạng lỗi, Quý khách vui lòng cung cấp đầy đủ các thông tin phát sinh liên quan đến lỗi sản phẩm trong quá trình sử dụng hoặc tình trạng sự cố mà Quý khách gặp phải.',
  },
  {
    step: 'Bước 2',
    content: 'Kiểm tra tình trạng vật lý, tem bảo hành và các giấy tờ bảo hành liên quan (nếu có).',
  },
  {
    step: 'Bước 3',
    content: (
      <>
        Tiếp nhận và thông báo thời hạn xử lý bảo hành dự kiến cho Quý khách. Tiến hành bảo hành sửa chữa theo quy định
        của <Brand />.
      </>
    ),
  },
  {
    step: 'Bước 4',
    content:
      'Sau khi hoàn thành sửa chữa bảo hành và khắc phục lỗi, chúng tôi sẽ liên hệ với Quý khách để kiểm tra bàn giao sản phẩm sau bảo hành.',
  },
]

const WarrantyPolicy = () => {
  return (
    <section className='max-w-[1080px] mx-auto px-[50px] py-[50px]'>
      {/* TITLE */}
      <Title level={2} className='!text-[#b71414] !font-normal !text-[1.6em] flex items-center gap-4 uppercase'>
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
        Chính sách bảo hành
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
      </Title>

      <Paragraph>
        Với bất kỳ một sản phẩm nào sau khi đưa vào sử dụng luôn bị chịu tác động bởi môi trường xung quanh, vì vậy tất
        cả sản phẩm đều phải có chính sách bảo hành. Trong đó các sản phẩm cơ khí, gia công kim loại cũng không phải là
        ngoại lệ và cần có chính sách bảo hành riêng dựa theo đặc thù của từng sản phẩm. Quý khách vui lòng đọc kĩ về
        quy định chính sách bảo hành của chúng tôi như sau:
      </Paragraph>

      {/* SECTION 1 */}
      <SectionTitle>1. Phạm vi bảo hành</SectionTitle>
      <Collapse items={scopeItems} defaultActiveKey={['1']} className='!bg-white' />

      {/* SECTION 2 */}
      <SectionTitle>2. Quy trình bảo hành</SectionTitle>
      <Paragraph>
        Khi gặp các vấn đề phát sinh liên quan đến sản phẩm, Quý khách vui lòng liên hệ với chúng tôi để được hỗ trợ bảo
        hành.
      </Paragraph>
      <Paragraph>Chi tiết quy trình bảo hành được chúng tôi thực hiện như sau:</Paragraph>

      {steps.map((item, index) => (
        <Paragraph key={index}>
          – <Text strong>{item.step}: </Text>
          {item.content}
        </Paragraph>
      ))}
    </section>
  )
}

export default WarrantyPolicy
