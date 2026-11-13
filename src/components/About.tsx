import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Translations } from '../translations'

type TabKey = 'higherEducation' | 'coursesAndTalks' | 'workExperience'

const TAB_KEYS: TabKey[] = ['higherEducation', 'coursesAndTalks', 'workExperience']
const COURSES_PREVIEW = 6

const isEuropeanCourse = (item: string) =>
  /(switzerland|suiza|germany|alemania|italy|italia|bern|berna|milan|mil[aá]n|campo tures|european)/i.test(item)

export default function About({ t }: { t: Translations }) {
  const baseId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [activeTab, setActiveTab] = useState<TabKey>('higherEducation')
  const [showAllCourses, setShowAllCourses] = useState(false)

  const { general, sections, tabs } = t.panel
  const courses = sections.coursesAndTalks.items
  const visibleCourses = showAllCourses ? courses : courses.slice(0, COURSES_PREVIEW)
  const internationalCount = courses.filter(isEuropeanCourse).length

  const facts = [
    { value: sections.higherEducation.items.length, label: t.about.facts.education },
    { value: courses.length, label: t.about.facts.courses },
    { value: internationalCount, label: t.about.facts.international },
  ]

  // WAI-ARIA tabs pattern: arrow keys move between tabs, Home/End jump to the ends.
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TAB_KEYS.length - 1
    let next: number | null = null
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last
    if (next === null) return
    event.preventDefault()
    setActiveTab(TAB_KEYS[next])
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="section about" id="sobre-mi" aria-labelledby={`${baseId}-title`}>
      <aside className="about__card">
        <div className="about__photo">
          <img src={t.heroPhoto.src} alt={t.heroPhoto.alt} width={623} height={642} loading="lazy" decoding="async" />
        </div>
        <div className="about__identity">
          <h3 className="about__name">{general.name}</h3>
          {general.roles.map((role) => (
            <p className="about__role" key={role}>
              {role}
            </p>
          ))}
          <p className="about__license">{general.license}</p>
        </div>
        <dl className="about__facts">
          {facts.map((fact) => (
            <div className="about__fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <div className="about__body">
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 id={`${baseId}-title`}>{t.about.title}</h2>
        <p className="about__intro">{t.about.intro}</p>

        <div className="about__tabs" role="tablist" aria-label={tabs.ariaLabel}>
          {TAB_KEYS.map((key, index) => {
            const selected = activeTab === key
            return (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                id={`${baseId}-tab-${key}`}
                className={`about__tab ${selected ? 'is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(key)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {tabs[key]}
              </button>
            )
          })}
        </div>

        <div className="about__panel" role="tabpanel" id={`${baseId}-panel-${activeTab}`} aria-labelledby={`${baseId}-tab-${activeTab}`} tabIndex={0}>
          {activeTab === 'higherEducation' ? (
            <ol className="about__timeline">
              {sections.higherEducation.items.map((item) => (
                <li key={`${item.title}-${item.period}`}>
                  <span className="about__period">{item.period}</span>
                  <p className="about__entry-title">{item.title}</p>
                  <p className="about__entry-meta">{item.institution}</p>
                </li>
              ))}
            </ol>
          ) : null}

          {activeTab === 'coursesAndTalks' ? (
            <>
              <ul className="about__courses">
                {visibleCourses.map((item) => {
                  const international = isEuropeanCourse(item)
                  return (
                    <li key={item} className={international ? 'is-international' : ''}>
                      {international ? <span className="about__badge">{t.about.internationalBadge}</span> : null}
                      <span>{item}</span>
                    </li>
                  )
                })}
              </ul>
              {courses.length > COURSES_PREVIEW ? (
                <button type="button" className="about__more" aria-expanded={showAllCourses} onClick={() => setShowAllCourses((prev) => !prev)}>
                  {showAllCourses ? t.about.showLess : t.about.showAll.replace('{count}', String(courses.length))}
                </button>
              ) : null}
            </>
          ) : null}

          {activeTab === 'workExperience' ? (
            <ol className="about__timeline">
              {sections.workExperience.items.map((item) => (
                <li key={`${item.clinic}-${item.period}`}>
                  <span className="about__period">{item.period}</span>
                  <p className="about__entry-title">{item.clinic}</p>
                  <p className="about__entry-meta">{item.role}</p>
                  <p className="about__entry-meta">
                    {item.location}
                    {item.supervisor ? ` · ${item.supervisor}` : ''}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </section>
  )
}
