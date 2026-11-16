import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Translations } from '../translations'
import AboutLetter from './AboutLetter'
import Timeline, { byNewest, parsePeriod, type TimelineEntry } from './Timeline'

type TabKey = 'higherEducation' | 'coursesAndTalks' | 'workExperience'

const TAB_KEYS: TabKey[] = ['workExperience', 'higherEducation', 'coursesAndTalks']
const COURSES_PREVIEW = 6

export default function About({ t }: { t: Translations }) {
  const baseId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [activeTab, setActiveTab] = useState<TabKey>('workExperience')
  const [showAllCourses, setShowAllCourses] = useState(false)

  const { general, sections, tabs } = t.panel
  const courses = sections.coursesAndTalks.items
  const internationalCount = courses.filter((course) => course.international).length
  const { work } = t.about

  const workEntries: TimelineEntry[] = byNewest(
    sections.workExperience.items.map((job) => {
      const { start, end, ongoing } = parsePeriod(job.period)
      return {
        key: `${job.clinic}-${job.period}`,
        start,
        end,
        endLabel: ongoing ? work.present : undefined,
        tags: ongoing ? [{ text: work.current }] : undefined,
        title: job.clinic,
        subtitle: job.role,
        details: [
          { icon: 'pin' as const, text: job.location },
          ...(job.supervisor ? [{ icon: 'person' as const, text: job.supervisor }] : []),
        ],
        // An ongoing role has no final length yet, so it gets no duration bar.
        years: ongoing ? undefined : Math.max(end - start, 1),
      }
    })
  )

  const educationEntries: TimelineEntry[] = byNewest(
    sections.higherEducation.items.map((item) => {
      const { start, end } = parsePeriod(item.period)
      return {
        key: `${item.title}-${item.period}`,
        start,
        end,
        title: item.title,
        subtitle: item.institution.replace(/\.$/, ''),
        years: Math.max(end - start, 1),
      }
    })
  )

  const courseEntries: TimelineEntry[] = byNewest(
    courses.map((course) => ({
      key: `${course.title}-${course.subtitle}`,
      end: course.year,
      title: course.title,
      tags: [
        { text: work.kinds[course.kind] },
        ...(course.international ? [{ text: t.about.internationalBadge, tone: 'soft' as const }] : []),
      ],
      subtitle: course.subtitle,
      details: [
        ...(course.place ? [{ icon: 'pin' as const, text: course.place }] : []),
        ...(course.topic ? [{ icon: 'topic' as const, text: course.topic }] : []),
      ],
    }))
  )
  const visibleCourses = showAllCourses ? courseEntries : courseEntries.slice(0, COURSES_PREVIEW)

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
        <AboutLetter t={t} />

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
          {activeTab === 'workExperience' ? <Timeline entries={workEntries} durations={work} /> : null}

          {activeTab === 'higherEducation' ? <Timeline entries={educationEntries} durations={work} /> : null}

          {activeTab === 'coursesAndTalks' ? (
            <>
              <Timeline entries={visibleCourses} />
              {courses.length > COURSES_PREVIEW ? (
                <button type="button" className="about__more" aria-expanded={showAllCourses} onClick={() => setShowAllCourses((prev) => !prev)}>
                  {showAllCourses ? t.about.showLess : t.about.showAll.replace('{count}', String(courses.length))}
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
