import { createContext, useContext, useState, useCallback } from 'react';
import translations from './translations';

const LanguageContext = createContext();

const SUPPORTED_LANGS = ['fr', 'it', 'de'];
const DEFAULT_LANG = 'fr';

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('greco-lang');
    return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
  });

  const setLang = useCallback((newLang) => {
    if (SUPPORTED_LANGS.includes(newLang)) {
      setLangState(newLang);
      localStorage.setItem('greco-lang', newLang);
      document.documentElement.lang = newLang;
    }
  }, []);

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations[DEFAULT_LANG]?.[key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, SUPPORTED_LANGS }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
};
