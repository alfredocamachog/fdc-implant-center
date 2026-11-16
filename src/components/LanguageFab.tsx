import { languages, type Language } from '../translations'
import Flag from './Flag'

interface LanguageFabProps {
  language: Language
  setLanguage: (lang: Language) => void
}

// Mobile-only round button stacked above the WhatsApp one: shows the current language's flag; tapping switches.
export default function LanguageFab({ language, setLanguage }: LanguageFabProps) {
  const next = languages.find((code) => code !== language) ?? language
  return (
    <button
      type="button"
      className="language-fab"
      lang={next}
      aria-label={next === 'es' ? 'Cambiar a español' : 'Switch to English'}
      onClick={() => setLanguage(next)}
    >
      <span className="language-fab__flag">
        <Flag code={language} />
      </span>
    </button>
  )
}
