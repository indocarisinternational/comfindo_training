"use client"

import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Upload, Link as LinkIcon, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  bucket?: string
  folder?: string
  label?: string
  previewHeight?: string
}

export function ImageUploader({
  value,
  onChange,
  bucket = "images",
  folder = "uploads",
  label = "Gambar",
  previewHeight = "h-40",
}: ImageUploaderProps) {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [tab, setTab] = useState<"url" | "upload">("url")
  const [urlInput, setUrlInput] = useState(value || "")
  const [imgError, setImgError] = useState(false)

  // Sync urlInput + reset error saat value berubah dari luar (misal saat edit page load data)
  useEffect(() => {
    setUrlInput(value || "")
    setImgError(false)
  }, [value])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (JPG, PNG, WebP, dll)")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 5MB")
      return
    }

    setUploading(true)
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filename, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(bucket).getPublicUrl(filename)
      onChange(data.publicUrl)
      setUrlInput(data.publicUrl)
      setImgError(false)
      toast.success("Gambar berhasil diupload!")
    } catch (error: any) {
      toast.error("Gagal upload gambar", { description: error.message })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  function handleUrlApply() {
    setImgError(false)
    onChange(urlInput)
  }

  function handleClear() {
    onChange("")
    setUrlInput("")
    setImgError(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Unique ID to avoid conflicts when multiple uploaders exist on the same page
  const inputId = `img-upload-${bucket}-${folder}`

  return (
    <div className="space-y-3">
      {/* Tab Toggle */}
      <div className="flex rounded-lg border border-[var(--border)] overflow-hidden w-fit">
        <button
          type="button"
          onClick={() => setTab("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            tab === "url"
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
          }`}
        >
          <LinkIcon className="h-3 w-3" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            tab === "upload"
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
          }`}
        >
          <Upload className="h-3 w-3" />
          Upload
        </button>
      </div>

      {/* URL Tab */}
      {tab === "url" && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/gambar.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlApply())}
            className="text-sm"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUrlApply}
            className="shrink-0"
          >
            Terapkan
          </Button>
        </div>
      )}

      {/* Upload Tab */}
      {tab === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id={inputId}
          />
          <label
            htmlFor={inputId}
            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[var(--border)] rounded-lg p-6 cursor-pointer transition-colors hover:border-[var(--primary)] hover:bg-[var(--muted)] ${
              uploading ? "pointer-events-none opacity-60" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
                <span className="text-sm text-[var(--muted-foreground)]">Mengupload...</span>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 text-[var(--muted-foreground)]" />
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--foreground)]">Klik untuk pilih gambar</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">JPG, PNG, WebP – Maks. 5MB</p>
                </div>
              </>
            )}
          </label>
        </div>
      )}

      {/* Preview */}
      {value && !imgError ? (
        <div className="relative">
          <img
            src={value}
            alt={label}
            className={`w-full ${previewHeight} object-cover rounded-lg border border-[var(--border)]`}
            onError={() => setImgError(true)}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            title="Hapus gambar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className={`flex items-center justify-center border border-[var(--border)] rounded-lg ${previewHeight} bg-[var(--muted)]`}>
          <div className="text-center">
            <ImageIcon className="h-8 w-8 mx-auto text-[var(--muted-foreground)] mb-1" />
            <p className="text-xs text-[var(--muted-foreground)]">
              {imgError ? "Gagal memuat gambar" : "Belum ada gambar"}
            </p>
            {value && imgError && (
              <button
                type="button"
                onClick={handleClear}
                className="mt-1 text-xs text-red-400 hover:text-red-600 underline"
              >
                Hapus URL
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
