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
    { label: 'Servicios', href: '#servicios' },
    { label: 'Metodología', href: '#metodologia' },
    { label: 'Casos', href: '#casos' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Contacto', href: '#contacto' },
  ],
  hero: {
    eyebrow: 'Prostodoncia avanzada',
    title: 'Rehabilitación oral de alta precisión para sonrisas funcionales y elegantes',
    lead: 'Diseñamos planes integrales en prostodoncia avanzada, implantes y estética dental que priorizan biomecánica, fonética y mantenimiento a largo plazo. Cada decisión se respalda con diagnóstico digital y laboratorio propio.',
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
    eyebrow: 'Casos destacados',
    title: 'Resultados medibles que devuelven funcionalidad',
    tagline: 'Plan personalizado',
    cards: [
      {
        name: 'Rejuvenecimiento completo Maxilar Superior',
        result: 'Paciente retoma actividades sociales sin limitaciones fonéticas.',
        metrics: ['5 implantes + prótesis híbrida', 'Tiempo clínico: 10 semanas', 'Control de seguimiento 12 meses'],
      },
      {
        name: 'Rehabilitación combinada Funcional-Estética',
        result: 'Se integran dientes remanentes y nuevos implantes manteniendo propriocepción.',
        metrics: ['6 coronas cerámicas', '3 implantes guiados', 'Plazo total: 14 semanas'],
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
    rightsDev: 'Creado por Alfredo Camacho G.',
    rightsFull: '© {year} Dr. Fernando Ari Del Corro Lopez. Todos los Derechos reservados. Creado por Alfredo Camacho G.'
  },
  floatingCta: {
    label: 'Agenda por WhatsApp',
    ariaLabel: 'Agendar cita vía WhatsApp',
    message: 'Hola, soy paciente interesado en una valoración de prostodoncia.',
  },
}











