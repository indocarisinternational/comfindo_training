"use client"

import { useState } from "react"

interface InteractivePricingProps {
  priceDefault?: string | null
  priceOnline?: string | null
  priceOffline?: string | null
}

export function InteractivePricing({ priceDefault, priceOnline, priceOffline }: InteractivePricingProps) {
  // Build all tabs (always both, even if one is missing)
  const hasBoth = !!(priceOnline && priceOffline)
  const hasOnlyOne = !hasBoth && (priceOnline || priceOffline)

  const [selected, setSelected] = useState<"Offline" | "Online">(
    priceOffline ? "Offline" : "Online"
  )

  // Case: no price at all — fallback
  if (!priceOnline && !priceOffline) {
    return (
      <div>
        <p className="text-3xl font-extrabold text-comfindo-green">{priceDefault || "Hubungi Kami"}</p>
        <p className="text-xs text-gray-400 mt-1">Biaya Pelatihan</p>
      </div>
    )
  }

  // Case: only one price available — no toggle, just show it
  if (hasOnlyOne) {
    const modeLabel = priceOffline ? "Offline" : "Online"
    const price = priceOffline || priceOnline
    return (
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-comfindo-green/10 rounded-full">
          <span className="text-xs font-semibold text-comfindo-green">{modeLabel}</span>
        </div>
        <p className="text-3xl font-extrabold text-comfindo-green">{price}</p>
        <p className="text-xs text-gray-400">Biaya Pelatihan {modeLabel}</p>
      </div>
    )
  }

  // Case: both prices available — show toggle
  const tabs: Array<"Offline" | "Online"> = ["Offline", "Online"]
  const priceMap: Record<"Offline" | "Online", string | null | undefined> = {
    Offline: priceOffline,
    Online: priceOnline,
  }
  const selectedPrice = priceMap[selected]

  return (
    <div className="space-y-4">
      <div className="flex bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelected(tab)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              selected === tab
                ? "bg-white text-comfindo-green shadow-sm border border-gray-200/50"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        key={selected}
        className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out"
      >
        {selectedPrice ? (
          <>
            <p className="text-3xl font-extrabold text-comfindo-green">{selectedPrice}</p>
            <p className="text-xs text-gray-400 mt-1">Biaya Pelatihan {selected}</p>
          </>
        ) : (
          <>
            <p className="text-base font-semibold text-gray-500">Kelas {selected} tidak tersedia</p>
            <p className="text-xs text-gray-400 mt-1">
              Silahkan hubungi admin untuk informasi lebih lanjut.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
