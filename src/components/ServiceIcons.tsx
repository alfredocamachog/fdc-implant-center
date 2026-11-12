import type { ReactElement } from 'react'

/*
 * Pseudo-3D service icons. Every icon shares the gradients defined in <ServiceIconDefs />
 * (rendered once per page): light comes from the top-left, each object gets a glossy
 * specular highlight, side shading and a soft contact shadow, so the set reads as one family.
 */

const TOOTH_PATH =
  'M21 10c-6.5 0-10.5 5-9.6 12.2.7 5.6 3.5 9 4.6 14.6 1.2 6.3 1.8 15.2 5.6 15.2 3.6 0 4-7.6 5.6-12.4.9-2.6 2.5-3.8 4.8-3.8s3.9 1.2 4.8 3.8c1.6 4.8 2 12.4 5.6 12.4 3.8 0 4.4-8.9 5.6-15.2 1.1-5.6 3.9-9 4.6-14.6C53.5 15 49.5 10 43 10c-4.6 0-7 2.2-11 2.2S25.6 10 21 10z'

const INCISOR_PATH =
  'M22 8h20c3 0 5 2.4 4.7 5.4l-2 15c-.4 3-1.4 5.4-2.6 7.6L37 52c-1 3-4 3.8-5 3.8s-4-.8-5-3.8l-5.1-16c-1.2-2.2-2.2-4.6-2.6-7.6l-2-15C17 10.4 19 8 22 8z'

const VENEER_PATH =
  'M22 8h20c3 0 5 2.4 4.7 5.4l-2 15c-.4 3-1.4 5.4-2.6 7.6H21.9c-1.2-2.2-2.2-4.6-2.6-7.6l-2-15C17 10.4 19 8 22 8z'

const SPARKLE_PATH = 'M0-6c.8 3.4 2.6 5.2 6 6-3.4.8-5.2 2.6-6 6-.8-3.4-2.6-5.2-6-6 3.4-.8 5.2-2.6 6-6z'

export function ServiceIconDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <path id="svc-tooth" d={TOOTH_PATH} />
        <path id="svc-incisor" d={INCISOR_PATH} />

        <linearGradient id="svc-enamel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#eef6fb" />
          <stop offset="1" stopColor="#b8d2e3" />
        </linearGradient>
        <linearGradient id="svc-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.45" stopColor="#173e5f" stopOpacity="0" />
          <stop offset="1" stopColor="#173e5f" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="svc-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="svc-gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb9c6" />
          <stop offset="0.55" stopColor="#ee7f97" />
          <stop offset="1" stopColor="#c7506d" />
        </linearGradient>
        <linearGradient id="svc-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5f6e7a" />
          <stop offset="0.35" stopColor="#eef3f6" />
          <stop offset="0.6" stopColor="#a7b4be" />
          <stop offset="1" stopColor="#56636e" />
        </linearGradient>
        <linearGradient id="svc-wire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f6f8" />
          <stop offset="1" stopColor="#7d8b96" />
        </linearGradient>
        <linearGradient id="svc-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.45" stopColor="#f3c552" />
          <stop offset="1" stopColor="#b5800f" />
        </linearGradient>
        <linearGradient id="svc-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4fdff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#7fd3ea" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="svc-ceramic" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6fbff" />
          <stop offset="1" stopColor="#4fbfd9" />
        </linearGradient>
        <linearGradient id="svc-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fe3f5" />
          <stop offset="1" stopColor="#0d89a1" />
        </linearGradient>
        <linearGradient id="svc-navy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a6c94" />
          <stop offset="1" stopColor="#12324d" />
        </linearGradient>
        <linearGradient id="svc-pulp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9aa6" />
          <stop offset="1" stopColor="#c8364f" />
        </linearGradient>
        <linearGradient id="svc-dentin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6e6" />
          <stop offset="1" stopColor="#d9bf98" />
        </linearGradient>
        <linearGradient id="svc-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fe3f5" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7fe3f5" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="svc-shadow">
          <stop offset="0" stopColor="#0b1f31" stopOpacity="0.32" />
          <stop offset="1" stopColor="#0b1f31" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="svc-bubble" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#d6f5fc" stopOpacity="0.7" />
          <stop offset="1" stopColor="#7fd3ea" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  )
}

