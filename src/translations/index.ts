import { esTranslations } from './es'
import { enTranslations } from './en'

export type Language = 'es' | 'en'

export type Translations = typeof esTranslations

export const languages: Language[] = ['es', 'en']

export const translations: Record<Language, Translations> = {
  es: esTranslations,
  en: enTranslations,
}

export const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('fdc-lang')
    if (stored === 'es' || stored === 'en') {
      return stored
    }
    const browserLang = window.navigator.language?.toLowerCase() ?? ''
    if (browserLang.startsWith('en')) {
      return 'en'
    }
  }
  return 'es'
}
