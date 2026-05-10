type FeatureBoxProps = {
  icon: string
  title: string
  bg: string
  border: string
  iconColor: string
}

const FeatureBox = ({ icon, title, bg, border, iconColor }: FeatureBoxProps) => {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl border-l-8 ${bg} ${border}`}>
      <div className={`text-4xl ${iconColor}`}>{icon}</div>
      <h3 className='text-red-700 font-bold text-base'>{title}</h3>
    </div>
  )
}
export default FeatureBox
