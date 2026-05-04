import { SITE_CONFIG } from '../config'

export const enTranslations = {
  brand: {
    title: SITE_CONFIG.brand,
    tagline: SITE_CONFIG.tagline,
  },
  languageToggle: {
    ariaLabel: 'Switch language between Spanish and English',
  },
  navigation: {
    open: 'Open main menu',
    close: 'Close main menu',
  },
  navLinks: [
    { label: 'Home', href: '#inicio' },
    { label: 'Cases', href: '#casos' },
    { label: 'Contact', href: '#contacto' },
  ],
  hero: {
    eyebrow: 'Advanced prosthodontics',
    title: 'High-precision oral rehabilitation for functional, elegant smiles',
    lead: 'We design comprehensive plans in advanced prosthodontics, implants, and dental aesthetics that prioritize biomechanics, phonetics, and long-term maintenance. Every decision is backed by digital diagnostics and an in-house laboratory.',
    primaryCta: 'Book a consultation',
    secondaryCta: 'Explore our protocols',
  },
  heroStats: [
    { label: 'Full-mouth rehabilitation cases', value: '+480' },
    { label: 'Digitally guided implants', value: '1,200' },
    { label: 'Annual satisfaction index', value: '98%' },
  ],
  heroPhoto: {
    src: '/hero-dr-fernando-v2.png',
    alt: 'Patient receiving personalized implant care inside the operatory',
  },
  panel: {
    tabs: {
      ariaLabel: 'Professional profile sections',
      general: 'General Information',
      higherEducation: 'Higher Education',
      coursesAndTalks: 'Courses and Lectures',
      workExperience: 'Work Experience',
    },
    general: {
      title: 'General Information',
      name: 'Dr. Fernando Ari del Corro López',
      license: 'Professional License: 12952774',
      roles: ['Dental surgeon', 'Specialist in prosthodontics and oral implantology'],
      contactLines: ['Phone +52 (81) 1684 2009', 'drfernandoadelcorro@gmail.com', 'Campillo 110, Fundó Legal, Centro, 84030 Heroica Nogales, Son.'],
    },
    sections: {
      higherEducation: {
        title: 'Higher Education',
        items: [
          { title: 'Dental Surgeon', institution: 'Autonomous University of Nuevo León.', period: '2015-2020' },
          { title: 'Regional Military Specialty Hospital', institution: 'Autonomous University of Nuevo León.', period: '2020-2021' },
          { title: 'Specialty in Prosthodontics and Oral Implantology', institution: 'La Salle Bajío University.', period: '2020-2021' },
        ],
      },
      coursesAndTalks: {
        title: 'Courses and Lectures',
        items: [
          'Masterclass in Peri-Implantitis. Alberto Monje. 2022',
          'Dental Photography Behind the Scenes. Luis Quintero. 2023',
          'Adhesive Oral Rehabilitation. Roberto Tello. 2023',
          'Academic stay and lecture at the University of Bern, Switzerland. “Prosthetically Directed Bimaxillary Surgical Planning”. 2024',
          'Academic stay at Bredent company, Germany. 2024',
          'Academic stay at Zirkonzahn company, Campo Tures, Italy; and speaker on “Prosthetically Directed Bimaxillary Surgical Planning”. The European Association for Osseointegration, Milan 2024',
          'Lecture at the Mexican Dental Association: “From Planning to Execution in Implants”',
          'Lecture at the College of Dental Surgeons of Aguascalientes: “From Planning to Execution in Implants”',
          'Lecture at the College of Dental Surgeons of Ixtapa-Zihuatanejo: “From Planning to Execution in Implants”',
          'Live session with Dr. Roberto Tello showing adhesive oral rehabilitation cases.',
          'Fourth place in the ITI Mexico 2025 congress poster contest: “Implant-supported bimaxillary reconstruction guided by digital workflows”',
          'Lecture at AMIC congress: “From Planning to Execution in Implants”',
        ],
      },
      workExperience: {
        title: 'Work Experience',
        items: [
          {
            clinic: 'Dental Advanced',
            role: 'Dental assistant',
            supervisor: 'Direct supervisor: Dr. Víctor Manuel Pérez',
            period: '2015-2020',
            location: 'Nogales, Sonora',
          },
          {
            clinic: 'Althaia Dental Clinic',
            role: 'Dental assistant in the rehabilitation and implantology department',
            supervisor: 'Dr. Jonathan Balderas',
            period: '2020-2021',
            location: 'Monterrey, Nuevo León',
          },
          {
            clinic: 'Dental Laser',
            role: 'General dentist',
            supervisor: '',
            period: '2021-2022',
            location: 'Nogales, Sonora',
          },
        ],
      },
    },
  },
  services: {
    eyebrow: 'Clinical protocols',
    title: 'Tailored solutions for every bone biotype',
    intro: 'We combine digital diagnostics, in-house lab work, and in-office controls to deliver long-lasting rehabilitations without extending chair time.',
    items: [
      {
        title: 'Fixed prosthetics & comprehensive aesthetics',
        description: 'Design and placement of crowns, bridges, and veneers that restore function and facial harmony while preserving healthy structures.',
        points: ['Next-gen ceramic systems', 'Intraoral scanning over conventional impressions', 'Custom shade-matching protocols'],
      },
      {
        title: 'Immediate-load implants',
        description: '3D planning and surgical guides to place implants and provisional prosthesis the same day for selected cases.',
        points: ['Joint planning with the surgeon', 'Occlusal control within 24 h', 'Close post-operative monitoring'],
      },
      {
        title: 'Full-arch All-on-X rehabilitation',
        description: 'Fixed solutions for fully edentulous arches prioritizing stability, phonetics, and easy maintenance.',
        points: ['Screw-retained hybrid bridges', 'Strategic abutment selection', 'Quarterly maintenance programs'],
      },
      {
        title: 'Hybrid tooth-implant prosthesis',
        description: 'Mixed solutions for patients with strategic remaining teeth who also require implant support.',
        points: ['Comprehensive periodontal analysis', 'Progressive occlusal balance', 'Advanced hygiene coaching for patients'],
      },
    ],
  },
  methodology: {
    eyebrow: 'Methodology',
    title: 'Clinical transparency in four stages',
    steps: [
      {
        title: 'Thorough diagnostic assessment',
        detail: 'CBCT, photo documentation, and functional analysis to anticipate biomechanical and aesthetic risks.',
      },
      {
        title: 'Interdisciplinary master plan',
        detail: 'We coordinate orthodontics, periodontics, and surgery so every phase supports the final prosthesis.',
      },
      {
        title: 'Guided rehabilitation',
        detail: 'Functional mock-ups, phonetic try-ins, and CAD/CAM prototypes ensure comfort before delivery.',
      },
      {
        title: 'Lifetime support',
        detail: 'Maintenance programs and remote monitoring preserve tissues and the patient investment.',
      },
    ],
  },
  gallery: {
    eyebrow: 'Clinical setting',
    title: 'Imagery that reflects process and care',
    intro: 'Studio photography, lab work, and operatory snapshots document every stage of your treatment plan.',
    items: [
      {
        src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=70',
        caption: 'Digitally guided planning',
      },
      {
        src: 'https://images.unsplash.com/photo-1470881681242-5f912ebf00cd?auto=format&fit=crop&w=900&q=70',
        caption: 'Boutique lab with fine shade control',
      },
      {
        src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70',
        caption: 'Personalized care chairside',
      },
    ],
  },
  cases: {
    eyebrow: 'Cases',
    title: 'Before and after treatments',
    intro: '',
    caseTag: 'Case',
    readMoreLabel: 'Read more',
    closeModalLabel: 'Close',
    overviewTabLabel: 'Overview',
    resultsTabLabel: 'Results',
    detailsTabsAriaLabel: 'Case details tabs',
    prevSlideLabel: 'Previous',
    nextSlideLabel: 'Next',
    sensitiveWarning: 'Sensitive content',
    showSensitiveLabel: 'View image',
    hideSensitiveLabel: 'Hide image',
    cards: [
      {
        id: 'jose-santos-01',
        name: 'Patient: Jose Santos',
        treatment: 'Treatment: Full mouth implant rehabilitation',
        location: 'Location: Nogales, Mexico (minutes from the U.S. border)',
        images: [
          { src: '/cases/jose-santos/IMG_0242.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_0278.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_0280.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_0537.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_2794.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_2994.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_4684.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_4691.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_4704.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_6695.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_7804.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_7868.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_7877.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_7903.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_7996.JPG', sensitive: true },
          { src: '/cases/jose-santos/IMG_8021.JPG', sensitive: true },
        ],
        modal: {
          overview: {
            title: 'A Life-Changing Solution for Missing Teeth',
            paragraphs: [
              'José came to our clinic with severe tooth loss, difficulty chewing, and lack of confidence when smiling. He was looking for a permanent, natural-looking solution—not removable dentures.',
              'Using advanced digital planning and guided implant surgery, we delivered a full fixed restoration that completely transformed his smile and quality of life.',
            ],
            upperTitle: 'Upper Jaw: All-on-X with Zirconia (Premium Aesthetic)',
            upperDescription:
              'For the upper arch, we placed multiple strategically positioned implants (All-on-X technique) to maximize support and long-term stability.',
            upperPoints: [
              '✔️ High-end Zirconia fixed bridge',
              '✔️ Exceptional strength and durability',
              '✔️ Ultra-natural esthetics and translucency',
              '✔️ Designed to look and feel like real teeth',
            ],
            lowerTitle: 'Lower Jaw: All-on-4 Hybrid (Strength + Efficiency)',
            lowerDescription: 'For the lower arch, we used the proven All-on-4 technique—minimizing surgery while maximizing function.',
            lowerPoints: [
              '✔️ Titanium-reinforced hybrid prosthesis',
              '✔️ Lightweight and highly functional',
              '✔️ Cost-effective without compromising quality',
              '✔️ Easy maintenance and long-term reliability',
            ],
          },
          results: {
            title: 'Results:',
            intro: 'José now enjoys:',
            points: [
              '✔️ A fully fixed smile (no removable dentures)',
              '✔️ Strong, confident chewing ability',
              '✔️ A natural, youthful appearance',
              '✔️ Renewed confidence in daily life',
            ],
            whyTitle: 'Why Patients from the U.S. Choose Us',
            whyPoints: [
              '✔️ Advanced digital planning & guided surgery',
              '✔️ Premium materials (Zirconia & Titanium)',
              '✔️ Personalized treatment by an implant specialist',
              '✔️ Significant cost savings vs. U.S. clinics',
              '✔️ Convenient location in Nogales, Mexico',
            ],
          },
        },
      },
      {
        id: 'marite-02',
        name: 'Patient: Marite',
        treatment: 'Treatment: Full Mouth Rehabilitation with Bite Elevation',
        location: 'Location: Nogales, Mexico (Minutes from the U.S. Border)',
        images: [
          { src: '/cases/marite/IMG_5113.JPG', sensitive: true },
          { src: '/cases/marite/IMG_8839.JPG', sensitive: true },
          { src: '/cases/marite/IMG_8844.JPG', sensitive: true },
          { src: '/cases/marite/IMG_8849.JPG', sensitive: true },
          { src: '/cases/marite/IMG_8857.JPG', sensitive: true },
          { src: '/cases/marite/IMG_8873.JPG', sensitive: true },
          { src: '/cases/marite/IMG_8877.JPG', sensitive: true },
          { src: '/cases/marite/IMG_8887.JPG', sensitive: true },
        ],
        modal: {
          overview: {
            title: 'Look Younger. Feel Stronger. Smile With Confidence Again.',
            paragraphs: [
              "Worn, short, or flattened teeth don't just affect your smile - they age your entire face.",
              'This patient came to us with advanced tooth wear from years of grinding (bruxism), resulting in a collapsed bite and a tired, aged appearance.',
              'She wanted more than a dental fix-she wanted a complete transformation.',
            ],
            upperTitle: 'The Problem: More Than Just Worn Teeth',
            upperDescription:
              'When the bite collapses, the lower face loses support-making patients look older than they actually are.',
            upperPoints: [
              'Teeth worn down and uneven',
              'Loss of vertical dimension (collapsed bite)',
              'Thinning lips and reduced facial support',
              'Jaw fatigue and discomfort',
              'Aged, less confident appearance',
            ],
            lowerTitle: 'The Solution: Full Mouth Reconstruction (Bite Lift)',
            lowerDescription:
              'We designed a fully customized treatment to restore her bite, facial structure, and smile aesthetics. Every step was carefully planned to ensure comfort, function, and natural beauty.',
            lowerPoints: [
              'Precise bite elevation (VDO increase)',
              'Advanced digital smile design',
              'Functional analysis for long-term stability',
              'Trial smile (mock-up) before final treatment',
            ],
          },
          results: {
            title: 'Results:',
            intro: 'Using high-end ceramic restorations (crowns and veneers), we rebuilt her smile from the ground up:',
            points: [
              'Natural, youthful tooth proportions',
              'Strong, stable bite for long-term function',
              'Harmonized smile with facial features',
              'Durable, high-performance materials',
            ],
            whyTitle: 'The Transformation',
            whyPoints: [
              'A visibly younger, more refreshed appearance',
              'Restored facial support and lip fullness',
              'Improved chewing strength and comfort',
              'A confident, natural-looking smile',
            ],
            chooseUsTitle: 'Why U.S. Patients Choose Us',
            chooseUsPoints: [
              'Specialist-level full mouth rehabilitation',
              'Advanced digital planning and precision',
              'Premium materials at a fraction of U.S. cost',
              'Personalized, high-end care',
              'Convenient border location (Nogales, Mexico)',
            ],
          },
        },
      },
    ],
  },
  testimonials: {
    eyebrow: 'Experiences',
    title: 'Patients smiling with confidence again',
    items: [
      {
        quote: 'I could smile at corporate events again without worrying about provisionals. The team explained every stage and respected my schedule.',
        author: 'Mariana G., General Counsel',
      },
      {
        quote: 'After losing teeth to bruxism, I found a plan that prioritized function. Now I chew with stability and sleep peacefully.',
        author: 'Rafael L., Mechanical Engineer',
      },
      {
        quote: 'I appreciate the clinical and financial clarity: every visit had a purpose and the digital check-ins simplify my follow-ups from Hermosillo.',
        author: 'Dr. Sonia V., OB-GYN',
      },
    ],
  },
  profile: {
    eyebrow: 'Clinical team',
    title: 'Led by a board-certified prosthodontist',
    description: 'Dr. Del Corro completed specialty training in prosthodontics, advanced implant courses, and ongoing full-mouth rehabilitation education. His practice blends clinical photography, intraoral scanning, CAD/CAM planning, and a boutique lab to shorten delivery times without losing handcrafted detail.',
    bullets: [
      'Active member of the Mexican Association of Oral Rehabilitation',
      'Speaker on immediate-load and soft-tissue management',
      'Annual education programs for referring dentists',
    ],
    quote: 'Every implant and every prosthesis tells a functional story. Our role is to keep patients informed and supported from the very first call.',
    credential: 'Dr. Fernando Del Corro · License 1234567',
  },
  contact: {
    eyebrow: 'Schedule your visit',
    title: 'In-person and virtual case coordination',
    intro: 'Share your case, radiographs, or expectations and our clinical coordinator will call you within one business day.',
    details: {
      phone: 'Phone +52 (81) 1684 2009',
      email: SITE_CONFIG.email,
      address: SITE_CONFIG.address.en,
    },
    labels: {
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      interest: 'Treatment of interest',
      message: 'Tell us more about your case',
      submit: 'Send request',
      submitting: 'Sending...',
    },
    placeholders: {
      name: 'Jane Smith',
      email: 'you@email.com',
      phone: '(81) 1684 2009',
      select: 'Select an option',
      message: 'Share background, expectations, and availability',
    },
    options: [
      { value: 'implants', label: 'Implants & immediate load' },
      { value: 'all-on-x', label: 'All-on-X rehabilitation' },
      { value: 'fixed', label: 'Fixed prosthesis / crowns' },
      { value: 'comprehensive', label: 'Comprehensive evaluation' },
    ],
    disclaimer: 'We will contact you solely for clinical purposes. Your data is protected under our privacy policy.',
    successTitle: 'Request sent',
    successMessage: 'Thank you for your interest. Our clinical coordinator will contact you within one business day.',
    successReset: 'Send another request',
  },
  footer: {
    rights: 'All rights reserved.',
    availability: 'We treat referred and direct patients by appointment only.',
    rightsDev: 'Creado por Alfredo Camacho G.',
    rightsFull: '© {year} Dr. Fernando Ari Del Corro Lopez. All rights reserved. Build by Alfredo Camacho G.',
  },
  floatingCta: {
    label: 'Chat on WhatsApp',
    ariaLabel: 'Open WhatsApp to schedule an appointment',
    message: 'Hello, I am interested in a prosthodontic evaluation.',
  },
}











