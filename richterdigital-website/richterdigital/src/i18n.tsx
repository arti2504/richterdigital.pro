import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Lang = 'de' | 'en';

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; toggle: () => void }>({
  lang: 'de',
  setLang: () => {},
  toggle: () => {},
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try { return localStorage.getItem('lang') === 'en' ? 'en' : 'de'; } catch { return 'de'; }
  });
  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch { /* ignore */ }
    document.documentElement.lang = lang;
  }, [lang]);
  const toggle = () => setLang((l) => (l === 'de' ? 'en' : 'de'));
  return <LangCtx.Provider value={{ lang, setLang, toggle }}>{children}</LangCtx.Provider>;
};

export const useLang = () => useContext(LangCtx);

export function tr<T>(lang: Lang, de: T, en: T): T {
  return lang === 'de' ? de : en;
}
