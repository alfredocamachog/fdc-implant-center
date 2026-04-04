import { useEffect, useState } from 'react'

import './style.css'



type Language = 'es' | 'en'

const languages: Language[] = ['es', 'en']



const getInitialLanguage = (): Language => {

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



const translations = {

  es: {

    brand: {

      title: 'Dr. Fernando Del Corro',

      tagline: 'Prosthodontics & Implants'

    },

    languageToggle: {

      ariaLabel: 'Cambiar idioma entre español e inglés'

    },

    navigation: {

      open: 'Abrir menú principal',

      close: 'Cerrar menú principal'

    },

    navLinks: [

      { label: 'Inicio', href: '#inicio' },

      { label: 'Servicios', href: '#servicios' },

      { label: 'Metodología', href: '#metodologia' },

      { label: 'Casos', href: '#casos' },

      { label: 'Equipo', href: '#equipo' },

      { label: 'Contacto', href: '#contacto' }

    ],

    hero: {

      eyebrow: 'Prostodoncia avanzada',

      title: 'Rehabilitación oral de alta precisión para sonrisas funcionales y elegantes',

      lead:

        'Diseñamos planes integrales en prostodoncia avanzada, implantes y estética dental que priorizan biomecánica, fonética y mantenimiento a largo plazo. Cada decisión se respalda con diagnóstico digital y laboratorio propio.',

      primaryCta: 'Agenda una valoración',

      secondaryCta: 'Conoce nuestros protocolos'

    },

    heroStats: [

      { label: 'Casos de rehabilitación total', value: '+480' },

      { label: 'Implantes guiados digitalmente', value: '1,200' },

      { label: 'Índice de satisfacción anual', value: '98%' }

    ],

    heroPhoto: {

      src: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=900&q=70',

      alt: 'Paciente en clínica de implantología recibiendo atención personalizada',

      caption: 'Laboratorio digital in-house para cada rehabilitación.'

    },

    panel: {

      title: 'Dr. Fernando Del Corro',

      subtitle: 'Prostodoncista certificado · UANL',

      bullets: [

        'Fellow del American College of Prosthodontists',

        'Docente invitado en protocolos All-on-X',

        'Laboratorio digital integrado en clínica'

      ],

      contactLabel: 'Coordinación clínica',

      phone: 'Tel. +52 (631) 144 0368',

      email: 'coordinacion@fdcprostho.com',

      address: 'Blvd. Hidalgo 102, Hermosillo · Consultorio 504'

    },

    services: {

      eyebrow: 'Protocolos clínicos',

      title: 'Soluciones personalizadas para cada biotipo óseo',

      intro:

        'Integramos diagnóstico digital, laboratorio propio y controles en consultorio para entregar rehabilitaciones durables sin exceder los tiempos clínicos necesarios.',

      items: [

        {

          title: 'Prótesis fija y estética integral',

          description:

            'Diseño y colocación de coronas, puentes y carillas que devuelven función y armonía facial sin sacrificar estructuras sanas.',

          points: ['Cerámicas de última generación', 'Escaneo intraoral sin impresiones convencionales', 'Protocolos de color personalizados']

        },

        {

          title: 'Implantes de carga inmediata',

          description:

            'Planificación 3D y guías quirúrgicas para colocar implantes y prótesis provisionales el mismo día en casos seleccionados.',

          points: ['Planeación conjunta con cirujano', 'Control de oclusión en 24 h', 'Seguimiento intensivo post-operatorio']

        },

        {

          title: 'Rehabilitación completa All-on-X',

          description:

            'Restauraciones fijas para maxilares totalmente edéntulos que priorizan estabilidad, fonética y mantenimiento sencillo.',

          points: ['Carga híbrida atornillada', 'Selección estratégica de pilares', 'Programas de mantenimiento trimestral']

        },

        {

          title: 'Prótesis sobre dientes e implantes combinados',

          description:

            'Soluciones mixtas para pacientes con dientes remanentes estratégicos y necesidad de soporte implantológico.',

          points: ['Análisis periodontal previo', 'Equilibrio oclusal progresivo', 'Educación del paciente en higiene avanzada']

        }

      ]

    },

    methodology: {

      eyebrow: 'Metodología',

      title: 'Transparencia clínica en cuatro etapas',

      steps: [

        {

          title: 'Evaluación diagnóstica exhaustiva',

          detail: 'Tomografía, fotodocumentación y análisis funcional para anticipar riesgos biomecánicos y estéticos.'

        },

        {

          title: 'Plan maestro interdisciplinario',

          detail: 'Coordinamos ortodoncia, periodoncia y cirugía para que cada fase respalde la prótesis definitiva.'

        },

        {

          title: 'Rehabilitación guiada',

          detail: 'Mock-ups funcionales, pruebas fonéticas y prototipos CAD/CAM aseguran confort antes de la prótesis final.'

        },

        {

          title: 'Acompañamiento vitalicio',

          detail: 'Programas de mantenimiento y monitoreo remoto para preservar tejidos y la inversión del paciente.'

        }

      ]

    },

    gallery: {

      eyebrow: 'Entorno clínico',

      title: 'Imágenes que hablan de procesos y cuidado',

      intro: 'Combinamos estudio fotográfico, laboratorio y operatoria para documentar cada etapa de tu plan.',

      items: [

        {

          src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=70',

          caption: 'Planeación digital guiada'

        },

        {

          src: 'https://images.unsplash.com/photo-1470881681242-5f912ebf00cd?auto=format&fit=crop&w=900&q=70',

          caption: 'Laboratorio boutique con control cromático'

        },

        {

          src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70',

          caption: 'Atención personalizada en operatoria'

        }

      ]

    },

    cases: {

      eyebrow: 'Casos destacados',

      title: 'Resultados medibles que devuelven funcionalidad',

      tagline: 'Plan personalizado',

      cards: [

        {

          name: 'Rejuvenecimiento completo Maxilar Superior',

          result: 'Paciente retoma actividades sociales sin limitaciones fonéticas.',

          metrics: ['5 implantes + prótesis híbrida', 'Tiempo clínico: 10 semanas', 'Control de seguimiento 12 meses']

        },

        {

          name: 'Rehabilitación combinada Funcional-Estética',

          result: 'Se integran dientes remanentes y nuevos implantes manteniendo propriocepción.',

          metrics: ['6 coronas cerámicas', '3 implantes guiados', 'Plazo total: 14 semanas']

        }

      ]

    },

    testimonials: {

      eyebrow: 'Experiencias',

      title: 'Pacientes que vuelven a sonreír con confianza',

      items: [

        {

          quote:

            'Pude volver a sonreír en eventos corporativos sin preocuparme por mis provisionales. El equipo explicó cada etapa y respetó mis tiempos.',

          author: 'Mariana G., Ejecutiva Legal'

        },

        {

          quote:

            'Después de perder piezas por bruxismo encontré un plan que priorizó la función. Hoy mastico con estabilidad y duermo con tranquilidad.',

          author: 'Ing. Rafael L.'

        },

        {

          quote:

            'Agradezco la claridad financiera y clínica: cada visita tenía un propósito y los controles digitales facilitan mi seguimiento desde Hermosillo.',

          author: 'Dra. Sonia V., Ginecóloga'

        }

      ]

    },

    profile: {

      eyebrow: 'Equipo clínico',

      title: 'Atención liderada por un prostodoncista certificado',

      description:

        'El Dr. Del Corro cuenta con especialidad en Prostodoncia, diplomado en Implantología Oral y formación continua en rehabilitación integral. Su práctica integra fotografía clínica, escaneo intraoral, planeación CAD/CAM y un laboratorio boutique que reduce tiempos de entrega sin sacrificar detalle artesanal.',

      bullets: [

        'Miembro activo de la Asociación Mexicana de Rehabilitación Oral',

        'Speaker en foros de carga inmediata y manejo de tejidos blandos',

        'Programas anuales de educación para odontólogos referidores'

      ],

      quote:

        'Cada implante y cada prótesis cuentan una historia funcional. Nuestra responsabilidad es que el paciente entienda el plan y se sienta acompañado desde la primera llamada.',

      credential: 'Dr. Fernando Del Corro · Cédula Esp. 1234567'

    },

    contact: {

      eyebrow: 'Agenda tu visita',

      title: 'Coordinamos casos de manera presencial y virtual',

      intro: 'Comparte tu caso, radiografías o expectativas y recibirás una llamada de nuestro coordinador clínico en menos de 24 horas hábiles.',

      details: {

        phone: 'Tel. +52 (631) 144 0368',

        email: 'coordinacion@fdcprostho.com',

        address: 'Blvd. Hidalgo 102, Consultorio 504 · Hermosillo, Sonora'

      },

      labels: {

        name: 'Nombre completo',

        email: 'Correo electrónico',

        phone: 'Teléfono de contacto',

        interest: 'Tipo de tratamiento de interés',

        message: 'Cuéntanos más sobre tu caso',

        submit: 'Enviar solicitud'

      },

      placeholders: {

        name: 'María López',

        email: 'tu@correo.com',

        phone: '(662) 000 0000',

        select: 'Selecciona una opción',

        message: 'Incluye antecedentes, expectativas y disponibilidad'

      },

      options: [

        { value: 'implantes', label: 'Implantes y carga inmediata' },

        { value: 'all-on-x', label: 'Rehabilitación All-on-X' },

        { value: 'protesis', label: 'Prótesis fija / coronas' },

        { value: 'evaluacion', label: 'Evaluación integral' }

      ],

      disclaimer: 'Nos pondremos en contacto únicamente con fines clínicos. Tus datos se protegen conforme a nuestra política de privacidad.'

    },

    footer: {

      rights: 'Todos los derechos reservados.',

      availability: 'Atendemos a pacientes referidos y casos directos con previa cita.'

    },

    floatingCta: {

      label: 'Agenda por WhatsApp',

      ariaLabel: 'Agendar cita vía WhatsApp',

      message: 'Hola, soy paciente interesado en una valoración de prostodoncia.'

    }

  },

  en: {

    brand: {

      title: 'Dr. Fernando Del Corro',

      tagline: 'Prosthodontics & Implants'

    },

    languageToggle: {

      ariaLabel: 'Switch language between Spanish and English'

    },

    navigation: {

      open: 'Open main menu',

      close: 'Close main menu'

    },

    navLinks: [

      { label: 'Home', href: '#inicio' },

      { label: 'Services', href: '#servicios' },

      { label: 'Methodology', href: '#metodologia' },

      { label: 'Cases', href: '#casos' },

      { label: 'Team', href: '#equipo' },

      { label: 'Contact', href: '#contacto' }

    ],

    hero: {

      eyebrow: 'Advanced prosthodontics',

      title: 'High-precision oral rehabilitation for functional, elegant smiles',

      lead:

        'We design comprehensive plans in advanced prosthodontics, implants, and dental aesthetics that prioritize biomechanics, phonetics, and long-term maintenance. Every decision is backed by digital diagnostics and an in-house laboratory.',

      primaryCta: 'Book a consultation',

      secondaryCta: 'Explore our protocols'

    },

    heroStats: [

      { label: 'Full-mouth rehabilitation cases', value: '+480' },

      { label: 'Digitally guided implants', value: '1,200' },

      { label: 'Annual satisfaction index', value: '98%' }

    ],

    heroPhoto: {

      src: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=900&q=70',

      alt: 'Patient receiving personalized implant care inside the operatory',

      caption: 'Digital lab integrated into every treatment plan.'

    },

    panel: {

      title: 'Dr. Fernando Del Corro',

      subtitle: 'Board-certified Prosthodontist · UANL',

      bullets: [

        'Fellow of the American College of Prosthodontists',

        'Guest lecturer for All-on-X protocols',

        'Fully integrated digital laboratory'

      ],

      contactLabel: 'Clinical coordination',

      phone: 'Phone +52 (631) 144 0368',

      email: 'coordinacion@fdcprostho.com',

      address: 'Blvd. Hidalgo 102, Hermosillo · Suite 504'

    },

    services: {

      eyebrow: 'Clinical protocols',

      title: 'Tailored solutions for every bone biotype',

      intro:

        'We combine digital diagnostics, in-house lab work, and in-office controls to deliver long-lasting rehabilitations without extending chair time.',

      items: [

        {

          title: 'Fixed prosthetics & comprehensive aesthetics',

          description:

            'Design and placement of crowns, bridges, and veneers that restore function and facial harmony while preserving healthy structures.',

          points: ['Next-gen ceramic systems', 'Intraoral scanning over conventional impressions', 'Custom shade-matching protocols']

        },

        {

          title: 'Immediate-load implants',

          description:

            '3D planning and surgical guides to place implants and provisional prosthesis the same day for selected cases.',

          points: ['Joint planning with the surgeon', 'Occlusal control within 24 h', 'Close post-operative monitoring']

        },

        {

          title: 'Full-arch All-on-X rehabilitation',

          description: 'Fixed solutions for fully edentulous arches prioritizing stability, phonetics, and easy maintenance.',

          points: ['Screw-retained hybrid bridges', 'Strategic abutment selection', 'Quarterly maintenance programs']

        },

        {

          title: 'Hybrid tooth-implant prosthesis',

          description:

            'Mixed solutions for patients with strategic remaining teeth who also require implant support.',

          points: ['Comprehensive periodontal analysis', 'Progressive occlusal balance', 'Advanced hygiene coaching for patients']

        }

      ]

    },

    methodology: {

      eyebrow: 'Methodology',

      title: 'Clinical transparency in four stages',

      steps: [

        {

          title: 'Thorough diagnostic assessment',

          detail: 'CBCT, photo documentation, and functional analysis to anticipate biomechanical and aesthetic risks.'

        },

        {

          title: 'Interdisciplinary master plan',

          detail: 'We coordinate orthodontics, periodontics, and surgery so every phase supports the final prosthesis.'

        },

        {

          title: 'Guided rehabilitation',

          detail: 'Functional mock-ups, phonetic try-ins, and CAD/CAM prototypes ensure comfort before delivery.'

        },

        {

          title: 'Lifetime support',

          detail: 'Maintenance programs and remote monitoring preserve tissues and the patient investment.'

        }

      ]

    },

    gallery: {

      eyebrow: 'Clinical setting',

      title: 'Imagery that reflects process and care',

      intro: 'Studio photography, lab work, and operatory snapshots document every stage of your treatment plan.',

      items: [

        {

          src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=70',

          caption: 'Digitally guided planning'

        },

        {

          src: 'https://images.unsplash.com/photo-1470881681242-5f912ebf00cd?auto=format&fit=crop&w=900&q=70',

          caption: 'Boutique lab with fine shade control'

        },

        {

          src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70',

          caption: 'Personalized care chairside'

        }

      ]

    },

    cases: {

      eyebrow: 'Featured cases',

      title: 'Measurable outcomes that restore function',

      tagline: 'Tailored plan',

      cards: [

        {

          name: 'Upper-arch full rejuvenation',

          result: 'The patient reengaged in social commitments without phonetic limitations.',

          metrics: ['5 implants + hybrid prosthesis', 'Clinical timeline: 10 weeks', 'Follow-up: 12 months']

        },

        {

          name: 'Functional-aesthetic hybrid rehab',

          result: 'Remaining teeth and new implants were integrated while preserving proprioception.',

          metrics: ['6 ceramic crowns', '3 guided implants', 'Total duration: 14 weeks']

        }

      ]

    },

    testimonials: {

      eyebrow: 'Experiences',

      title: 'Patients smiling with confidence again',

      items: [

        {

          quote:

            'I could smile at corporate events again without worrying about provisionals. The team explained every stage and respected my schedule.',

          author: 'Mariana G., General Counsel'

        },

        {

          quote:

            'After losing teeth to bruxism, I found a plan that prioritized function. Now I chew with stability and sleep peacefully.',

          author: 'Rafael L., Mechanical Engineer'

        },

        {

          quote:

            'I appreciate the clinical and financial clarity: every visit had a purpose and the digital check-ins simplify my follow-ups from Hermosillo.',

          author: 'Dr. Sonia V., OB-GYN'

        }

      ]

    },

    profile: {

      eyebrow: 'Clinical team',

      title: 'Led by a board-certified prosthodontist',

      description:

        'Dr. Del Corro completed specialty training in prosthodontics, advanced implant courses, and ongoing full-mouth rehabilitation education. His practice blends clinical photography, intraoral scanning, CAD/CAM planning, and a boutique lab to shorten delivery times without losing handcrafted detail.',

      bullets: [

        'Active member of the Mexican Association of Oral Rehabilitation',

        'Speaker on immediate-load and soft-tissue management',

        'Annual education programs for referring dentists'

      ],

      quote:

        'Every implant and every prosthesis tells a functional story. Our role is to keep patients informed and supported from the very first call.',

      credential: 'Dr. Fernando Del Corro · License 1234567'

    },

    contact: {

      eyebrow: 'Schedule your visit',

      title: 'In-person and virtual case coordination',

      intro: 'Share your case, radiographs, or expectations and our clinical coordinator will call you within one business day.',

      details: {

        phone: 'Phone +52 (631) 144 0368',

        email: 'coordinacion@fdcprostho.com',

        address: 'Blvd. Hidalgo 102, Suite 504 · Hermosillo, Sonora'

      },

      labels: {

        name: 'Full name',

        email: 'Email address',

        phone: 'Phone number',

        interest: 'Treatment of interest',

        message: 'Tell us more about your case',

        submit: 'Send request'

      },

      placeholders: {

        name: 'Jane Smith',

        email: 'you@email.com',

        phone: '(662) 000 0000',

        select: 'Select an option',

        message: 'Share background, expectations, and availability'

      },

      options: [

        { value: 'implants', label: 'Implants & immediate load' },

        { value: 'all-on-x', label: 'All-on-X rehabilitation' },

        { value: 'fixed', label: 'Fixed prosthesis / crowns' },

        { value: 'comprehensive', label: 'Comprehensive evaluation' }

      ],

      disclaimer: 'We will contact you solely for clinical purposes. Your data is protected under our privacy policy.'

    },

    footer: {

      rights: 'All rights reserved.',

      availability: 'We treat referred and direct patients by appointment only.'

    },

    floatingCta: {

      label: 'Chat on WhatsApp',

      ariaLabel: 'Open WhatsApp to schedule an appointment',

      message: 'Hello, I am interested in a prosthodontic evaluation.'

    }

  }

} as const



function App() {

  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  const [menuOpen, setMenuOpen] = useState(false)



  useEffect(() => {

    document.documentElement.lang = language

    if (typeof window !== 'undefined') {

      window.localStorage.setItem('fdc-lang', language)

    }

  }, [language])



  const t = translations[language]

  const whatsappLink = `https://wa.me/526311440368?text=${encodeURIComponent(t.floatingCta.message)}`

  const phoneHref = 'tel:+526311440368'

  const emailHref = 'mailto:coordinacion@fdcprostho.com'

  const closeMenu = () => setMenuOpen(false)
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    closeMenu()
  }



  return (
    <div className="page">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="logo" href="#" onClick={scrollTo('inicio')}>
            <span className="logo__badge">FD</span>
            <span className="logo__text">
              <span className="logo__title">{t.brand.title}</span>
              <span className="logo__tagline">{t.brand.tagline}</span>
            </span>
          </a>
          <nav id="site-navigation" className={`nav ${menuOpen ? 'nav--open' : ''}`}>
            <div className="nav__links">
              {t.navLinks.map((link) => (
                <a key={link.href} href="#" onClick={scrollTo(link.href.slice(1))}>
                  {link.label}
                </a>
              ))}
            </div>
            <a className="btn primary small nav__cta" href="#" onClick={scrollTo('contacto')}>
              {t.hero.primaryCta}
            </a>
          </nav>
          <div className="header-controls">
            <div className="language-toggle" role="group" aria-label={t.languageToggle.ariaLabel}>
              {languages.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`language-toggle__btn ${language === code ? 'is-active' : ''}`}
                  aria-pressed={language === code}
                  onClick={() => setLanguage(code)}
                >
                  <img src={code === 'es' ? 'https://flagcdn.com/w20/es.png' : 'https://flagcdn.com/w20/us.png'} alt={code === 'es' ? 'Español' : 'English'} />
                </button>
              ))}
            </div>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">{menuOpen ? t.navigation.close : t.navigation.open}</span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <div className="site">      <section className="hero" id="inicio">

        <div className="hero__content">

          <p className="eyebrow">{t.hero.eyebrow}</p>

          <h1>{t.hero.title}</h1>

          <p className="lead">{t.hero.lead}</p>

          <div className="hero__actions">

            <a className="btn primary" href="#" onClick={scrollTo('contacto')}>

              {t.hero.primaryCta}

            </a>

            <a className="btn ghost" href="#" onClick={scrollTo('servicios')}>

              {t.hero.secondaryCta}

            </a>

          </div>

          <div className="hero__stats">

            {t.heroStats.map((stat: any) => (

              <div key={stat.label}>

                <p className="stat__value">{stat.value}</p>

                <p className="stat__label">{stat.label}</p>

              </div>

            ))}

          </div>

        </div>

        <div className="hero__panel">

          <div className="hero__photo-wrapper">

            <img src={t.heroPhoto.src} alt={t.heroPhoto.alt} />

            <p>{t.heroPhoto.caption}</p>

          </div>

          <p className="panel__title">{t.panel.title}</p>

          <p className="panel__subtitle">{t.panel.subtitle}</p>

          <ul>

            {t.panel.bullets.map((bullet: string) => (

              <li key={bullet}>{bullet}</li>

            ))}

          </ul>

          <div className="panel__contact">

            <p>{t.panel.contactLabel}</p>

            <a href={phoneHref}>{t.panel.phone}</a>

            <a href={emailHref}>{t.panel.email}</a>

            <span>{t.panel.address}</span>

          </div>

        </div>

      </section>



      <main>

        <section className="section" id="servicios">

          <div className="section__heading">

            <p className="eyebrow">{t.services.eyebrow}</p>

            <h2>{t.services.title}</h2>

            <p>{t.services.intro}</p>

          </div>

          <div className="grid services">

            {t.services.items.map((service: any) => (

              <article key={service.title} className="card service">

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <ul>

                  {service.points.map((point: string) => (

                    <li key={point}>{point}</li>

                  ))}

                </ul>

              </article>

            ))}

          </div>

        </section>



        <section className="section section--alt" id="metodologia">

          <div className="section__heading">

            <p className="eyebrow">{t.methodology.eyebrow}</p>

            <h2>{t.methodology.title}</h2>

          </div>

          <div className="timeline">

            {t.methodology.steps.map((step: any, index: number) => (

              <div key={step.title} className="timeline__item">

                <span className="timeline__index">0{index + 1}</span>

                <div>

                  <h3>{step.title}</h3>

                  <p>{step.detail}</p>

                </div>

              </div>

            ))}

          </div>

        </section>



        <section className="section gallery" id="galeria">

          <div className="section__heading">

            <p className="eyebrow">{t.gallery.eyebrow}</p>

            <h2>{t.gallery.title}</h2>

            <p>{t.gallery.intro}</p>

          </div>

          <div className="gallery__grid">

            {t.gallery.items.map((image: any) => (

              <figure key={image.caption} className="gallery__item">

                <img src={image.src} alt={image.caption} loading="lazy" />

                <figcaption>{image.caption}</figcaption>

              </figure>

            ))}

          </div>

        </section>



        <section className="section" id="casos">

          <div className="section__heading">

            <p className="eyebrow">{t.cases.eyebrow}</p>

            <h2>{t.cases.title}</h2>

          </div>

          <div className="grid cases">

            {t.cases.cards.map((caseItem: any) => (

              <article key={caseItem.name} className="card case">

                <p className="case__tag">{t.cases.tagline}</p>

                <h3>{caseItem.name}</h3>

                <p>{caseItem.result}</p>

                <ul>

                  {caseItem.metrics.map((metric: string) => (

                    <li key={metric}>{metric}</li>

                  ))}

                </ul>

              </article>

            ))}

          </div>

        </section>



        <section className="section section--alt" id="testimonios">

          <div className="section__heading">

            <p className="eyebrow">{t.testimonials.eyebrow}</p>

            <h2>{t.testimonials.title}</h2>

          </div>

          <div className="grid testimonials">

            {t.testimonials.items.map((testimonial: any) => (

              <blockquote key={testimonial.author} className="card testimonial">

                <p>“{testimonial.quote}”</p>

                <cite>{testimonial.author}</cite>

              </blockquote>

            ))}

          </div>

        </section>



        <section className="section profile" id="equipo">

          <div className="profile__bio">

            <p className="eyebrow">{t.profile.eyebrow}</p>

            <h2>{t.profile.title}</h2>

            <p>{t.profile.description}</p>

            <ul>

              {t.profile.bullets.map((item: string) => (

                <li key={item}>{item}</li>

              ))}

            </ul>

          </div>

          <div className="profile__card">

            <p className="profile__quote">“{t.profile.quote}”</p>

            <span>{t.profile.credential}</span>

          </div>

        </section>



        <section className="section contact" id="contacto">

          <div className="section__heading">

            <p className="eyebrow">{t.contact.eyebrow}</p>

            <h2>{t.contact.title}</h2>

            <p>{t.contact.intro}</p>

            <div className="contact__details">

              <a href={phoneHref}>{t.contact.details.phone}</a>

              <a href={emailHref}>{t.contact.details.email}</a>

              <span>{t.contact.details.address}</span>

            </div>

          </div>

          <form className="contact__form">

            <label>

              {t.contact.labels.name}

              <input type="text" name="nombre" placeholder={t.contact.placeholders.name} required />

            </label>

            <label>

              {t.contact.labels.email}

              <input type="email" name="email" placeholder={t.contact.placeholders.email} required />

            </label>

            <label>

              {t.contact.labels.phone}

              <input type="tel" name="telefono" placeholder={t.contact.placeholders.phone} />

            </label>

            <label>

              {t.contact.labels.interest}

              <select name="interes" defaultValue="">

                <option value="" disabled>

                  {t.contact.placeholders.select}

                </option>

                {t.contact.options.map((option: any) => (

                  <option key={option.value} value={option.value}>

                    {option.label}

                  </option>

                ))}

              </select>

            </label>

            <label className="full-width">

              {t.contact.labels.message}

              <textarea name="mensaje" rows={4} placeholder={t.contact.placeholders.message}></textarea>

            </label>

            <button type="submit" className="btn primary">

              {t.contact.labels.submit}

            </button>

            <p className="disclaimer">{t.contact.disclaimer}</p>

          </form>

        </section>

      </main>



      <footer className="footer">

        <p>

          © {new Date().getFullYear()} {t.brand.title}. {t.footer.rights}

        </p>

        <p>{t.footer.availability}</p>

      </footer>

    </div>





      <a className="floating-cta" href={whatsappLink} target="_blank" rel="noreferrer" aria-label={t.floatingCta.ariaLabel}>
        <span className="floating-cta__icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" role="presentation" focusable="false">
            <path
              d="M16.004 3.003C9.38 3.003 4 8.385 4 15.006c0 2.668.768 5.184 2.222 7.374L4 28.997l7.06-2.197A11.946 11.946 0 0 0 16.004 27C22.627 27 28 21.617 28 15c0-6.627-5.373-11.997-11.996-11.997h0zm6.622 16.954c-.277.78-1.637 1.52-2.24 1.59-.602.07-1.155.332-3.865-.799-3.258-1.4-5.342-4.837-5.508-5.062-.166-.226-1.316-1.75-1.316-3.335s.833-2.365 1.128-2.695c.294-.33.648-.413.863-.413.215 0 .431.002.622.01.2.009.466-.075.73.555.277.666.946 2.295 1.03 2.46.083.165.138.357.03.582-.108.226-.162.357-.321.548-.16.19-.34.425-.486.571-.162.16-.33.334-.142.66.189.327.84 1.377 1.802 2.226 1.237 1.103 2.275 1.445 2.6 1.604.324.16.513.135.702-.08.189-.215.812-.95 1.028-1.276.215-.327.455-.274.76-.165.304.108 1.929.909 2.262 1.073.333.165.555.248.638.384.084.136.084.782-.193 1.563z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="floating-cta__label">{t.floatingCta.label}</span>
      </a>

    </div>

  )

}



export default App














