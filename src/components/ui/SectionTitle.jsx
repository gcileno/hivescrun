export default function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-[#D3AF85] font-serif font-bold text-base tracking-wide">{children}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-[#D3AF85]/20 to-transparent" />
    </div>
  )
}