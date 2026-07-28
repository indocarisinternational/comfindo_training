"use client"

/**
 * Client component untuk menampilkan gambar training dengan fallback.
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
    // Fallback placeholder yang lebih menarik
    return (
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${className}`}>
        {/* Icon placeholder */}
        <svg
          className="h-10 w-10 text-comfindo-green opacity-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
        <span className="text-comfindo-green opacity-25 text-xs font-semibold text-center px-4 select-none">
          {category}
        </span>
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={title}
      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${className}`}
      onError={(e) => {
        ;(e.target as HTMLImageElement).style.display = "none"
      }}
    />
  )
}

