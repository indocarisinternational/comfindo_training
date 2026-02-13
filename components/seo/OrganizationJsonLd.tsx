export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "comfindo Management",
    "url": "https://comfindomanagement.com",
    "logo": "https://comfindomanagement.com/logo.png",
    "description": "Lembaga pelatihan dan sertifikasi. Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Kompetensi Bersertifikat BNSP dan Non BNSP.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Perkantoran Tanjung Mas Raya Blok B1 No.44, Tanjung Barat",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12530",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-858-7066-3856",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100083385664789",
      "https://www.instagram.com/comfindo.management/",
      "http://www.linkedin.com/company/comfindomanagement",
      "https://www.youtube.com/channel/UCIHuMFAhGwBsx-Q_1kRdWaQ"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
