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
    label: '1. Điều kiện chấp nhận đổi - hoàn trả sản phẩm',
    children: (
      <>
        <Paragraph>
          – Sản phẩm được xác định nguồn gốc mua tại <Brand />.
        </Paragraph>
        <Paragraph>
          – Sản phẩm vẫn còn nguyên tem, nhãn mác, bao bì của <Brand />.
        </Paragraph>
        <Paragraph>– Sản phẩm nhận lại không bị lỗi hình thức (trầy sướt, móp méo, ố màu, bể vỡ…)</Paragraph>
        <Paragraph>– Sản phẩm nhận lại phải còn đầy đủ linh phụ kiện, tặng phẩm kèm theo.</Paragraph>
        <Paragraph>
          – Sản phẩm khi nhận lại phải có đầy đủ các chứng từ (hóa đơn VAT, phiếu bảo hành, tài liệu hướng dẫn,
          brochure/catalogue…)
        </Paragraph>
      </>
    ),
  },
  {
    key: '2',
    label: '2. Trường hợp được đổi – hoàn trả sản phẩm',
    children: (
      <>
        <Paragraph>
          – Sản phẩm cung cấp không đúng chủng loại, model, số lượng theo yêu cầu nội dung hợp đồng hoặc đơn đặt hàng.
        </Paragraph>
        <Paragraph>
          – Sản phẩm gặp sự cố không thể khắc phục được (do lỗi kỹ thuật của <Brand />
          ).
        </Paragraph>
        <Paragraph>– Sản phẩm bị lỗi hoặc hỏng trong quá trình vận chuyển.</Paragraph>
      </>
    ),
  },
  {
    key: '3',
    label: '3. Trường hợp không được đổi – hoàn trả sản phẩm',
    children: (
      <>
        <Paragraph>– Sản phẩm đúng model chủng loại, quy cách theo yêu cầu đặt hàng của Quý khách.</Paragraph>
        <Paragraph>– Quý khách muốn thay đổi chủng loại, mẫu mã nhưng không thông báo trước.</Paragraph>
        <Paragraph>
          – Sản phẩm bị lỗi có lý do xuất phát từ khách hàng: vận hành sai hướng dẫn sử dụng, bong tróc, bể vỡ, móp
          méo,…
        </Paragraph>
        <Paragraph>– Sản phẩm đã qua sử dụng, không còn nguyên tem, nhãn mác, bao bì, vỏ hộp.</Paragraph>
        <Paragraph>
          <Text strong style={{ color: '#b20000' }}>
            Lưu ý:
          </Text>
        </Paragraph>
        <Paragraph>
          – Phụ thuộc từng chủng loại hàng hóa, khoảng cách vận chuyển mà việc đổi trả sẽ được thỏa thuận cụ thể và
          thống nhất triển khai theo Hợp đồng chính thức.
        </Paragraph>
        <Paragraph>
          – Các chi phí phát sinh trong quá trình đổi trả (vận chuyển, đóng gói, chi phí liên lạc) sẽ do hai bên tự thỏa
          thuận và tính mức chi phí phù hợp với mức thiệt hại (nếu có).
        </Paragraph>
      </>
    ),
  },
  {
    key: '4',
    label: '4. Quy trình đổi trả hàng',
    children: (
      <>
        <Paragraph>
          – <Text strong>Bước 1:</Text> Sau khi hàng giao đến, Quý khách cần kiểm tra trước khi ký nhận hàng. Nếu sản
          phẩm có vấn đề xin vui lòng liên hệ bộ phận hỗ trợ khách hàng tại số{' '}
          <Text underline italic>
            0349.597.889
          </Text>{' '}
          để được xử lý và hẹn lịch đổi trả hàng.
        </Paragraph>
        <Paragraph>
          – <Text strong>Bước 2:</Text> Tiếp nhận thông tin, xử lý yêu cầu đổi trả hàng.
        </Paragraph>
        <Paragraph>
          – <Text strong>Bước 3:</Text> Tiến hành đổi trả hàng theo lịch hẹn.
        </Paragraph>
      </>
    ),
  },
]

const ReturnPolicy = () => {
  return (
    <section className='max-w-[1080px] mx-auto px-[50px] py-[50px]'>
      <Title level={2} className='!text-[#b71414] !font-normal !text-[1.6em] flex items-center gap-4 uppercase'>
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
        Chính sách đổi trả
        <span className='flex-1 h-[2px] bg-current opacity-10 block' />
      </Title>

      <Paragraph>
        Chính sách đổi trả và hoàn tiền được áp dụng trong trường hợp Quý khách không nhận đúng giá trị sản phẩm mang
        lại như đã thỏa thuận theo Hợp đồng, (bao gồm yêu cầu kĩ thuật, kiểu dáng, chủng loại,…)
      </Paragraph>

      <Collapse items={items} defaultActiveKey={['1']} className='!bg-white' />
    </section>
  )
}

export default ReturnPolicy
