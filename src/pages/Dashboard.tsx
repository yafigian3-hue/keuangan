import type { PengeluaranItem } from "../types/keuangan"

type Props = {
  saldo: number
  totalMasuk: number
  totalKeluar: number
  pengeluaran: PengeluaranItem[]
}

export default function Dashboard({
  saldo,
  totalMasuk,
  totalKeluar,
  pengeluaran,
}: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Keuangan
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p>Saldo</p>
          <p className="text-2xl font-bold">
            Rp {saldo.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Masuk</p>
          <p className="text-2xl font-bold">
            Rp {totalMasuk.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Keluar</p>
          <p className="text-2xl font-bold">
            Rp {totalKeluar.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">Pengeluaran</h2>

        {pengeluaran.length === 0 && (
          <p className="text-gray-500">
            Belum ada pengeluaran
          </p>
        )}

        <ul className="space-y-2">
          {pengeluaran.map((item, index) => (
            <li
              key={index}
              className="flex justify-between border-b pb-1"
            >
              <span>{item.reason}</span>
              <span>
                Rp {item.amount.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
