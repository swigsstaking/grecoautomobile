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
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta property="og:description" content={seo.ogDescription || seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteInfo.siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta name="twitter:description" content={seo.ogDescription || seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={seo.canonical} />
      
      {/* Language */}
      <html lang={siteInfo.language || 'fr'} />
    </Helmet>
  );
};

export default SEOHead;
