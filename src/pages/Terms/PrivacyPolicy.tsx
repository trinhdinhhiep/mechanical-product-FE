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

const items = [
  {
    key: '1',
    label: '1. Mục đích và phạm vi thu thập thông tin khách hàng',
    children: (
      <>
        <Paragraph>
          Cung cấp dịch vụ cho khách hàng, quản lý và sử dụng thông tin cá nhân của khách hàng nhằm mục đích quản lý cơ
          sở dữ liệu khách hàng và kịp thời xử lý các tình huống phát sinh (nếu có). Việc thu thập dữ liệu thông tin của{' '}
          <Brand /> bao gồm:
        </Paragraph>
        <Paragraph>– Tên người liên hệ (cá nhân hoặc tổ chức)</Paragraph>
        <Paragraph>– Số điện thoại (di động, nhà riêng hoặc văn phòng)</Paragraph>
        <Paragraph>– Email (công ty hoặc cá nhân)</Paragraph>
        <Paragraph>– Địa chỉ (nhà riêng hoặc văn phòng)</Paragraph>
        <Paragraph>
          – Các thông tin chi tiết về thẻ tín dụng (loại và số thẻ tín dụng, ngày tháng hết hạn, tên chủ thẻ)
        </Paragraph>
        <Paragraph>– Tên và thông tin sản phẩm</Paragraph>
        <Paragraph>– Số lượng sản phẩm</Paragraph>
        <Paragraph>– Thời gian giao nhận sản phẩm</Paragraph>
      </>
    ),
  },
  {
    key: '2',
    label: '2. Phạm vi sử dụng thông tin cá nhân',
    children: (
      <>
        <Paragraph>
          <Brand /> sử dụng thông tin của Quý khách để:
        </Paragraph>
        <Paragraph>– Cung cấp các sản phẩm, dịch vụ của chúng tôi.</Paragraph>
        <Paragraph>
          – Gửi thông báo về các hoạt động trao đổi thông tin giữa Quý khách và <Brand />.
        </Paragraph>
        <Paragraph>– Ngăn ngừa các hoạt động phá hoại hoặc các hoạt động giả mạo khách hàng.</Paragraph>
        <Paragraph>– Liên lạc và giải quyết khiếu nại.</Paragraph>
        <Paragraph>
          – Xác nhận và trao đổi thông tin về giao dịch của Quý khách tại <Brand />.
        </Paragraph>
      </>
    ),
  },
  {
    key: '3',
    label: '3. Thời gian lưu trữ thông tin',
    children: (
      <Paragraph>
        Không có thời hạn ngoại trừ trường hợp Quý khách có yêu cầu hủy bỏ các thông tin đã cung cấp.
      </Paragraph>
    ),
  },
  {
    key: '4',
    label: '4. Cam kết bảo mật thông tin cá nhân của khách hàng',
    children: (
      <>
        <Paragraph>
          – <Brand /> cam kết không sử dụng, không chuyển giao, cung cấp hoặc tiết lộ cho bên thứ 3 về thông tin cá nhân
          của khách hàng khi không được sự đồng ý ngoại trừ các trường hợp được quy định tại chính sách này hoặc quy
          định của pháp luật.
        </Paragraph>
        <Paragraph>
          – <Brand /> luôn luôn quan tâm đến quyền riêng tư của khách hàng khi sử dụng những dịch vụ của công ty. Chúng
          tôi hiểu rằng Quý khách sẽ rất quan tâm đến việc những thông tin cá nhân của mình đã cung cấp có được Công ty
          bảo mật an toàn hay không? Và chúng tôi luôn muốn Quý khách thật sự yên tâm và tin tưởng khi sử dụng các dịch
          vụ mà chúng tôi cung cấp.
        </Paragraph>
        <Paragraph>
          <Brand /> xây dựng chính sách bảo mật này để chứng minh cho cam kết bảo mật thông tin với Quý khách. Qua chính
          sách bảo mật thông tin, chúng tôi muốn Quý khách hiểu hơn về việc cung cấp các thông tin mà Công ty yêu cầu.
        </Paragraph>
        <Paragraph>
          Chân thành cảm ơn Quý khách đã tin tưởng chọn <Brand /> là đơn vị hợp tác, gửi gắm niềm tin.
        </Paragraph>
      </>
    ),
  },
]

const PrivacyPolicy = () => {
  return (
    <section className='max-w-[1080px] mx-auto px-[50px] py-[50px]'>
      <Title level={2} className='!text-[#b71414] !font-normal !text-[1.6em] flex items-center gap-4 uppercase'>
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
        Chính sách bảo mật
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
      </Title>

      <Paragraph>
        – Chúng tôi tôn trọng những thông tin cá nhân mà Quý khách cung cấp. Xin vui lòng đọc "Chính sách bảo mật" để
        hiểu hơn về những cam kết mà chúng tôi đã và đang thực hiện, nhằm tôn trọng và bảo vệ quyền lợi của Quý khách.
      </Paragraph>
      <Paragraph>
        – Bảo vệ thông tin cá nhân của người dùng và tạo nên niềm tin với Quý khách là một khía cạnh rất quan trọng đối
        với chúng tôi. Vì vậy, việc dùng các thông tin liên quan đến Quý khách đều phải tuân theo những nội dung của
        chính sách này và chỉ thu thập những thông tin cần thiết liên quan đến giao dịch mua bán.
      </Paragraph>

      <Collapse items={items} defaultActiveKey={['1']} className='!bg-white' />
    </section>
  )
}

export default PrivacyPolicy
