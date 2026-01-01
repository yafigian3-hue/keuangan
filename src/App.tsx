import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pemasukan from "./pages/Pemasukan";
import Pengeluaran from "./pages/Pengeluaran";
import type { PengeluaranItem } from "./types/keuangan";

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [pemasukan, setPemasukan] = useState<number[]>([]);
  const [pengeluaran, setPengeluaran] = useState<PengeluaranItem[]>([]);

  // 1️⃣ LOAD dari localStorage (sekali)
  useEffect(() => {
    try {
      const savedPemasukan = localStorage.getItem("pemasukan");
      const savedPengeluaran = localStorage.getItem("pengeluaran");

      if (savedPemasukan) {
        const parsed = JSON.parse(savedPemasukan);
        if (Array.isArray(parsed)) {
          setPemasukan(parsed.map(Number));
        }
      }

      if (savedPengeluaran) {
        const parsed = JSON.parse(savedPengeluaran);
        if (Array.isArray(parsed)) {
          const normalized: PengeluaranItem[] = parsed.map((item: any) =>
            typeof item === "number"
              ? { id: crypto.randomUUID(),
                amount: item,
                reason: "Pengeluaran Lama"
               }
              : {
                  id: item.id ?? crypto.randomUUID(),
                  amount: Number(item.amount) || 0,
                  reason: item.reason || "-",
                }
          );
          setPengeluaran(normalized);
        }
      }
    } catch {
      localStorage.removeItem("pemasukan");
      localStorage.removeItem("pengeluaran");
    }
  }, []);

  // 2️⃣ SAVE pemasukan
  useEffect(() => {
    localStorage.setItem("pemasukan", JSON.stringify(pemasukan));
  }, [pemasukan]);

  // 3️⃣ SAVE pengeluaran
  useEffect(() => {
    localStorage.setItem("pengeluaran", JSON.stringify(pengeluaran));
  }, [pengeluaran]);

  const totalMasuk = pemasukan.reduce((a, b) => a + b, 0);
  const totalKeluar = pengeluaran.reduce(
    (total, item) => total + item.amount,
    0
  );
  const saldo = totalMasuk - totalKeluar;

  return (
    <MainLayout page={page} onNavigate={setPage}>
      {page === "Dashboard" && (
        <Dashboard
          saldo={saldo}
          totalMasuk={totalMasuk}
          totalKeluar={totalKeluar}
          pengeluaran={pengeluaran}
        />
      )}

      {page === "Pemasukan" && (
        <Pemasukan
          onAdd={(amount) => {
            const value = Number(amount);
            if (!isNaN(value) && value > 0) {
              setPemasukan((prev) => [...prev, value]);
            }
          }}
        />
      )}

      {page === "Pengeluaran" && (
        <Pengeluaran
          data={pengeluaran}
          onAdd={(item) =>
            setPengeluaran((prev) => [...prev, item])
          }
          onDelete={(id) => 
            setPengeluaran((prev) =>
            prev.filter((item) => item.id !== id))
          }
        />
      )}
    </MainLayout>
  );
}
