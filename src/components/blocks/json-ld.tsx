// Structured data for search engines — built only from facts already
// published elsewhere on the site (contact-main.tsx's CONTACT_CARDS,
// services-section.tsx's real price spread). No address/geo/rating fields:
// none of that exists in the codebase, so none is invented here.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sitzey",
  description:
    "Website design & development studio for small businesses. No packages bolted together from templates — every project is scoped and hand-built for what your business actually does.",
  url: "https://sitzey.com.hr",
  email: "sitzeyco@gmail.com",
  telephone: "+385924209234",
  priceRange: "€250–€1,800",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
    />
  );
}
