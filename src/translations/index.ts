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
  return 'en'
}
