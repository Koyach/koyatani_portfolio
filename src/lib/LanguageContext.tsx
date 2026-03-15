"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { translations, type Locale } from "./translations";

type TranslationType = (typeof translations)[Locale];

interface LanguageContextType {
  locale: Locale;
  t: TranslationType;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "ja",
  t: translations.ja,
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ja");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "ja" ? "en" : "ja"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t: translations[locale], toggleLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
