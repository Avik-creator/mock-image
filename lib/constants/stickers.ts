'use client'

export interface StickerAsset {
  id: string
  name: string
  src: string
  description?: string
}

export const stickerLibrary: StickerAsset[] = [
  {
    id: 'spark',
    name: 'Spark',
    src: '/stickers/spark.svg',
    description: 'Bright sparkle accent',
  },
  {
    id: 'blob',
    name: 'Blob',
    src: '/stickers/blob.svg',
    description: 'Organic gradient blob',
  },
  {
    id: 'badge',
    name: 'Badge',
    src: '/stickers/badge.svg',
    description: 'Rounded badge shape',
  },
  {
    id: 'underline',
    name: 'Underline',
    src: '/stickers/underline.svg',
    description: 'Hand-drawn underline',
  },
]

