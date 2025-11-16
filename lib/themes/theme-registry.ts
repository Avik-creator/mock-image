import { themes } from 'prism-react-renderer'
import { vercelTheme } from './vercel-theme'
import { supabaseTheme } from './supabase-theme'
import { tailwindTheme } from './tailwind-theme'
import { triggerTheme } from './trigger-theme'
import { clerkTheme } from './clerk-theme'
import { mintlifyTheme } from './mintlify-theme'
import { prismaTheme } from './prisma-theme'
import { openaiTheme } from './openai-theme'
import { elevenLabsTheme } from './elevenlabs-theme'
import { resendTheme } from './resend-theme'
import { nuxtTheme } from './nuxt-theme'

/**
 * Theme Registry
 * Central registry mapping theme names to their configurations
 */
export const themeMap: Record<string, any> = {
  // Standard Prism themes
  monokai: themes.vsDark, // Monokai-like dark theme
  github: themes.github,
  dracula: themes.dracula,
  nightOwl: themes.nightOwl,
  oceanicNext: themes.oceanicNext,
  atomDark: themes.oneDark,
  synthwave: themes.synthwave84,
  vsDark: themes.vsDark,
  vsLight: themes.vsLight,
  duotoneLight: themes.duotoneLight,
  duotoneDark: themes.duotoneDark,
  shadesOfPurple: themes.shadesOfPurple,
  palenight: themes.palenight,
  materialDark: (themes as any).materialDark || themes.vsDark,
  materialLight: (themes as any).materialLight || themes.vsLight,
  materialOceanic: (themes as any).materialOceanic || themes.oceanicNext,
  nord: (themes as any).nord || themes.vsDark,
  oneLight: themes.oneLight,
  pojoaque: (themes as any).pojoaque || themes.vsDark,
  vscDarkPlus: (themes as any).vscDarkPlus || themes.vsDark,
  zTouch: (themes as any).zTouch || themes.vsDark,

  // Custom tech themes
  vercel: vercelTheme,
  supabase: supabaseTheme,
  tailwind: tailwindTheme,
  trigger: triggerTheme,
  clerk: clerkTheme,
  mintlify: mintlifyTheme,
  prisma: prismaTheme,
  openai: openaiTheme,
  elevenlabs: elevenLabsTheme,
  resend: resendTheme,
  nuxt: nuxtTheme,
}

/**
 * Get a theme by name
 * @param themeName - The name of the theme
 * @returns The theme configuration or a default theme
 */
export function getTheme(themeName: string) {
  return themeMap[themeName] || themes.vsDark
}

