import { useEffect } from 'react'

export default function RightSidebar({
  isOpen,
  onClose,
  title = 'Painel',
  children,
  footer,
  widthClass = 'w-full max-w-xl',
  closeOnOverlay = true,
  lockScroll = true,
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    if (lockScroll) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (lockScroll) {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, onClose, lockScroll])

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute right-0 top-0 h-full border-l border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40 transition-transform duration-200 ${widthClass} ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <h2 className="text-base font-semibold tracking-tight text-zinc-100">{title}</h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            >
              Fechar
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

          {footer ? <footer className="border-t border-zinc-800 px-5 py-4">{footer}</footer> : null}
        </div>
      </aside>
    </div>
  )
}
