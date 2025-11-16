/**
 * Theme Utilities
 * Helper functions for theme-specific styling and configuration
 */

export const TECH_THEMES = [
  'vercel',
  'supabase',
  'tailwind',
  'trigger',
  'clerk',
  'mintlify',
  'prisma',
  'openai',
  'elevenlabs',
  'resend',
  'nuxt',
] as const

export const LIGHT_THEMES = [
  'vsLight',
  'duotoneLight',
  'materialLight',
  'oneLight',
] as const

export type TechTheme = typeof TECH_THEMES[number]
export type LightTheme = typeof LIGHT_THEMES[number]

/**
 * Check if a theme is a tech theme
 */
export function isTechTheme(theme: string): theme is TechTheme {
  return TECH_THEMES.includes(theme as TechTheme)
}

/**
 * Check if a theme is a light theme
 */
export function isLightTheme(theme: string): theme is LightTheme {
  return LIGHT_THEMES.includes(theme as LightTheme)
}

/**
 * Get window background color for a theme
 */
export function getWindowBackground(theme: string): string {
  if (isLightTheme(theme)) return '#ffffff'
  
  const themeBgMap: Record<string, string> = {
    vercel: '#000000',
    supabase: '#171717',
    tailwind: '#1e293b',
    trigger: '#121317',
    clerk: '#111111',
    mintlify: '#070a08',
    prisma: 'hsla(223, 41%, 7%, 75%)',
    openai: '#232b41',
    elevenlabs: '#111',
    resend: 'hsla(0, 0%, 0%, 0.88)',
    nuxt: '#0b0c11',
  }
  
  return themeBgMap[theme] || '#1e1e1e'
}

/**
 * Get controls background color for a theme
 */
export function getControlsBackground(theme: string): string {
  if (isLightTheme(theme)) return '#f5f5f5'
  
  const controlsBgMap: Record<string, string> = {
    vercel: '#000000',
    supabase: '#1f1f1f',
    tailwind: '#1e293b',
    trigger: '#16181d',
    clerk: '#191919',
    mintlify: '#010201',
    prisma: 'hsla(223, 41%, 7%, 75%)',
    openai: '#232b41',
    elevenlabs: '#111',
    resend: 'hsla(0, 0%, 0%, 0.9)',
    nuxt: '#0b0c11',
  }
  
  return controlsBgMap[theme] || '#2d2d2d'
}

/**
 * Get border color for a theme
 */
export function getBorderColor(theme: string): string {
  if (isLightTheme(theme)) return 'rgba(0,0,0,0.1)'
  
  const borderColorMap: Record<string, string> = {
    vercel: '#1a1a1a',
    supabase: '#292929',
    tailwind: 'rgb(255 255 255 / 10%)',
    trigger: '#272a2e',
    clerk: '#353535',
    mintlify: '#141818',
    prisma: 'transparent',
    openai: 'rgba(255, 255, 255, 0.1)',
    elevenlabs: '#353535',
    resend: 'hsla(0, 0%, 24%, 0.13)',
    nuxt: 'transparent',
  }
  
  return borderColorMap[theme] || 'rgba(255,255,255,0.05)'
}

/**
 * Get frame background style for a theme
 */
export function getFrameBackgroundStyle(theme: string, background: string) {
  // Check if user has selected a custom background (not the default)
  const hasCustomBackground = background !== 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
  
  // If user selected a custom background (gradient, image, or solid color), use it
  if (hasCustomBackground) {
    if (background === 'transparent') {
      return { backgroundColor: 'transparent' }
    } else if (background.startsWith('/')) {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    } else if (background.startsWith('linear-gradient') || background.startsWith('radial-gradient')) {
      return { backgroundImage: background }
    } else {
      return { backgroundColor: background }
    }
  }
  
  // Theme-specific frame backgrounds (only when using default background)
  const frameBgMap: Record<string, Record<string, string>> = {
    vercel: { backgroundColor: '#000000' },
    supabase: { backgroundColor: '#121212' },
    tailwind: { backgroundColor: '#0f172a' },
    trigger: { backgroundColor: '#121317' },
    clerk: { backgroundColor: '#222222' },
    mintlify: { backgroundColor: '#121212' },
    prisma: { background: 'linear-gradient(140deg, #0c1d26 0%, #0a0c17 100%)' },
    openai: { backgroundColor: '#121a29' },
    elevenlabs: { backgroundColor: '#111' },
    resend: { backgroundColor: '#000000' },
    nuxt: { backgroundColor: '#0b0c11' },
  }
  
  return frameBgMap[theme] || { backgroundImage: background }
}

/**
 * Get window title color for a theme
 */
export function getWindowTitleColor(theme: string, isLight: boolean): string {
  const titleColorMap: Record<string, string> = {
    vercel: '#eeeeee',
    supabase: '#fafafa',
    tailwind: '#e2e8f0',
    trigger: '#b5b8c0',
    clerk: '#ffffff',
    mintlify: '#55d799',
    prisma: '#e2e8f0',
    openai: '#ffffff',
    elevenlabs: '#ffffff',
    resend: 'hsl(0, 0%, 98%)',
    nuxt: '#ffffff',
  }
  
  return titleColorMap[theme] || (isLight ? '#666666' : '#cccccc')
}

/**
 * Get line number color for a theme
 */
export function getLineNumberColor(theme: string, isLight: boolean): string {
  const lineNumberColorMap: Record<string, string> = {
    vercel: '#a0a0a0',
    supabase: '#898989',
    tailwind: '#64748b',
    trigger: '#5f6570',
    clerk: '#666666',
    mintlify: '#4a5568',
    prisma: '#64748b',
    openai: 'rgba(255, 255, 255, 0.2)',
    elevenlabs: '#666666',
    resend: '#666666',
    nuxt: '#8b949e',
  }
  
  return lineNumberColorMap[theme] || (isLight ? '#666666' : '#888888')
}

/**
 * Get gridline color for a theme
 */
export function getGridlineColor(theme: string): string {
  const gridlineColorMap: Record<string, string> = {
    vercel: '#1a1a1a',
    tailwind: 'rgba(255, 255, 255, 0.1)',
    trigger: '#272a2e',
    elevenlabs: '#353535',
    nuxt: 'transparent',
  }
  
  return gridlineColorMap[theme] || '#1a1a1a'
}

/**
 * Check if theme should show gridlines
 */
export function shouldShowGridlines(theme: string): boolean {
  return ['vercel', 'tailwind', 'trigger', 'elevenlabs', 'nuxt'].includes(theme)
}

/**
 * Check if theme should show transparent pattern overlay
 */
export function shouldShowTransparentPattern(theme: string, background: string): boolean {
  return background === 'transparent' && !isTechTheme(theme)
}

