// ============================================
// SOULTAILS — GLOBAL DESIGN TOKENS
// Colors extracted from Claudia's logo
// Change here → updates entire website
// ============================================
export const tokens = {
  colors: {
    primary: '#C85B6E',        // coral pink — logo cat
    primaryHover: '#B04860',
    primaryLight: '#FCEEF1',
    purple: '#B784C4',         // Soultails text purple
    purpleLight: '#F5EDF9',
    teal: '#7BC5C8',           // logo flower teal
    tealLight: '#EDF8F9',
    sage: '#8FB84E',           // logo leaves
    bgPage: '#FDFAF7',         // warm cream
    bgCard: '#FFFFFF',
    bgSection: '#FAF5F0',
    bgDark: '#2D1F35',         // deep plum
    linen: '#EDE0D4',
    textPrimary: '#2D1F35',
    textSecondary: '#6B5060',
    textMuted: '#A8899A',
  },
  fonts: {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Nunito', system-ui, sans-serif",
  },
} as const
