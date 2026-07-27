"use client"

import { useState } from "react"

interface InteractivePricingProps {
  priceDefault?: string | null
  priceOnline?: string | null
  priceOffline?: string | null
}

export function InteractivePricing({ priceDefault, priceOnline, priceOffline }: InteractivePricingProps) {
  const options = []
  if (priceOffline) options.push({ label: "Offline", value: priceOffline })
  if (priceOnline) options.push({ label: "Online", value: priceOnline })
  
  const [selected, setSelected] = useState(options[0]?.label)

  if (options.length === 0) {
    return <p className="text-3xl font-extrabold text-comfindo-green">{priceDefault || "Hubungi Kami"}</p>
  }

  const selectedPrice = options.find(o => o.label === selected)?.value

  return (
    <div className="space-y-4">
      {options.length > 1 && (
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setSelected(opt.label)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                selected === opt.label 
                  ? "bg-white text-comfindo-green shadow-sm border border-gray-200/50" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      
      <div 
        key={selected} // Forces re-render animation
        className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out"
      >
        <p className="text-3xl font-extrabold text-comfindo-green">{selectedPrice}</p>
        <p className="text-xs text-gray-400 mt-1">Biaya Pelatihan {selected}</p>
      </div>
    </div>
  )
}
