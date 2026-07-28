"use client"

/**
 * Client component kecil untuk menampilkan gambar training dengan fallback.
 * Diperlukan karena onError adalah event handler yang tidak bisa dipakai
 * di React Server Components.
 */
interface TrainingCardImageProps {
  imageUrl?: string | null
  title: string
  category?: string
  className?: string
}

export function TrainingCardImage({ imageUrl, title, category, className = "" }: TrainingCardImageProps) {
  if (!imageUrl) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
        <div className="text-comfindo-green opacity-15 text-5xl font-black select-none">
          {category}
        </div>
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={title}
      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${className}`}
      onError={(e) => {
        // Fallback: sembunyikan gambar jika gagal load, placeholder gradient tetap terlihat
        ;(e.target as HTMLImageElement).style.display = "none"
      }}
    />
  )
}
