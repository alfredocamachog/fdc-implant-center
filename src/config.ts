export interface SitePhone {
  id: 'mx' | 'us'
  countryLabel: {
    es: string
    en: string
  }
  display: string
  e164: string
  waNumber: string
}

export const SITE_CONFIG = {
  phones: [
    {
      id: 'mx',
      countryLabel: {
        es: 'México',
        en: 'Mexico',
      },
      display: '+52 631 186 7780',
      e164: '+526311867780',
      waNumber: '526311867780',
    },
    {
      id: 'us',
      countryLabel: {
        es: 'USA',
        en: 'USA',
      },
      display: '+1 520 681 3640',
      e164: '+15206813640',
      waNumber: '15206813640',
    },
  ] as const satisfies readonly SitePhone[],
  defaultWhatsAppPhoneId: 'mx' as const,
  email: 'drfernandoadelcorro@gmail.com',
  maps: {
    query: 'Prime Dental Nogales, Campillo 110, Fundó Legal, Centro, 84030 Heroica Nogales, Son., Mexico',
    coordinates: '',
    zoom: 18,
    placeId: 'ChIJd_9Nxamt1oYRWI2AhhHHD90',
  },
  address: {
    es: 'Campillo 110, Fundó Legal, Centro, 84030 Heroica Nogales, Son.',
    en: 'Campillo 110, Fundó Legal, Centro, 84030 Heroica Nogales, Son.',
  },
  brand: 'Dr. Fernando Del Corro',
  tagline: 'Prosthodontics & Implants',
}
