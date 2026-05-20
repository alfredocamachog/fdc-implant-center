import { SITE_CONFIG } from '../config'

export const esTranslations = {
  brand: {
    title: SITE_CONFIG.brand,
    tagline: SITE_CONFIG.tagline,
  },
  languageToggle: {
    ariaLabel: 'Cambiar idioma entre español e inglés',
  },
  navigation: {
    open: 'Abrir menú principal',
    close: 'Cerrar menú principal',
  },
  navLinks: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Casos', href: '#casos' },
    { label: 'Contacto', href: '#contacto' },
  ],
  hero: {
    eyebrow: 'Prostodoncia avanzada',
    title: 'Rehabilitación oral sobre dientes e implantes',
    lead: 'Funcionalidad, estética y resultados de alta precisión.',
    primaryCta: 'Agenda una valoración',
    secondaryCta: 'Conoce nuestros protocolos',
  },
  heroStats: [
    { label: 'Casos de rehabilitación total', value: '+480' },
    { label: 'Implantes guiados digitalmente', value: '1,200' },
    { label: 'Índice de satisfacción anual', value: '98%' },
  ],
  heroPhoto: {
    src: '/hero-dr-fernando-v2.png',
    alt: 'Paciente en clínica de implantología recibiendo atención personalizada',
  },
  panel: {
    tabs: {
      ariaLabel: 'Secciones del perfil profesional',
      general: 'Información General',
      higherEducation: 'Estudios Superiores',
      coursesAndTalks: 'Cursos y Ponencias',
      workExperience: 'Experiencia Laboral',
    },
    general: {
      title: 'Información General',
      name: 'Dr. Fernando Ari del Corro López',
      license: 'Cédula: 12952774',
      roles: ['Cirujano dentista', 'Especialista en prostodoncia e implantología oral'],
      contactLines: ['Phone +52 (81) 1684 2009', 'drfernandoadelcorro@gmail.com', 'Campillo 110, Fundó Legal, Centro, 84030 Heroica Nogales, Son.'],
    },
    sections: {
      higherEducation: {
        title: 'Estudios Superiores',
        items: [
          { title: 'Cirujano Dentista', institution: 'Universidad Autónoma de Nuevo León.', period: '2015-2020' },
          { title: 'Hospital Militar Regional de Especialidades', institution: 'Universidad Autónoma de Nuevo León.', period: '2020-2021' },
          { title: 'Especialidad en Prostodoncia e Implantología Oral', institution: 'Universidad La Salle Bajío.', period: '2020-2021' },
        ],
      },
      coursesAndTalks: {
        title: 'Cursos y Ponencias',
        items: [
          'Masterclass en Peri-Implantitis. Alberto Monje. 2022',
          'Fotografía Dental Behind the Scenes. Luis Quintero. 2023',
          'Rehabilitación Oral Adhesiva. Roberto Tello. 2023',
          'Estancia y ponencia en Universidad de Berna, Suiza. “Prosthetically Directed Bimaxillary Surgical Planning”. 2024',
          'Estancia en compañía Bredent, Alemania. 2024',
          'Estancia en compañía Zirkonzahn, Campo Tures, Italia; y ponente con el tema “Prosthetically Directed Bimaxillary Surgical Planning”. The European Association for Osseointegration, Milán 2024',
          'Ponencia en Asociación Dental Mexicana: “De la Planeación a la Ejecución en Implantes”',
          'Ponencia en Colegio de Cirujanos Dentistas de Aguascalientes: “De la Planeación a la Ejecución en Implantes”',
          'Ponencia en el Colegio de Cirujanos Dentistas de Ixtapa-Zihuatanejo: “De la Planeación a la Ejecución en Implantes”',
          'Live en vivo con el Dr. Roberto Tello mostrando casos de rehabilitación oral adhesiva.',
          'Cuarto lugar en concurso de carteles de congreso ITI México 2025: “Reconstrucción bimaxilar implantosoportada guiada por flujos digitales”',
          'Ponencia en congreso AMIC: “De la Planeación a la Ejecución en Implantes”',
        ],
      },
      workExperience: {
        title: 'Experiencia Laboral',
        items: [
          {
            clinic: 'Dental Advanced',
            role: 'Asistente dental',
            supervisor: 'Jefe inmediato: Dr. Víctor Manuel Pérez',
            period: '2015-2020',
            location: 'Nogales, Sonora',
          },
          {
            clinic: 'Althaia Dental Clinic',
            role: 'Asistente dental en el departamento de rehabilitación e implantología',
            supervisor: 'Dr. Jonathan Balderas',
            period: '2020-2021',
            location: 'Monterrey, Nuevo León',
          },
          {
            clinic: 'Dental Laser',
            role: 'Dentista general',
            supervisor: '',
            period: '2021-2022',
            location: 'Nogales, Sonora',
          },
        ],
      },
    },
  },
  services: {
    eyebrow: 'Protocolos clínicos',
    title: 'Soluciones personalizadas para cada biotipo óseo',
    intro: 'Integramos diagnóstico digital, laboratorio propio y controles en consultorio para entregar rehabilitaciones durables sin exceder los tiempos clínicos necesarios.',
    items: [
      {
        title: 'Prótesis fija y estética integral',
        description: 'Diseño y colocación de coronas, puentes y carillas que devuelven función y armonía facial sin sacrificar estructuras sanas.',
        points: ['Cerámicas de última generación', 'Escaneo intraoral sin impresiones convencionales', 'Protocolos de color personalizados'],
      },
      {
        title: 'Implantes de carga inmediata',
        description: 'Planificación 3D y guías quirúrgicas para colocar implantes y prótesis provisionales el mismo día en casos seleccionados.',
        points: ['Planeación conjunta con cirujano', 'Control de oclusión en 24 h', 'Seguimiento intensivo post-operatorio'],
      },
      {
        title: 'Rehabilitación completa All-on-X',
        description: 'Restauraciones fijas para maxilares totalmente edéntulos que priorizan estabilidad, fonética y mantenimiento sencillo.',
        points: ['Carga híbrida atornillada', 'Selección estratégica de pilares', 'Programas de mantenimiento trimestral'],
      },
      {
        title: 'Prótesis sobre dientes e implantes combinados',
        description: 'Soluciones mixtas para pacientes con dientes remanentes estratégicos y necesidad de soporte implantológico.',
        points: ['Análisis periodontal previo', 'Equilibrio oclusal progresivo', 'Educación del paciente en higiene avanzada'],
      },
    ],
  },
  methodology: {
    eyebrow: 'Metodología',
    title: 'Transparencia clínica en cuatro etapas',
    steps: [
      {
        title: 'Evaluación diagnóstica exhaustiva',
        detail: 'Tomografía, fotodocumentación y análisis funcional para anticipar riesgos biomecánicos y estéticos.',
      },
      {
        title: 'Plan maestro interdisciplinario',
        detail: 'Coordinamos ortodoncia, periodoncia y cirugía para que cada fase respalde la prótesis definitiva.',
      },
      {
        title: 'Rehabilitación guiada',
        detail: 'Mock-ups funcionales, pruebas fonéticas y prototipos CAD/CAM aseguran confort antes de la prótesis final.',
      },
      {
        title: 'Acompañamiento vitalicio',
        detail: 'Programas de mantenimiento y monitoreo remoto para preservar tejidos y la inversión del paciente.',
      },
    ],
  },
  gallery: {
    eyebrow: 'Entorno clínico',
    title: 'Imágenes que hablan de procesos y cuidado',
    intro: 'Combinamos estudio fotográfico, laboratorio y operatoria para documentar cada etapa de tu plan.',
    items: [
      {
        src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=70',
        caption: 'Planeación digital guiada',
      },
      {
        src: 'https://images.unsplash.com/photo-1470881681242-5f912ebf00cd?auto=format&fit=crop&w=900&q=70',
        caption: 'Laboratorio boutique con control cromático',
      },
      {
        src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70',
        caption: 'Atención personalizada en operatoria',
      },
    ],
  },
  cases: {
    eyebrow: 'Casos',
    title: 'Antes y después de tratamientos',
    intro: '',
    caseTag: 'Caso',
    readMoreLabel: 'Ver más',
    closeModalLabel: 'Cerrar',
    overviewTabLabel: 'Resumen',
    resultsTabLabel: 'Resultados',
    detailsTabsAriaLabel: 'Pestañas de detalles del caso',
    prevSlideLabel: 'Anterior',
    nextSlideLabel: 'Siguiente',
    sensitiveWarning: 'Contenido sensible',
    showSensitiveLabel: 'Ver imagen',
    hideSensitiveLabel: 'Ocultar imagen',
    cards: [
      {
        id: 'jose-santos-01',
        name: 'Paciente: Jose',
        treatment: 'Tratamiento: Rehabilitación completa con implantes',
        location: 'Ubicación: Nogales, México (a minutos de la frontera con EE. UU.)',
        images: [
          { src: '/cases/jose-santos/2.png', sensitive: true },
          { src: '/cases/jose-santos/3.png', sensitive: true },
          { src: '/cases/jose-santos/4.png', sensitive: true },
          { src: '/cases/jose-santos/5.png', sensitive: true },
          { src: '/cases/jose-santos/6.png', sensitive: true },
        ],
        modal: {
          overview: {
            title: 'Una solución que cambió su vida ante la pérdida dental',
            paragraphs: [
              'José llegó a nuestra clínica con pérdida dental severa, dificultad para masticar y falta de confianza al sonreír. Buscaba una solución permanente y de apariencia natural, no prótesis removibles.',
              'Usando planeación digital avanzada y cirugía guiada de implantes, entregamos una restauración fija completa que transformó por completo su sonrisa y su calidad de vida.',
            ],
            upperTitle: 'Maxilar superior: All-on-X con Zirconia (estética premium)',
            upperDescription:
              'Para el arco superior, colocamos múltiples implantes estratégicamente posicionados (técnica All-on-X) para maximizar soporte y estabilidad a largo plazo.',
            upperPoints: [
              '✔️ Puente fijo de Zirconia de alta gama',
              '✔️ Fuerza y durabilidad excepcionales',
              '✔️ Estética y translucidez ultra naturales',
              '✔️ Diseñado para verse y sentirse como dientes reales',
            ],
            lowerTitle: 'Maxilar inferior: All-on-4 híbrido (fuerza + eficiencia)',
            lowerDescription:
              'Para el arco inferior, utilizamos la técnica probada All-on-4, minimizando la cirugía y maximizando la función.',
            lowerPoints: [
              '✔️ Prótesis híbrida reforzada con titanio',
              '✔️ Ligera y altamente funcional',
              '✔️ Rentable sin comprometer la calidad',
              '✔️ Mantenimiento sencillo y confiabilidad a largo plazo',
            ],
          },
          results: {
            title: 'Resultados:',
            intro: 'José ahora disfruta de:',
            points: [
              '✔️ Una sonrisa completamente fija (sin prótesis removibles)',
              '✔️ Capacidad de masticación fuerte y segura',
              '✔️ Una apariencia natural y rejuvenecida',
              '✔️ Confianza renovada en su vida diaria',
            ],
            whyTitle: 'Por qué pacientes de EE. UU. nos eligen',
            whyPoints: [
              '✔️ Planeación digital avanzada y cirugía guiada',
              '✔️ Materiales premium (Zirconia y Titanio)',
              '✔️ Tratamiento personalizado por un especialista en implantes',
              '✔️ Ahorro significativo vs. clínicas de EE. UU.',
              '✔️ Ubicación conveniente en Nogales, México',
            ],
          },
        },
      },
      {
        id: 'marite-02',
        name: 'Paciente: Marite',
        treatment: 'Tratamiento: Rehabilitación completa sobre dientes (carillas y coronas)',
        location: 'Ubicación: Nogales, México (a minutos de la frontera con EE. UU.)',
        images: [
          { src: '/cases/marite/2.png', sensitive: true },
          { src: '/cases/marite/3.png', sensitive: true },
          { src: '/cases/marite/4.png', sensitive: true },
          { src: '/cases/marite/5.png', sensitive: true },
        ],
        modal: {
          overview: {
            title: 'Luce más joven. Siéntete más fuerte. Vuelve a sonreír con confianza.',
            paragraphs: [
              'Los dientes desgastados, cortos o aplanados no solo afectan tu sonrisa: envejecen todo tu rostro.',
              'Esta paciente llegó a nuestra clínica con desgaste dental avanzado por años de bruxismo, lo que provocó una mordida colapsada y una apariencia cansada y envejecida.',
              'Ella quería más que un arreglo dental: quería una transformación completa.',
            ],
            upperTitle: 'El problema: más que solo dientes desgastados',
            upperDescription:
              'Cuando la mordida colapsa, la parte inferior del rostro pierde soporte, haciendo que los pacientes se vean mayores de lo que realmente son.',
            upperPoints: [
              'Dientes desgastados y desiguales',
              'Pérdida de dimensión vertical (mordida colapsada)',
              'Labios más delgados y menor soporte facial',
              'Fatiga y molestia mandibular',
              'Apariencia envejecida y menor confianza',
            ],
            lowerTitle: 'La solución: reconstrucción oral completa (elevación de mordida)',
            lowerDescription:
              'Diseñamos un tratamiento completamente personalizado para restaurar su mordida, estructura facial y estética de sonrisa. Cada paso se planeó cuidadosamente para asegurar confort, función y belleza natural.',
            lowerPoints: [
              'Elevación precisa de mordida (aumento de DVO)',
              'Diseño digital avanzado de sonrisa',
              'Análisis funcional para estabilidad a largo plazo',
              'Sonrisa de prueba (mock-up) antes del tratamiento final',
            ],
          },
          results: {
            title: 'Resultados:',
            intro: 'Usando restauraciones cerámicas de alta gama (coronas y carillas), reconstruimos su sonrisa desde cero:',
            points: [
              'Proporciones dentales naturales y juveniles',
              'Mordida fuerte y estable para función a largo plazo',
              'Sonrisa armonizada con los rasgos faciales',
              'Materiales durables y de alto rendimiento',
            ],
            whyTitle: 'La transformación',
            whyPoints: [
              'Apariencia visiblemente más joven y renovada',
              'Soporte facial y volumen labial restaurados',
              'Mejor fuerza y confort al masticar',
              'Sonrisa segura y de aspecto natural',
            ],
            chooseUsTitle: 'Por qué pacientes de EE. UU. nos eligen',
            chooseUsPoints: [
              'Rehabilitación oral completa a nivel especialista',
              'Planeación digital avanzada y alta precisión',
              'Materiales premium por una fracción del costo en EE. UU.',
              'Atención personalizada de alto nivel',
              'Ubicación fronteriza conveniente (Nogales, México)',
            ],
          },
        },
      },
      {
        id: 'miguel-padilla-03',
        name: 'Paciente: Miguel',
        treatment: 'Tratamiento: Rehabilitación completa sobre dientes (carillas y coronas)',
        location: 'Ubicación: Nogales, México (a minutos de la frontera con EE. UU.)',
        images: [
          { src: '/cases/miguel-padilla/1.png', sensitive: true },
          { src: '/cases/miguel-padilla/2.png', sensitive: true },
          { src: '/cases/miguel-padilla/3.png', sensitive: true },
          { src: '/cases/miguel-padilla/4.png', sensitive: true },
          { src: '/cases/miguel-padilla/5.png', sensitive: true },
          { src: '/cases/miguel-padilla/6.png', sensitive: true },
          { src: '/cases/miguel-padilla/7.png', sensitive: true },
          { src: '/cases/miguel-padilla/8.png', sensitive: true },
          { src: '/cases/miguel-padilla/9.png', sensitive: true },
        ],
        modal: {
          overview: {
            title: '',
            paragraphs: [],
            upperTitle: '',
            upperDescription: '',
            upperPoints: [],
            lowerTitle: '',
            lowerDescription: '',
            lowerPoints: [],
          },
          results: {
            title: '',
            intro: '',
            points: [],
            whyTitle: '',
            whyPoints: [],
          },
        },
      },
      {
        id: 'martha-04',
        name: 'Paciente: Martha',
        treatment: 'Tratamiento: Prótesis total y removible inferior con coronas',
        location: 'Ubicación: Nogales, México (a minutos de la frontera con EE. UU.)',
        images: [
          { src: '/cases/martha/1.png', sensitive: true },
          { src: '/cases/martha/2.png', sensitive: true },
          { src: '/cases/martha/3.png', sensitive: true },
          { src: '/cases/martha/4.png', sensitive: true },
        ],
        modal: {
          overview: {
            title: '',
            paragraphs: [],
            upperTitle: '',
            upperDescription: '',
            upperPoints: [],
            lowerTitle: '',
            lowerDescription: '',
            lowerPoints: [],
          },
          results: {
            title: '',
            intro: '',
            points: [],
            whyTitle: '',
            whyPoints: [],
          },
        },
      },
    ],
  },
  testimonials: {
    eyebrow: 'Experiencias',
    title: 'Pacientes que vuelven a sonreír con confianza',
    items: [
      {
        quote: 'Pude volver a sonreír en eventos corporativos sin preocuparme por mis provisionales. El equipo explicó cada etapa y respetó mis tiempos.',
        author: 'Mariana G., Ejecutiva Legal',
      },
      {
        quote: 'Después de perder piezas por bruxismo encontré un plan que priorizó la función. Hoy mastico con estabilidad y duermo con tranquilidad.',
        author: 'Ing. Rafael L.',
      },
      {
        quote: 'Agradezco la claridad financiera y clínica: cada visita tenía un propósito y los controles digitales facilitan mi seguimiento desde Hermosillo.',
        author: 'Dra. Sonia V., Ginecóloga',
      },
    ],
  },
  profile: {
    eyebrow: 'Equipo clínico',
    title: 'Atención liderada por un prostodoncista certificado',
    description: 'El Dr. Del Corro cuenta con especialidad en Prostodoncia, diplomado en Implantología Oral y formación continua en rehabilitación integral. Su práctica integra fotografía clínica, escaneo intraoral, planeación CAD/CAM y un laboratorio boutique que reduce tiempos de entrega sin sacrificar detalle artesanal.',
    bullets: [
      'Miembro activo de la Asociación Mexicana de Rehabilitación Oral',
      'Speaker en foros de carga inmediata y manejo de tejidos blandos',
      'Programas anuales de educación para odontólogos referidores',
    ],
    quote: 'Cada implante y cada prótesis cuentan una historia funcional. Nuestra responsabilidad es que el paciente entienda el plan y se sienta acompañado desde la primera llamada.',
    credential: 'Dr. Fernando Del Corro · Cédula Esp. 1234567',
  },
  contact: {
    eyebrow: 'Agenda tu visita',
    title: 'Coordinamos casos de manera presencial y virtual',
    intro: 'Comparte tu caso, radiografías o expectativas y recibirás una llamada de nuestro coordinador clínico en menos de 24 horas hábiles.',
    details: {
      phone: 'Tel. +52 (81) 1684 2009',
      email: SITE_CONFIG.email,
      address: SITE_CONFIG.address.es,
    },
    labels: {
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono de contacto',
      interest: 'Tipo de tratamiento de interés',
      message: 'Cuéntanos más sobre tu caso',
      submit: 'Enviar solicitud',
      submitting: 'Enviando...',
    },
    placeholders: {
      name: 'María López',
      email: 'tu@correo.com',
      phone: '(81) 1684 2009',
      select: 'Selecciona una opción',
      message: 'Incluye antecedentes, expectativas y disponibilidad',
    },
    options: [
      { value: 'implantes', label: 'Implantes y carga inmediata' },
      { value: 'all-on-x', label: 'Rehabilitación All-on-X' },
      { value: 'protesis', label: 'Prótesis fija / coronas' },
      { value: 'evaluacion', label: 'Evaluación integral' },
    ],
    disclaimer: 'Nos pondremos en contacto únicamente con fines clínicos. Tus datos se protegen conforme a nuestra política de privacidad.',
    successTitle: 'Solicitud enviada',
    successMessage: 'Gracias por tu interés. Nuestro coordinador clínico se pondrá en contacto contigo en menos de 24 horas hábiles.',
    successReset: 'Enviar otra solicitud',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    availability: 'Atendemos a pacientes referidos y casos directos con previa cita.',
    rightsDev: 'Desertia Tech',
    rightsFull: '© {year} Dr. Fernando Ari Del Corro Lopez. Todos los Derechos reservados. Creado por {company}.'
  },
  floatingCta: {
    label: 'Agenda por WhatsApp',
    ariaLabel: 'Agendar cita vía WhatsApp',
    message: 'Hola, soy paciente interesado en una valoración de prostodoncia.',
  },
}
