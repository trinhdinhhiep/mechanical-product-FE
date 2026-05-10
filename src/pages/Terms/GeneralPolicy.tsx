import { ROUTES } from '@/utils/routes'
import { Collapse, Typography } from 'antd'
import { Link } from 'react-router-dom'

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
    label: '1.1 Chấp thuận các điều kiện sử dụng',
    children: (
      <Paragraph>
        Khi sử dụng Website{' '}
        <Link to={ROUTES.home}>
          <strong>https://hevtech.vn</strong>
        </Link>{' '}
        của <Brand />, Quý khách đã mặc nhiên chấp thuận các điều khoản trong chính sách mà chúng tôi đã đề cập tại
        website này. Chúng tôi có quyền thay đổi, điều chỉnh, thêm hoặc bớt nội dung tại bất kỳ thời điểm nào mà không
        cần thông báo trước.
      </Paragraph>
    ),
  },
  {
    key: '2',
    label: '1.2 Tính chất của thông tin hiển thị',
    children: (
      <Paragraph>
        Tất cả những nội dung được chúng tôi hiển thị trên Website với mục đích cung cấp những thông tin sản phẩm/dịch
        vụ liên quan đến thiết kế, sản xuất, gia công cơ khí do <Brand /> thực hiện. Ngoài ra những chương trình khuyến
        mãi của chúng tôi như tri ân khách hàng, tặng sản phẩm, tặng quà đính kèm, mã giảm giá, voucher, hỗ trợ vận
        chuyển,… cũng sẽ được đăng tải tại Website này.
      </Paragraph>
    ),
  },
  {
    key: '3',
    label: '1.3 Miễn trừ trách nhiệm',
    children: (
      <>
        <Paragraph>
          Thông tin hiển thị tại Website này không đi kèm với bất kỳ đảm bảo hay cam kết trách nhiệm dưới bất kỳ hình
          thức nào từ phía <Brand /> về những thông tin được đăng tải trên Website để phù hợp với sản phẩm, dịch vụ mà
          chúng tôi cung cấp.
        </Paragraph>
        <Paragraph>
          <Brand /> cũng từ chối trách nhiệm hay đưa ra đảm bảo rằng Website sẽ không có lỗi vận hành, không an toàn,
          không bị gián đoạn hay bất cứ đảm bảo nào về những sai sót trong quá trình nhập liệu, sự đúng hạn của các
          thông tin hiển thị trên Website này.
        </Paragraph>
        <Paragraph>(1) Sử dụng các thông tin trên Website này</Paragraph>
        <Paragraph>(2) Các truy cập kết nối từ Website này</Paragraph>
        <Paragraph>(3) Đăng kí nhận thư điện tử</Paragraph>
        <Paragraph>
          <Text strong>Các điều kiện và hạn chế nêu trên chỉ có hiệu lực trong khuôn khổ pháp luật hiện hành.</Text>
        </Paragraph>
      </>
    ),
  },
  {
    key: '4',
    label: '1.4 Quyền sở hữu trí tuệ',
    children: (
      <>
        <Paragraph>
          Tất cả thông tin hiển thị tại{' '}
          <Link to={ROUTES.home}>
            <strong>https://hevtech.vn</strong>
          </Link>{' '}
          đều thuộc quyền sở hữu, là tài sản độc quyền của <Brand />. Mọi sao chép, trích dẫn không được gây thiệt hại
          cho <Brand /> và đều phải tuân thủ các điều kiện sau:
        </Paragraph>
        <Paragraph>(1) Chỉ sử dụng cho các mục đích cá nhân, phi thương mại.</Paragraph>
        <Paragraph>
          (2) Các sao chép hoặc trích dẫn đều phải giữ nguyên bản quyền hoặc các niêm yết về quyền sở hữu trí tuệ như đã
          hiển thị trong bản gốc.
        </Paragraph>
        <Paragraph>
          (3) Mọi sản phẩm, dịch vụ, công nghệ hay quy trình được sử dụng hay hiển thị tại Website này đều có thể liên
          đới đến bản quyền hay sở hữu trí tuệ của <Brand />.
        </Paragraph>
      </>
    ),
  },
  {
    key: '5',
    label: '1.5 Điều chỉnh và sửa đổi',
    children: (
      <Paragraph>
        <Brand /> bảo lưu quyền thay đổi, chỉnh sửa hoặc chấm dứt hoạt động của Website này vào bất cứ thời điểm nào mà
        không cần thông báo trước.
      </Paragraph>
    ),
  },
  {
    key: '6',
    label: '1.6 Nghiêm cấm sử dụng',
    children: (
      <>
        <Paragraph>
          Chúng tôi có quyền cấm truy cập mà không có bất kỳ thông báo nào khi nhận thấy Quý khách đang vi phạm các điều
          khoản sau:
        </Paragraph>
        <Paragraph>
          – Sử dụng bất hợp pháp các tính năng hoặc có những hành động, động thái trái pháp luật trên Website của chúng
          tôi nhằm gây cản trở đến sự truy cập và sử dụng dịch vụ của người dùng khác.
        </Paragraph>
        <Paragraph>– Sử dụng các công cụ khác để thu thập thông tin nhằm mục đích phá hoại.</Paragraph>
        <Paragraph>
          – Sử dụng tính năng báo giá trực tuyến để báo giá trái phép, hay mục đích gây hiểu lầm với các thông tin giả
          mạo, thiếu xác thực.
        </Paragraph>
      </>
    ),
  },
  {
    key: '7',
    label: '1.7 Các quy định khác',
    children: (
      <>
        <Paragraph>
          <Brand /> hoạt động dựa trên sự tuân thủ pháp luật hiện hành của Việt Nam, có đầy đủ giấy phép kinh doanh, mã
          số thuế, hóa đơn chứng từ.
        </Paragraph>
        <Paragraph>
          Tất cả các sản phẩm dịch vụ được cung cấp tại{' '}
          <Link to={ROUTES.home}>
            <strong>https://hevtech.vn</strong>
          </Link>{' '}
          đều đáp ứng đầy đủ các tiêu chuẩn cho phép và tuân thủ đầy đủ tính pháp lý của sản phẩm.
        </Paragraph>
        <Paragraph>Chúng tôi cam kết kinh doanh minh bạch, hợp pháp và đảm bảo chất lượng.</Paragraph>
      </>
    ),
  },
]

const GeneralPolicy = () => {
  return (
    <section className='max-w-[1080px] mx-auto px-[50px] py-[50px]'>
      <Title level={2} className='!text-[#b71414] !font-normal !text-[1.6em] flex items-center gap-4 uppercase'>
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
        Chính sách và quy định chung
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
      </Title>

      <Paragraph className='uppercase font-medium'>
        WEBSITE NÀY THUỘC QUYỀN SỞ HỮU VÀ QUẢN LÝ CỦA CÔNG TY TNHH MỘT THÀNH VIÊN CƠ KHÍ 83...
      </Paragraph>

      <Collapse items={items} defaultActiveKey={['1']} className='!bg-white' />
    </section>
  )
}

export default GeneralPolicy
