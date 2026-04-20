import { useQuery } from '@tanstack/react-query';
import seoData from '../data/seo.json';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

export const useSiteInfo = () => {
  const { data: apiData, isSuccess } = useQuery({
    queryKey: ['siteInfo', seoData.site.slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/sites/${seoData.site.slug}`);
      if (!response.ok) throw new Error('Failed to fetch site info');
      const json = await response.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  // Static fallback from seo.json
  const staticData = { ...seoData.site, ...seoData.global };

  // Only merge API data once it has loaded to avoid flash
  if (!isSuccess || !apiData) return staticData;

  // Deep merge contact and social to avoid losing static fields
  return {
    ...staticData,
    ...apiData,
    contact: { ...staticData.contact, ...apiData.contact },
    social: { ...staticData.social, ...apiData.social },
  };
};
