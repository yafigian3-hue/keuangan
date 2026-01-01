import { useState } from "react"

type Props = {
  onAdd: (amount: number) => void
}

export default function Pemasukan({ onAdd }: Props) {
  const [amount, setAmount] = useState("")

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Tambah Pemasukan
      </h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => {
          onAdd(Number(amount))
          setAmount("")
        }}
      >
        Simpan
      </button>
    </div>
  )
}
