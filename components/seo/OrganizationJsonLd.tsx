export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ConsultingService",
    "name": "MSI Consulting",
    "url": "https://msiconsulting.com",
    "logo": "https://msiconsulting.com/logo.png", // Placeholder
    "description": "Jasa Konsultasi ISO 9001, 14001, 45001, 27001 dan Training Profesional.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Jendral Sudirman No. Kav 52-53",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12190",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-812-3456-7890",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/msiconsulting",
      "https://www.instagram.com/msiconsulting",
      "https://www.linkedin.com/company/msiconsulting"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
