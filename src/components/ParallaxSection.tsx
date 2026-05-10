export default function QuoteSection() {
  return (
    <section className='relative w-full py-20 flex items-center justify-center'>
      {/* BACKGROUND */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: 'url("https://hevtech.vn/uploads/images/products/Banner-thiet-bi-pccc-bqp.jpg")',
        }}
      />

      {/* OVERLAY */}
      <div className='absolute inset-0 bg-black/70' />

      {/* CONTENT BOX */}
      <div className='relative z-10 max-w-[900px] mx-auto px-4'>
        <div className='bg-white/95 text-center px-6 md:px-12 py-10 rounded-xl shadow-2xl'>
          <h2 className='text-lg md:text-2xl leading-relaxed text-gray-900 mb-4'>
            “Kiến tạo tương lai từ những giá trị bền vững. Với hộp sắt xuất khẩu dẫn đầu, chúng tôi không ngừng nỗ lực,
            chinh phục thị trường toàn cầu bằng những sản phẩm cơ khí tinh tế và chất lượng vượt trội.”
          </h2>

          <p className='text-red-700 font-medium'>– 83MEC</p>
        </div>
      </div>
    </section>
  )
}
