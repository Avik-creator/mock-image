'use client'

import { create } from 'zustand'
import { getAvailableFontWeights } from '@/lib/constants/fonts'

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2, 11)
}

export interface TextShadowConfig {
  enabled: boolean
  color: string
  blur: number
  offsetX: number
  offsetY: number
}

export interface OverlayBackgroundFill {
  enabled: boolean
  color: string
  opacity: number
}

export interface TextOverlay {
  id: string
  text: string
  position: { x: number; y: number }
  fontSize: number
  fontWeight: string
  fontFamily: string
  color: string
  opacity: number
  isVisible: boolean
  orientation: 'horizontal' | 'vertical'
  maxWidth: number
  rotation: number
  textShadow: TextShadowConfig
  backgroundFill: OverlayBackgroundFill
}

export type StickerType = 'library' | 'custom'

export interface Sticker {
  id: string
  asset: string
  label: string
  position: { x: number; y: number }
  scale: number
  rotation: number
  opacity: number
  isVisible: boolean
  type: StickerType
}

interface ImageStore {
  textOverlays: TextOverlay[]
  stickers: Sticker[]
  selectedOverlayId: string | null
  selectedStickerId: string | null
  addTextOverlay: (overlay: Omit<TextOverlay, 'id'>) => void
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void
  removeTextOverlay: (id: string) => void
  clearTextOverlays: () => void
  setSelectedOverlayId: (id: string | null) => void
  addSticker: (sticker: Omit<Sticker, 'id'>) => void
  updateSticker: (id: string, updates: Partial<Sticker>) => void
  removeSticker: (id: string) => void
  clearStickers: () => void
  setSelectedStickerId: (id: string | null) => void
}

export const useImageStore = create<ImageStore>((set, get) => ({
  textOverlays: [],
  stickers: [],
  selectedOverlayId: null,
  selectedStickerId: null,
  addTextOverlay: (overlay) =>
    set((state) => {
      const newOverlay: TextOverlay = {
        ...overlay,
        id: createId(),
      }
      return {
        textOverlays: [...state.textOverlays, newOverlay],
        selectedOverlayId: newOverlay.id,
        selectedStickerId: null,
      }
    }),
  updateTextOverlay: (id, updates) =>
    set((state) => ({
      textOverlays: state.textOverlays.map((overlay) =>
        overlay.id === id
          ? {
              ...overlay,
              ...updates,
              textShadow: updates.textShadow
                ? { ...overlay.textShadow, ...updates.textShadow }
                : overlay.textShadow,
              backgroundFill: updates.backgroundFill
                ? { ...overlay.backgroundFill, ...updates.backgroundFill }
                : overlay.backgroundFill,
            }
          : overlay
      ),
    })),
  removeTextOverlay: (id) =>
    set((state) => {
      const nextOverlays = state.textOverlays.filter((overlay) => overlay.id !== id)
      const nextSelected = state.selectedOverlayId === id ? null : state.selectedOverlayId
      return {
        textOverlays: nextOverlays,
        selectedOverlayId: nextSelected,
      }
    }),
  clearTextOverlays: () =>
    set(() => ({
      textOverlays: [],
      selectedOverlayId: null,
    })),
  setSelectedOverlayId: (id) =>
    set((state) => ({
      selectedOverlayId: id,
      selectedStickerId: id ? null : state.selectedStickerId,
    })),
  addSticker: (sticker) =>
    set((state) => {
      const newSticker: Sticker = {
        id: createId(),
        type: 'library',
        ...sticker,
      }
      return {
        stickers: [...state.stickers, newSticker],
        selectedStickerId: newSticker.id,
        selectedOverlayId: null,
      }
    }),
  updateSticker: (id, updates) =>
    set((state) => ({
      stickers: state.stickers.map((sticker) =>
        sticker.id === id
          ? {
              ...sticker,
              ...updates,
            }
          : sticker
      ),
    })),
  removeSticker: (id) =>
    set((state) => {
      const nextStickers = state.stickers.filter((sticker) => sticker.id !== id)
      const nextSelected = state.selectedStickerId === id ? null : state.selectedStickerId
      return {
        stickers: nextStickers,
        selectedStickerId: nextSelected,
      }
    }),
  clearStickers: () =>
    set(() => ({
      stickers: [],
      selectedStickerId: null,
    })),
  setSelectedStickerId: (id) =>
    set((state) => ({
      selectedStickerId: id,
      selectedOverlayId: id ? null : state.selectedOverlayId,
    })),
}))

// Utility helpers for initial defaults
export const getDefaultTextOverlay = (text: string) => {
  const defaultFont = 'system'
  const weights = getAvailableFontWeights(defaultFont)
  return {
    text,
    position: { x: 50, y: 50 },
    fontSize: 24,
    fontWeight: weights[0] || '400',
    fontFamily: defaultFont,
    color: '#ffffff',
    opacity: 1,
    isVisible: true,
    orientation: 'horizontal' as const,
    maxWidth: 40,
    rotation: 0,
    textShadow: {
      enabled: false,
      color: 'rgba(0, 0, 0, 0.35)',
      blur: 4,
      offsetX: 2,
      offsetY: 2,
    },
    backgroundFill: {
      enabled: false,
      color: '#000000',
      opacity: 0.2,
    },
  }
}

