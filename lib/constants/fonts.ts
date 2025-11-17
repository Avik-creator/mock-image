'use client'

export interface FontFamily {
  id: string
  name: string
  stack: string
  weights: string[]
}

export const fontFamilies: FontFamily[] = [
  {
    id: 'system',
    name: 'System Sans',
    stack: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    weights: ['300', '400', '500', '600', '700', '800'],
  },
  {
    id: 'serif',
    name: 'Classic Serif',
    stack: "'Times New Roman', Times, serif",
    weights: ['400', '500', '600', '700'],
  },
  {
    id: 'mono',
    name: 'Mono',
    stack: "'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace",
    weights: ['400', '500', '600', '700'],
  },
  {
    id: 'display',
    name: 'Display',
    stack: "'Copperplate', 'Papyrus', 'Gill Sans', 'Segoe UI', sans-serif",
    weights: ['400', '500', '600', '700'],
  },
  {
    id: 'rounded',
    name: 'Rounded',
    stack: "'Product Sans', 'Nunito', 'Quicksand', 'Segoe UI', sans-serif",
    weights: ['300', '400', '500', '600'],
  },
]

export const getAvailableFontWeights = (fontId: string) => {
  const font = fontFamilies.find((f) => f.id === fontId)
  return font?.weights ?? ['400', '600', '700']
}

export const getFontStack = (fontId: string) => {
  const font = fontFamilies.find((f) => f.id === fontId)
  return font?.stack ?? fontFamilies[0].stack
}

