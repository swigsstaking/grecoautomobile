import seoData from '../data/seo.json';

export const useSEO = (page = 'home') => {
  return seoData.pages[page] || seoData.pages.home;
};
