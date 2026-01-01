import { useState } from "react"
import Sidebar from "../components/Sidebar"
import { Menu } from "lucide-react"

type Props = {
  children: React.ReactNode
  page: string
  onNavigate: (page: string) => void
}

export default function MainLayout({ children, page, onNavigate }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-40 flex sm:hidden">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-50 w-64 bg-white">
            <Sidebar page={page} onNavigate={(p) => {
              onNavigate(p)
              setOpen(false)
            }} />
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden sm:block w-64 shrink-0">
        <Sidebar page={page} onNavigate={onNavigate} />
      </aside>

      <main className="flex-1">
        {/* MOBILE TOP BAR */}
        <div className="sm:hidden p-4 bg-white shadow flex items-center">
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="ml-4 font-bold">Keuangan</h1>
        </div>

        {children}
      </main>
    </div>
  )
}
