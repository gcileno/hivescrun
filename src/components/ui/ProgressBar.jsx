export default function ProgressBar({ value }) {
  return (
    <div className="w-full h-1.5 bg-[#1A141A] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#F4B315] to-[#E59312] transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}