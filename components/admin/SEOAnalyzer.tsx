"use client"

import { useMemo } from "react"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { AdminCard as Card, AdminCardContent as CardContent, AdminCardHeader as CardHeader, AdminCardTitle as CardTitle } from "@/components/admin/ui/AdminCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SEOAnalyzerProps {
  focusKeyword: string;
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  content: string; // HTML content
}

type CheckResult = {
  status: "good" | "warning" | "error";
  message: string;
}

const POWER_WORDS = ["panduan", "lengkap", "terbaik", "rahasia", "cara", "tips", "terbukti", "mudah", "cepat", "gratis", "sukses", "contoh", "baru", "terbaru", "trik", "strategi", "ampuh", "paling"];

export function SEOAnalyzer({
  focusKeyword,
  title,
  slug,
  seoTitle,
  seoDescription,
  content
}: SEOAnalyzerProps) {
  
  const keyword = focusKeyword.trim().toLowerCase();
  const textContent = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
  const effectiveTitle = seoTitle || title;

  // --- BASIC SEO ---
  const basicChecks = useMemo(() => {
    const checks: CheckResult[] = [];
    
    // Word Count
    if (wordCount < 300) {
      checks.push({ status: "warning", message: `Teks hanya ${wordCount} kata. Disarankan > 300 kata untuk peringkat SEO maksimal.` });
    } else {
      checks.push({ status: "good", message: `Panjang teks sangat baik (${wordCount} kata).` });
    }

    // Title Length
    if (effectiveTitle.length === 0) {
      checks.push({ status: "error", message: "SEO Title tidak boleh kosong." });
    } else if (effectiveTitle.length < 30) {
      checks.push({ status: "warning", message: "SEO Title terlalu pendek (< 30 karakter)." });
    } else if (effectiveTitle.length > 60) {
      checks.push({ status: "warning", message: "SEO Title terlalu panjang (> 60 karakter)." });
    } else {
      checks.push({ status: "good", message: "Panjang SEO Title sangat ideal." });
    }

    // Description Length
    const descLength = seoDescription.length;
    if (descLength === 0) {
      checks.push({ status: "warning", message: "SEO Description masih kosong." });
    } else if (descLength < 120) {
      checks.push({ status: "warning", message: "SEO Description terlalu pendek (< 120 karakter)." });
    } else if (descLength > 156) {
      checks.push({ status: "warning", message: "SEO Description terlalu panjang (> 156 karakter)." });
    } else {
      checks.push({ status: "good", message: "Panjang SEO Description ideal." });
    }

    // Links Analysis (Internal vs External)
    const hasExternal = /<a\s+(?:[^>]*?\s+)?href=["']http/i.test(content);
    const hasInternal = /<a\s+(?:[^>]*?\s+)?href=["']\//i.test(content);
    
    if (hasExternal) {
      checks.push({ status: "good", message: "Terdapat External Link ke referensi luar (Bagus untuk otoritas)." });
    } else {
      checks.push({ status: "warning", message: "Tidak ada External Link ke situs kredibel lain." });
    }

    if (hasInternal) {
      checks.push({ status: "good", message: "Terdapat Internal Link untuk menurunkan bounce rate." });
    } else {
      checks.push({ status: "warning", message: "Sebaiknya tambahkan Internal Link ke halaman web lain di situs Anda." });
    }

    return checks;
  }, [wordCount, effectiveTitle, seoDescription, content]);


  // --- READABILITY ---
  const readabilityChecks = useMemo(() => {
    const checks: CheckResult[] = [];
    if (!content) {
      checks.push({ status: "warning", message: "Konten masih kosong untuk dianalisis." });
      return checks;
    }

    // Max Paragraph Length
    const paragraphs = content.match(/<p(?:[^>]*)>(.*?)<\/p>/gi) || [];
    let hasLongParagraph = false;
    paragraphs.forEach(p => {
      const pText = p.replace(/<[^>]*>/g, "").trim();
      const pWords = pText.split(/\s+/).filter(w => w.length > 0).length;
      if (pWords > 150) hasLongParagraph = true;
    });

    if (hasLongParagraph) {
      checks.push({ status: "error", message: "Ada paragraf yang melebihi 150 kata. Pecah menjadi paragraf yang lebih pendek agar mudah dibaca (terutama di HP)." });
    } else {
      checks.push({ status: "good", message: "Panjang tiap paragraf ideal (< 150 kata)." });
    }

    // Sentence Length (Simple heuristic)
    const sentences = textContent.split(/[.?!]\s/).filter(s => s.trim().length > 0);
    const longSentences = sentences.filter(s => s.split(/\s+/).length > 20).length;
    const longSentenceRatio = sentences.length > 0 ? longSentences / sentences.length : 0;

    if (longSentenceRatio > 0.25) {
      checks.push({ status: "warning", message: `Lebih dari 25% kalimat terlalu panjang (> 20 kata). Gunakan kalimat yang ringkas.` });
    } else {
      checks.push({ status: "good", message: "Panjang kalimat cukup baik dan mudah dipahami." });
    }

    // Subheading Distribution
    const headings = content.match(/<h[2-6](?:[^>]*)>(.*?)<\/h[2-6]>/gi) || [];
    if (wordCount > 300 && headings.length === 0) {
      checks.push({ status: "error", message: "Artikel > 300 kata belum menggunakan Subheading (H2/H3). Gunakan subheading untuk memecah teks." });
    } else if (headings.length > 0) {
      checks.push({ status: "good", message: "Penggunaan subheading membantu memecah teks dengan baik." });
    }

    return checks;
  }, [content, textContent, wordCount]);


  // --- TITLE & CTR ---
  const titleChecks = useMemo(() => {
    const checks: CheckResult[] = [];
    if (!effectiveTitle) return checks;

    const lowerTitle = effectiveTitle.toLowerCase();

    // Power words
    const hasPowerWord = POWER_WORDS.some(pw => lowerTitle.includes(pw));
    if (hasPowerWord) {
      checks.push({ status: "good", message: "Judul mengandung 'Power Words' yang memancing klik tinggi." });
    } else {
      checks.push({ status: "warning", message: "Coba tambahkan kata pemicu emosi (seperti: Cara, Terbaik, Panduan, dll) di judul untuk menaikkan CTR." });
    }

    // Numbers in title
    if (/\d/.test(effectiveTitle)) {
      checks.push({ status: "good", message: "Judul mengandung angka. Artikel listicle (daftar) biasanya lebih disukai pembaca." });
    } else {
      checks.push({ status: "warning", message: "Coba tambahkan angka di judul (mis: 7 Cara...) jika relevan, karena memiliki CTR lebih tinggi." });
    }

    // Keyword at the beginning of title
    if (keyword) {
      if (lowerTitle.startsWith(keyword)) {
        checks.push({ status: "good", message: "Focus Keyword berada tepat di awal judul (Sinyal terkuat untuk Google)." });
      } else if (lowerTitle.includes(keyword)) {
        checks.push({ status: "warning", message: "Focus Keyword ada di judul, tapi sebaiknya letakkan lebih awal (mendekati kata pertama)." });
      } else {
        checks.push({ status: "error", message: "Focus Keyword tidak ditemukan di SEO Title/Judul." });
      }
    }

    return checks;
  }, [effectiveTitle, keyword]);


  // --- KEYWORD PROMINENCE ---
  const keywordChecks = useMemo(() => {
    const checks: CheckResult[] = [];
    if (!keyword) {
      checks.push({ status: "error", message: "Focus Keyword belum diatur." });
      return checks;
    }

    // Slug
    const safeKeywordSlug = keyword.replace(/\s+/g, '-');
    if (slug.toLowerCase().includes(safeKeywordSlug)) {
      checks.push({ status: "good", message: "Focus Keyword ditemukan dalam URL / Slug." });
    } else {
      checks.push({ status: "warning", message: "Sebaiknya sertakan exact Focus Keyword di dalam URL Slug." });
    }

    // Description
    if (seoDescription.toLowerCase().includes(keyword)) {
      checks.push({ status: "good", message: "Focus Keyword ditemukan dalam SEO Description." });
    } else {
      checks.push({ status: "warning", message: "Focus Keyword belum dimasukkan di SEO Description." });
    }

    // First 50 words
    const first50Words = textContent.split(/\s+/).slice(0, 50).join(" ");
    if (first50Words.toLowerCase().includes(keyword)) {
      checks.push({ status: "good", message: "Focus Keyword muncul di awal artikel (50 kata pertama)." });
    } else {
      checks.push({ status: "error", message: "Focus Keyword harus muncul sedini mungkin (di paragraf pertama atau 50 kata awal)." });
    }

    // Keyword in Subheading (H2/H3)
    const headings = content.match(/<h[2-3](?:[^>]*)>(.*?)<\/h[2-3]>/gi) || [];
    const hasKeywordInHeading = headings.some(h => {
      const hText = h.replace(/<[^>]*>/g, "").toLowerCase();
      return hText.includes(keyword);
    });

    if (headings.length > 0 && hasKeywordInHeading) {
      checks.push({ status: "good", message: "Focus Keyword ditemukan pada setidaknya 1 sub-judul (H2/H3)." });
    } else if (headings.length > 0) {
      checks.push({ status: "warning", message: "Tambahkan Focus Keyword ke dalam salah satu Sub-judul (H2/H3) Anda." });
    }

    // Image Alt text
    const images = content.match(/<img(?:[^>]*)>/gi) || [];
    if (images.length > 0) {
      const hasKeywordInAlt = images.some(img => {
        const altMatch = img.match(/alt=["'](.*?)["']/i);
        return altMatch && altMatch[1].toLowerCase().includes(keyword);
      });
      if (hasKeywordInAlt) {
        checks.push({ status: "good", message: "Focus Keyword ditemukan dalam Atribut Alt gambar." });
      } else {
        checks.push({ status: "warning", message: "Sebaiknya tambahkan Focus Keyword pada atribut Alt di gambar Anda." });
      }
    }

    // Keyword density
    const keywordRegex = new RegExp(keyword, 'gi');
    const keywordMatches = textContent.match(keywordRegex);
    const keywordCount = keywordMatches ? keywordMatches.length : 0;
    
    if (keywordCount === 0) {
      checks.push({ status: "error", message: `Focus Keyword belum diketik di dalam artikel.` });
    } else {
      const density = (keywordCount / wordCount) * 100;
      if (density > 2.5) {
        checks.push({ status: "error", message: `Kepadatan keyword berlebih (${density.toFixed(1)}%). Hati-hati Over-optimization (Keyword Stuffing). Kurangi pengulangan kata kunci.` });
      } else if (density < 0.5) {
        checks.push({ status: "warning", message: `Kepadatan keyword terlalu rendah (${density.toFixed(1)}%). Sebar keyword Anda secara natural.` });
      } else {
        checks.push({ status: "good", message: `Kepadatan keyword ideal (${keywordCount} kali, ${density.toFixed(1)}%).` });
      }
    }

    return checks;
  }, [keyword, slug, seoDescription, textContent, content, wordCount]);


  const allChecks = [...basicChecks, ...readabilityChecks, ...titleChecks, ...keywordChecks];
  
  const score = useMemo(() => {
    const totalWeight = allChecks.length;
    let earned = 0;
    allChecks.forEach(c => {
      if (c.status === "good") earned += 1;
      else if (c.status === "warning") earned += 0.5;
    });
    return totalWeight > 0 ? Math.round((earned / totalWeight) * 100) : 0;
  }, [allChecks]);

  const scoreColor = score >= 80 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500";

  const renderChecks = (checks: CheckResult[]) => (
    <div className="space-y-3 mt-4">
      {checks.map((result, i) => (
        <div key={i} className="flex items-start gap-2 text-sm leading-tight">
          {result.status === "good" && <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />}
          {result.status === "warning" && <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />}
          {result.status === "error" && <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}
          <span className={
            result.status === "good" ? "text-muted-foreground" : 
            result.status === "warning" ? "text-[var(--foreground)]" : 
            "text-red-500 font-medium"
          }>
            {result.message}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">SEO OP Analyzer</CardTitle>
        <span className={`text-xl font-bold ${scoreColor}`}>{score}/100</span>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keyword" className="w-full">
          <TabsList className="w-full h-auto flex flex-wrap bg-transparent gap-1 border-b border-[var(--border)] rounded-none p-0 pb-1 mb-2">
            <TabsTrigger value="keyword" className="data-[state=active]:bg-[var(--accent)] data-[state=active]:text-[var(--accent-foreground)] rounded-md px-3 py-1.5 text-xs">Target</TabsTrigger>
            <TabsTrigger value="dasar" className="data-[state=active]:bg-[var(--accent)] data-[state=active]:text-[var(--accent-foreground)] rounded-md px-3 py-1.5 text-xs">Dasar</TabsTrigger>
            <TabsTrigger value="baca" className="data-[state=active]:bg-[var(--accent)] data-[state=active]:text-[var(--accent-foreground)] rounded-md px-3 py-1.5 text-xs">Baca</TabsTrigger>
            <TabsTrigger value="judul" className="data-[state=active]:bg-[var(--accent)] data-[state=active]:text-[var(--accent-foreground)] rounded-md px-3 py-1.5 text-xs">CTR</TabsTrigger>
          </TabsList>
          
          <TabsContent value="keyword">
            {renderChecks(keywordChecks)}
          </TabsContent>
          <TabsContent value="dasar">
            {renderChecks(basicChecks)}
          </TabsContent>
          <TabsContent value="baca">
            {renderChecks(readabilityChecks)}
          </TabsContent>
          <TabsContent value="judul">
            {renderChecks(titleChecks)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
