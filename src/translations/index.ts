import { enTranslations } from './en'
import { esTranslations } from './es'

export type Language = 'es' | 'en'

export type Translations = typeof enTranslations

export const languages: Language[] = ['en', 'es']

// English is the source of truth; Spanish must provide every key it has.
export const translations: Record<Language, Translations> = {
  en: enTranslations,
  es: esTranslations satisfies Translations,
}

const STORAGE_KEY = 'fdc-lang'

export const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // Storage blocked (private mode): fall through to the default.
  }
  return 'en'
}

export const saveLanguage = (lang: Language) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Ignore: the choice just won't persist.
  }
}
