import { useQuery } from '@tanstack/react-query';
import seoData from '../data/seo.json';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

export const useSiteInfo = () => {
  // Récupérer les infos depuis l'API
  const { data: apiData } = useQuery({
    queryKey: ['siteInfo', seoData.site.slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/public/sites/${seoData.site.slug}`);
      if (!response.ok) throw new Error('Failed to fetch site info');
      const json = await response.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  // Fusionner les données de l'API avec les données statiques (fallback)
  return {
    ...seoData.site,
    ...seoData.global,
    ...apiData, // Les données de l'API écrasent les données statiques
  };
};
