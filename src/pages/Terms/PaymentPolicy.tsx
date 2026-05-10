import { ROUTES } from '@/utils/routes'
import { Collapse, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const items = [
  {
    key: '1',
    label: '1. Quy định thanh toán',
    children: (
      <>
        <Paragraph>
          – Tổng số tiền phải thanh toán đã bao gồm thuế, chi phí thiết kế, sản xuất, phí vận chuyển và các chi phí phát
          sinh trong phạm vi chịu trách nhiệm của các bên.
        </Paragraph>
        <Paragraph>– Đồng tiền thanh toán: Chúng tôi chấp nhận thanh toán bằng nội tệ hoặc ngoại tệ.</Paragraph>
        <Paragraph>
          – Quý khách chỉ thanh toán khi thực sự hài lòng với sản phẩm và chất lượng dịch vụ mà chúng tôi cung cấp.
          Chúng tôi sẽ không có bất kì khoản phí nào mà không có sự thỏa thuận với Quý khách.
        </Paragraph>
        <Paragraph>
          – Đối với khách hàng có nhu cầu mua, sản xuất, thiết kế gia công với số lượng lớn, vui lòng liên hệ trực tiếp
          với chúng tôi để có chính sách giá cả hợp lý.{' '}
          <Link to={ROUTES.contact}>
            <strong>
              <em>Liên hệ tại đây</em>
            </strong>
          </Link>
        </Paragraph>
        <Paragraph>
          – Dựa vào đặc thù từng sản phẩm, dịch vụ, mẫu chi tiết mà chúng tôi sẽ có sự tùy chỉnh khác nhau một cách
          tương đối về chính sách thanh toán, tất cả những điều này sẽ được thỏa thuận và thống nhất với Quý khách, nhằm
          đem lại sự phù hợp và thuận lợi nhất khi ký Hợp đồng chính thức.
        </Paragraph>
      </>
    ),
  },
  {
    key: '2',
    label: '2. Hình thức thanh toán',
    children: (
      <>
        <Paragraph>
          Chúng tôi chấp nhận linh hoạt tất cả phương thức thanh toán, phù hợp với quy định của pháp luật Việt Nam và
          thông lệ quốc tế.
        </Paragraph>
        <Paragraph>
          Chúng tôi khuyến khích thanh toán không dùng tiền mặt trong các giao dịch. Tuy nhiên, trong trường hợp có phát
          sinh giao dịch cần thanh toán bằng tiền mặt, giữa Công ty và Quý khách sẽ thỏa thuận để thống nhất hình thức
          giao dịch đảm bảo an toàn và đúng quy định của pháp luật.
        </Paragraph>
      </>
    ),
  },
  {
    key: '3',
    label: '3. Một số lưu ý',
    children: (
      <Paragraph>
        Nội dung chuyển khoản đề nghị ghi rõ họ tên (cá nhân hoặc doanh nghiệp); mã số thuế và chuyển khoản thanh toán
        cho sản phẩm, dịch vụ, hợp đồng và hóa đơn nào. Sau khi chuyển khoản, chúng tôi sẽ liên hệ xác nhận và tiến hành
        giao hàng (nên gửi kèm ủy nhiệm chi có dấu hoặc tin báo chuyển khoản thành công để có thể xác minh nhanh chóng).
        Trong trường hợp sau thời gian thỏa thuận mà chúng tôi không giao hàng hoặc không có sự phản hồi lại, Quý khách
        có thể gửi khiếu nại trực tiếp về Công ty và yêu cầu bồi thường nếu chứng minh được sự chậm trễ đã làm ảnh hưởng
        đến hoạt động kinh doanh của Quý khách.
      </Paragraph>
    ),
  },
]

const PaymentPolicy = () => {
  return (
    <section className='max-w-[1080px] mx-auto px-[50px] py-[50px]'>
      <Title level={2} className='!text-[#b71414] !font-normal !text-[1.6em] flex items-center gap-4 uppercase'>
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
        Quy định và hình thức thanh toán
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
      </Title>

      <Collapse items={items} defaultActiveKey={['1']} className='!bg-white' />
    </section>
  )
}

export default PaymentPolicy
