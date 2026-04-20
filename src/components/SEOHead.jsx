import { Helmet } from 'react-helmet-async';
import { useSEO } from '../hooks/useSEO';
import { useSiteInfo } from '../hooks/useSiteInfo';

const SEOHead = ({ page = 'home' }) => {
  const seo = useSEO(page);
  const siteInfo = useSiteInfo();

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords?.join(', ')} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta property="og:description" content={seo.ogDescription || seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteInfo.siteName} />
      <meta property="og:locale" content="fr_CH" />
      <meta property="og:locale:alternate" content="it_CH" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta name="twitter:description" content={seo.ogDescription || seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />

      {/* Canonical & hreflang */}
      <link rel="canonical" href={seo.canonical} />
      <link rel="alternate" hreflang="fr" href={seo.canonical} />
      <link rel="alternate" hreflang="it" href={seo.canonical} />
      <link rel="alternate" hreflang="de" href={seo.canonical} />
      <link rel="alternate" hreflang="x-default" href={seo.canonical} />

      {/* Language */}
      <html lang={siteInfo.language || 'fr'} />

      {/* JSON-LD LocalBusiness / AutoDealer (homepage only) */}
      {page === 'home' && (
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          "@id": "https://grecoautogroup.ch/#organization",
          "name": "Greco Autogroup",
          "alternateName": "Greco Auto Group",
          "description": seo.description,
          "url": "https://grecoautogroup.ch",
          "logo": "https://grecoautogroup.ch/logo.png",
          "image": seo.ogImage,
          "telephone": "+41791919089",
          "email": "info@grecoautogroup.ch",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rue des Aprages 2",
            "addressLocality": "Ardon",
            "postalCode": "1957",
            "addressRegion": "VS",
            "addressCountry": "CH"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 46.204933,
            "longitude": 7.2686508
          },
          "hasMap": "https://www.google.com/maps/place/Greco+Auto+Group/@46.204933,7.2686508,17z/data=!4m6!3m5!1s0x478ec5c829a2b641:0xfaed480cb0b961a9!8m2!3d46.204933!4d7.2686508!16s%2Fg%2F11z5rspzkh",
          "areaServed": [
            { "@type": "State", "name": "Valais" },
            { "@type": "Country", "name": "Suisse" },
          ],
          "priceRange": "$$",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "17:00"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services automobile",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Achat de véhicules" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vente de véhicules neufs et d'occasion" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dépôt-vente" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Recherches personnalisées" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Partenariats mécanique et carrosserie" } },
            ]
          },
          "sameAs": [
            "https://www.google.com/maps/place/Greco+Auto+Group/@46.204933,7.2686508,17z/data=!4m6!3m5!1s0x478ec5c829a2b641:0xfaed480cb0b961a9!8m2!3d46.204933!4d7.2686508!16s%2Fg%2F11z5rspzkh",
            siteInfo.social?.facebook,
            siteInfo.social?.instagram,
          ].filter(Boolean)
        })}</script>
      )}

      {/* Website schema (all pages) */}
      {page === 'home' && (
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://grecoautogroup.ch/#website",
          "url": "https://grecoautogroup.ch",
          "name": "Greco Autogroup",
          "description": seo.description,
          "publisher": { "@id": "https://grecoautogroup.ch/#organization" },
          "inLanguage": ["fr-CH", "it-CH", "de-CH"],
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://grecoautogroup.ch/vehicules?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
