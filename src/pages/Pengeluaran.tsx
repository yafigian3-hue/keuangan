import { useState } from "react"
import type { PengeluaranItem } from "../types/keuangan"

type Props = {
  data: PengeluaranItem[]
  onAdd: (item: PengeluaranItem) => void
  onDelete: (id: string) => void
}

export default function Pengeluaran({ data, onAdd, onDelete }: Props) {
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pengeluaran</h1>

      {/* FORM */}
      <div className="flex flex-col mb-6">
        <input
          type="number"
          placeholder="Jumlah"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mb-2"
        />

        <input
          type="text"
          placeholder="Alasan"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border p-2 mb-4"
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            onAdd({
              id: crypto.randomUUID(),
              amount: Number(amount),
              reason,
            })
            setAmount("")
            setReason("")
          }}
        >
          Simpan
        </button>
      </div>

      {/* LIST */}
      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={item.id}
            className="flex justify-between bg-white p-3 rounded shadow"
          >
            <div>
              <p className="font-semibold">
                Rp {item.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{item.reason}</p>
            </div>

            <button
              className="text-red-500"
              onClick={() => onDelete(item.id)}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
