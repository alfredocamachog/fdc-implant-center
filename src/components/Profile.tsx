import type { Translations } from '../translations'

export default function Profile({ t }: { t: Translations }) {
  return (
    <section className="section profile" id="equipo">
      <div className="profile__bio">
        <p className="eyebrow">{t.profile.eyebrow}</p>
        <h2>{t.profile.title}</h2>
        <p>{t.profile.description}</p>
        <ul>
          {t.profile.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="profile__card">
        <p className="profile__quote">"{t.profile.quote}"</p>
        <span>{t.profile.credential}</span>
      </div>
    </section>
  )
}
