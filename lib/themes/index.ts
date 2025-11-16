/**
 * Themes Module
 * Central export point for all theme-related functionality
 */

// Theme builder and types
export { createTheme } from './theme-builder'
export type { ThemeColors, ThemeConfig } from './types'

// Individual themes
export { vercelTheme } from './vercel-theme'
export { supabaseTheme } from './supabase-theme'
export { tailwindTheme } from './tailwind-theme'
export { triggerTheme } from './trigger-theme'
export { clerkTheme } from './clerk-theme'
export { mintlifyTheme } from './mintlify-theme'
export { prismaTheme } from './prisma-theme'
export { openaiTheme } from './openai-theme'
export { elevenLabsTheme } from './elevenlabs-theme'
export { resendTheme } from './resend-theme'
export { nuxtTheme } from './nuxt-theme'

// Theme registry
export { themeMap, getTheme } from './theme-registry'

// Theme utilities
export * from './theme-utils'

