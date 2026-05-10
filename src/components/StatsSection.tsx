export default function StatsSection() {
  const stats = [
    { value: '44', label: 'Năm kinh nghiệm' },
    { value: '850', label: 'Nhân lực' },
    { value: '1,100', label: 'Máy móc thiết bị' },
  ]

  return (
    <section className='relative w-full py-16 bg-[#2d2f84]'>
      {/* TOP BORDER STYLE (giống WP) */}
      <div className='absolute inset-0 border-t-[10px] border-white border-b-[30px] pointer-events-none' />

      <div className='relative z-10 max-w-[1400px] mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 text-white text-center'>
          {stats.map((item, index) => (
            <div key={index} className='flex flex-col items-center'>
              {/* NUMBER */}
              <h2 className='text-4xl md:text-5xl font-semibold mb-2'>{item.value}</h2>

              {/* LABEL */}
              <p className='text-base md:text-lg opacity-90'>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