const Shadow = ({ cx = 32, cy = 58, rx = 18 }: { cx?: number; cy?: number; rx?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={3.4} fill="url(#svc-shadow)" />
)

// Molar with enamel body, side shading, outline and a glossy highlight.
const Tooth = ({ transform }: { transform?: string }) => (
  <g transform={transform}>
    <use href="#svc-tooth" fill="url(#svc-enamel)" />
    <use href="#svc-tooth" fill="url(#svc-shade)" />
    <use href="#svc-tooth" fill="none" stroke="#173e5f" strokeOpacity="0.2" strokeWidth="1" />
    <ellipse cx="22.5" cy="19" rx="5" ry="3" transform="rotate(-25 22.5 19)" fill="url(#svc-shine)" />
  </g>
)

const Incisor = ({ transform }: { transform?: string }) => (
  <g transform={transform}>
    <use href="#svc-incisor" fill="url(#svc-enamel)" />
    <use href="#svc-incisor" fill="url(#svc-shade)" />
    <use href="#svc-incisor" fill="none" stroke="#173e5f" strokeOpacity="0.2" strokeWidth="1" />
    <ellipse cx="25" cy="15" rx="2.6" ry="5" transform="rotate(-8 25 15)" fill="url(#svc-shine)" />
  </g>
)

const Sparkle = ({ x, y, scale = 1, fill = '#ffffff' }: { x: number; y: number; scale?: number; fill?: string }) => (
  <path d={SPARKLE_PATH} transform={`translate(${x} ${y}) scale(${scale})`} fill={fill} />
)

// Small crown used in rows (dentures, bridges, braces).
const MiniTooth = ({ x, y, w = 9, h = 12 }: { x: number; y: number; w?: number; h?: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={w / 2.4} fill="url(#svc-enamel)" stroke="#173e5f" strokeOpacity="0.2" strokeWidth="0.8" />
    <rect x={x + w * 0.22} y={y + 1.6} width={w * 0.24} height={h * 0.45} rx={w * 0.12} fill="url(#svc-shine)" />
  </g>
)

const Implant = ({ x, y, h = 16 }: { x: number; y: number; h?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d={`M-3 0h6v${h - 4}l-3 4-3-4z`} fill="url(#svc-metal)" />
    {Array.from({ length: Math.floor((h - 4) / 3) }, (_, i) => (
      <path key={i} d={`M-3.6 ${2 + i * 3}l7.2 1.4`} stroke="#3d4a55" strokeOpacity="0.45" strokeWidth="0.9" strokeLinecap="round" />
    ))}
  </g>
)

const icons: Record<string, ReactElement> = {
  // Full-mouth rehabilitation: restored tooth with a completion badge.
  rehab: (
    <>
      <Shadow />
      <Tooth />
      <circle cx="47" cy="44" r="10.5" fill="url(#svc-blue)" stroke="#ffffff" strokeWidth="2.2" />
      <ellipse cx="44" cy="39.5" rx="5" ry="2.6" fill="url(#svc-shine)" opacity="0.8" />
      <path d="M42 44.3l3.4 3.4 6.4-7" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // All-on-4 / All-on-6: fixed bridge on gum base anchored by implants.
  'all-on-x': (
    <>
      <Shadow cy={60} rx={22} />
      <Implant x={15} y={36} h={20} />
      <Implant x={26} y={37} h={20} />
      <Implant x={38} y={37} h={20} />
      <Implant x={49} y={36} h={20} />
      <path d="M7 27c0-4 3-6.5 7-6.5h36c4 0 7 2.5 7 6.5v6c0 3.2-2.4 5.5-5.6 5.5H12.6C9.4 38.5 7 36.2 7 33z" fill="url(#svc-gum)" />
      <path d="M10 24h44" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
      <MiniTooth x={8.5} y={12} w={9} h={14} />
      <MiniTooth x={18} y={10.5} w={9} h={15} />
      <MiniTooth x={27.5} y={10} w={9} h={15.5} />
      <MiniTooth x={37} y={10.5} w={9} h={15} />
      <MiniTooth x={46.5} y={12} w={9} h={14} />
    </>
  ),
  // Veneers: thin ceramic shell lifting off the front of an incisor.
  veneers: (
    <>
      <Shadow />
      <Incisor transform="translate(4 0)" />
      <g transform="translate(-7 6) rotate(-8 32 22) scale(0.9)">
        <path d={VENEER_PATH} fill="url(#svc-glass)" stroke="#ffffff" strokeWidth="1.6" opacity="0.92" />
        <path d="M21 12c1 4 1.6 9 2.6 15" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
      </g>
      <Sparkle x={50} y={12} scale={0.9} fill="#7fdcef" />
    </>
  ),
  // Crowns: gold crown cap settling onto a prepared tooth.
  crowns: (
    <>
      <Shadow cy={60} />
      <path
        d="M24 36h16c2 0 3 1.5 2.6 3.4L41 47c-.3 1.6-1.2 5.6-3 8.4-1 1.6-3 .8-3.4-1L33 49h-2l-1.6 5.4c-.4 1.8-2.4 2.6-3.4 1-1.8-2.8-2.7-6.8-3-8.4l-1.6-7.6C21 37.5 22 36 24 36z"
        fill="url(#svc-dentin)"
        stroke="#173e5f"
        strokeOpacity="0.2"
      />
      <path d="M26 30.5h12" stroke="#7fdcef" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 2.4" />
      <path
        d="M17 11c0-3 3-5 6-5 3 0 5.4 1.6 9 1.6S38 6 41 6c3 0 6 2 6 5 0 6-1 11-3 14-1 1.5-2.5 2.5-4.5 2.5h-15c-2 0-3.5-1-4.5-2.5-2-3-3-8-3-14z"
        fill="url(#svc-gold)"
        stroke="#9a6a06"
        strokeOpacity="0.35"
      />
      <ellipse cx="24" cy="12" rx="4" ry="2.2" transform="rotate(-15 24 12)" fill="url(#svc-shine)" />
      <path d="M22 24.5h20" stroke="#9a6a06" strokeOpacity="0.35" strokeWidth="1" />
    </>
  ),
  // Inlays & onlays: ceramic piece lifting out of a molar's occlusal cavity.
  inlays: (
    <>
      <Shadow cy={58} rx={20} />
      <path d="M12 26c0-7 5.5-11 12-11h16c6.5 0 12 4 12 11v12c0 8.5-6.5 15-15 15H27c-8.5 0-15-6.5-15-15z" fill="url(#svc-enamel)" stroke="#173e5f" strokeOpacity="0.2" />
      <path d="M12 26c0-7 5.5-11 12-11h16c6.5 0 12 4 12 11v12c0 8.5-6.5 15-15 15H27c-8.5 0-15-6.5-15-15z" fill="url(#svc-shade)" />
      <path d="M25 30c0-2 2-3.5 4-3.5h6c2 0 4 1.5 4 3.5v7c0 3-2.5 5-5 5h-4c-2.5 0-5-2-5-5z" fill="#173e5f" fillOpacity="0.22" />
      <path d="M18 22c1-2.5 3-4 6-4.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="32" cy="27" rx="7" ry="2" fill="url(#svc-shadow)" />
      <path d="M25 15c0-2 2-3.5 4-3.5h6c2 0 4 1.5 4 3.5v7c0 3-2.5 5-5 5h-4c-2.5 0-5-2-5-5z" fill="url(#svc-ceramic)" stroke="#ffffff" strokeWidth="1.2" />
      <ellipse cx="29" cy="15.5" rx="2.2" ry="1.4" fill="url(#svc-shine)" />
    </>
  ),
  // Composite fillings: curing light beaming onto a tooth.
  composites: (
    <>
      <Shadow cx={28} rx={16} />
      <Tooth transform="translate(-4 6) scale(0.86)" />
      <path d="M38 17l-17 10 7 4z" fill="url(#svc-beam)" />
      <g transform="rotate(-32 46 14)">
        <rect x="34" y="10" width="26" height="8" rx="4" fill="url(#svc-navy)" />
        <rect x="36" y="11.2" width="18" height="2" rx="1" fill="#ffffff" opacity="0.35" />
        <rect x="31" y="10.6" width="5" height="6.8" rx="1.6" fill="url(#svc-blue)" />
      </g>
      <circle cx="24" cy="28" r="3.2" fill="url(#svc-ceramic)" stroke="#ffffff" strokeWidth="1" />
    </>
  ),
  // Complete dentures: horseshoe acrylic base with a full row of teeth.
  'complete-dentures': (
    <>
      <Shadow cy={60} rx={22} />
      <path
        d="M8 30c0-11 10.5-19 24-19s24 8 24 19v8c0 9-5.5 16-12.5 16-4.4 0-6-3.5-6-8.5V35c0-3.4-2.4-5.5-5.5-5.5s-5.5 2.1-5.5 5.5v10.5c0 5-1.6 8.5-6 8.5C13.5 54 8 47 8 38z"
        fill="url(#svc-gum)"
      />
      <path d="M12 30c1-7 9-13.5 20-13.5" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {[
        [14.5, 43],
        [13.2, 34],
        [16, 25.5],
        [22.5, 19],
        [32, 16.5],
        [41.5, 19],
        [48, 25.5],
        [50.8, 34],
        [49.5, 43],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="4.3" fill="url(#svc-enamel)" stroke="#173e5f" strokeOpacity="0.22" strokeWidth="0.8" />
          <circle cx={cx - 1.3} cy={cy - 1.4} r="1.3" fill="#ffffff" opacity="0.9" />
        </g>
      ))}
    </>
  ),
  // Removable partial dentures: small base with teeth and metal clasps.
  'partial-dentures': (
    <>
      <Shadow cy={59} rx={20} />
      <path d="M8 38c-3-6-1.5-12.5 5-15" stroke="url(#svc-wire)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M56 38c3-6 1.5-12.5-5-15" stroke="url(#svc-wire)" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Solid colour: a gradient on a zero-height line has no bounding box and would not render. */}
      <path d="M10 42h44" stroke="#8e9ca7" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M13 36c0-3.3 2.6-6 6-6h26c3.4 0 6 2.7 6 6v8c0 4.4-3.6 8-8 8H21c-4.4 0-8-3.6-8-8z" fill="url(#svc-gum)" />
      <path d="M17 33h30" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
      <MiniTooth x={20} y={13} w={11} h={19} />
      <MiniTooth x={33} y={13} w={11} h={19} />
    </>
  ),
  // Professional cleaning: sparkling tooth with polish bubbles.
  cleaning: (
    <>
      <Shadow />
      <Tooth />
      <Sparkle x={52} y={13} scale={1.15} fill="#7fdcef" />
      <Sparkle x={9} y={30} scale={0.75} fill="#7fdcef" />
      <Sparkle x={42} y={24} scale={0.7} />
      <circle cx="51" cy="35" r="4.2" fill="url(#svc-bubble)" stroke="#ffffff" strokeWidth="0.8" />
      <circle cx="12" cy="17" r="3" fill="url(#svc-bubble)" stroke="#ffffff" strokeWidth="0.8" />
      <circle cx="55" cy="44" r="2.2" fill="url(#svc-bubble)" stroke="#ffffff" strokeWidth="0.8" />
    </>
  ),
  // Root canal therapy: translucent tooth showing pulp and canals, with an endo file.
  endodontics: (
    <>
      <Shadow />
      <Tooth />
      <ellipse cx="32" cy="24" rx="7" ry="4.6" fill="url(#svc-pulp)" />
      <path d="M27.5 26.5c-2 6-4 13.5-6 22M36.5 26.5c2 6 4 13.5 6 22" stroke="url(#svc-pulp)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="30" cy="22.6" rx="2.6" ry="1.3" fill="#ffffff" opacity="0.6" />
      <path d="M48 2.5 38.5 24" stroke="url(#svc-wire)" strokeWidth="2" strokeLinecap="round" />
      <rect x="45.5" y="-1" width="8" height="6" rx="1.6" transform="rotate(24 49.5 2)" fill="url(#svc-blue)" stroke="#ffffff" strokeWidth="0.8" />
    </>
  ),
  // Braces & Invisalign: teeth with brackets and archwire.
  orthodontics: (
    <>
      <Shadow cy={56} rx={22} />
      <MiniTooth x={6} y={14} w={15} h={30} />
      <MiniTooth x={24.5} y={12} w={15} h={32} />
      <MiniTooth x={43} y={14} w={15} h={30} />
      <path d="M5 30.5c9-2 45-2 54 0" stroke="url(#svc-wire)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {[13.5, 32, 50.5].map((cx) => (
        <g key={cx}>
          <rect x={cx - 4} y={26.5} width="8" height="8" rx="1.8" fill="url(#svc-metal)" stroke="#3d4a55" strokeOpacity="0.4" strokeWidth="0.7" />
          <rect x={cx - 2.4} y={27.6} width="2.4" height="2" rx="0.6" fill="#ffffff" opacity="0.8" />
        </g>
      ))}
    </>
  ),
  // Wisdom tooth surgery: impacted, tilted molar below the gum line.
  'wisdom-teeth': (
    <>
      <Shadow cy={60} rx={24} />
      <Tooth transform="rotate(28 32 34) translate(4 6) scale(0.82)" />
      <path d="M4 40c9-3.2 18-3.2 28 0s19 3.2 28 0v14c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4z" fill="url(#svc-gum)" />
      <path d="M8 41.5c7-2 14-2 22 0" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M50 26c1-8-3.5-14.5-11-16" stroke="url(#svc-blue)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M41.5 5.8 37.5 10l5 2.6" stroke="url(#svc-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
}

export default function ServiceIcon({ id }: { id: string }) {
  return (
    <svg className="svc-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {icons[id] ?? icons.rehab}
    </svg>
  )
}
