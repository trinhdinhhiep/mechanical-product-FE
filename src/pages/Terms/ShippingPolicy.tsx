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
    label: '1. Phạm vi áp dụng',
    children: (
      <Paragraph>
        Tất cả các khách hàng mua sản phẩm, sử dụng dịch vụ của <Brand /> trong và ngoài nước.
      </Paragraph>
    ),
  },
  {
    key: '2',
    label: '2. Hình thức giao hàng',
    children: (
      <>
        <Paragraph>
          <Brand /> áp dụng chính sách giao hàng miễn phí trong phạm vi không quá 200km.
        </Paragraph>
        <Paragraph>
          Để linh hoạt trong quy trình vận chuyển, chúng tôi sử dụng đa dạng các phương thức vận chuyển, cụ thể như sau:
        </Paragraph>
        <Paragraph>
          – Giao hàng qua chuyển phát nhanh (áp dụng đối với các đơn hàng có số lượng ít, hàng hóa nhỏ gọn).
        </Paragraph>
        <Paragraph>
          – Giao hàng trực tiếp tại địa điểm đã được thỏa thuận theo Hợp đồng giữa hai bên (áp dụng với tất cả các sản
          phẩm do <Brand /> cung cấp, số lượng hàng hóa lớn).
        </Paragraph>
        <Paragraph>
          – Nhận hàng trực tiếp tại công ty nếu Quý khách có nhu cầu (áp dụng với tất cả các sản phẩm, dịch vụ do chúng
          tôi cung cấp).
        </Paragraph>
        <Paragraph>– Một số hình thức giao nhận khác tùy theo tính chất của sản phẩm.</Paragraph>
      </>
    ),
  },
  {
    key: '3',
    label: '3. Thời gian giao hàng',
    children: (
      <ul className='list-disc pl-5 space-y-2'>
        <li>
          Thời gian giao hàng tùy thuộc vào chủng loại hàng hóa, thời gian sản xuất, khoảng cách địa lý và hình thức gửi
          hàng. Điều này sẽ được thỏa thuận cụ thể trong Hợp đồng giao dịch.
        </li>
        <li>Trước khi chuyển hàng, chúng tôi sẽ thông báo cho Quý khách về thời gian & cước phí giao hàng.</li>
        <li>
          Trong thời gian chờ nhận hàng, nếu Quý khách có bất kỳ thắc mắc về vấn đề vận chuyển sản phẩm xin vui lòng
          liên hệ hotline (+84) 2163.825.772 để chúng tôi hỗ trợ và giải đáp kịp thời.
        </li>
      </ul>
    ),
  },
  {
    key: '4',
    label: '4. Trách nhiệm của công ty và khách hàng trong vận chuyển hàng hóa',
    children: (
      <ul className='list-disc pl-5 space-y-2'>
        <li>
          Công ty chỉ chịu trách nhiệm đối với các rủi ro cho sản phẩm như mất mát, hư hỏng trong suốt quá trình vận
          chuyển hàng từ công ty đến địa điểm giao hàng được thỏa thuận theo Hợp đồng.
        </li>
        <li>
          Chúng tôi khuyến khích Quý khách kiểm tra tình trạng sản phẩm trước khi ký xác nhận biên lai giao hàng để đảm
          bảo rằng hàng hóa được giao đúng chủng loại, số lượng theo đơn đặt hàng và tình trạng không bị lỗi, hỏng. Nếu
          phát hiện hàng hóa bị hư hỏng, trầy xước, bể vỡ, móp méo, hoặc không đúng sản phẩm theo thỏa thuận vui lòng
          thông báo ngay cho Bộ phận chăm sóc khách hàng theo số hotline 0349.597.889 để được giải quyết kịp thời.
        </li>
        <li>
          Đối với trường hợp Quý khách chủ động lựa chọn dịch vụ vận chuyển thì phải chịu hoàn toàn trách nhiệm đối với
          các rủi ro về hàng hóa như: mất mát, hư hỏng, trầy xước, bể vỡ trong suốt quá trình vận chuyển.
        </li>
      </ul>
    ),
  },
  {
    key: '5',
    label: '5. Các điều kiện khác',
    children: (
      <ul className='list-disc pl-5 space-y-2'>
        <li>
          Công ty và Quý khách sẽ thỏa thuận và thống nhất hợp lý về toàn bộ chi phí phát sinh trong suốt quá trình vận
          chuyển.
        </li>
        <li>
          Công ty chỉ giao hàng cho đúng người nhận mà Quý khách đã cung cấp khi ký Hợp đồng. Trong quá trình giao hàng,
          nếu có bất kỳ sự thay đổi về thông tin người nhận nhưng không rõ ràng, không có sự báo trước thì chúng tôi có
          quyền từ chối giao hàng và yêu cầu Quý khách đến nhận hàng trực tiếp tại Công ty.
        </li>
        <li>
          Trong trường hợp Công ty đã vận chuyển hàng đến địa điểm giao nhận như thỏa thuận trong Hợp đồng, nhưng vì một
          lý do nào đó Quý khách yêu cầu trả lại hàng hóa, sản phẩm phải chịu toàn bộ chi phí vận chuyển theo đơn giá
          quy định của đơn vị vận chuyển và bồi thường theo phạm vi trách nhiệm theo Hợp đồng.
        </li>
        <li>
          Đối với những hàng hóa nặng, cồng kềnh cần phải vận chuyển lên cao, địa hình đi lại khó khăn thì đề nghị Quý
          khách hỗ trợ hợp tác trong việc giao nhận.
        </li>
      </ul>
    ),
  },
]

const ShippingPolicy = () => {
  return (
    <section className='max-w-[1080px] mx-auto px-[50px] py-[50px]'>
      <Title level={2} className='!text-[#b71414] !font-normal !text-[1.6em] flex items-center gap-4 uppercase'>
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
        Chính sách vận chuyển và giao nhận
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
      </Title>

      <Collapse items={items} defaultActiveKey={['1']} className='!bg-white' />
    </section>
  )
}

export default ShippingPolicy
