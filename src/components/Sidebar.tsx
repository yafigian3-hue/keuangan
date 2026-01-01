import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react"

type Props = {
  page: string
  onNavigate: (page: string) => void
}

const menus = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Pemasukan", icon: ArrowDownCircle },
  { label: "Pengeluaran", icon: ArrowUpCircle },
]

export default function Sidebar({ page, onNavigate }: Props) {
  return (
    <aside className="min-h-screen p-4 border-r">
      <h2 className="text-xl font-bold mb-6">Keuangan</h2>

      <nav className="space-y-1">
        {menus.map((menu) => {
          const Icon = menu.icon
          const isActive = page === menu.label

          return (
            <button
              key={menu.label}
              onClick={() => onNavigate(menu.label)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }
              `}
            >
              <Icon size={18} />
              <span>{menu.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
