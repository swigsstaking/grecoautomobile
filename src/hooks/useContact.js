import { useMutation } from '@tanstack/react-query';
import seoData from '../data/seo.json';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

export const useContact = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`${API_URL}/public/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          siteSlug: seoData.site.slug,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'envoi');
      }
      
      return response.json();
    },
  });
};
