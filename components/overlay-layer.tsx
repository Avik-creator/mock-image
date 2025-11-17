'use client'

import { useEffect, useRef } from 'react'
import { useImageStore } from '@/lib/store'
import { getFontStack } from '@/lib/constants/fonts'
import { cn } from '@/lib/utils'

interface OverlayLayerProps {
  interactive?: boolean
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const applyAlphaToColor = (color: string, alpha: number) => {
  if (!color) return 'transparent'

  const normalizedAlpha = clamp(alpha, 0, 1)

  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const parseHex = (value: string) => parseInt(value, 16)

    if (hex.length === 3) {
      const r = parseHex(hex[0] + hex[0])
      const g = parseHex(hex[1] + hex[1])
      const b = parseHex(hex[2] + hex[2])
      return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha})`
    }

    if (hex.length === 6) {
      const r = parseHex(hex.slice(0, 2))
      const g = parseHex(hex.slice(2, 4))
      const b = parseHex(hex.slice(4, 6))
      return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha})`
    }

    return color
  }

  if (color.startsWith('rgba')) {
    return color.replace(/rgba\(([^)]+)\)/, (_, components) => {
      const [r, g, b] = components.split(',').map((part) => part.trim()).slice(0, 3)
      return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha})`
    })
  }

  if (color.startsWith('rgb')) {
    return color.replace(/rgb\(([^)]+)\)/, (_, components) => {
      return `rgba(${components}, ${normalizedAlpha})`
    })
  }

  return color
}

export function OverlayLayer({ interactive = true }: OverlayLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const {
    textOverlays,
    stickers,
    selectedOverlayId,
    selectedStickerId,
    setSelectedOverlayId,
    setSelectedStickerId,
    updateTextOverlay,
    updateSticker,
  } = useImageStore()

  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.style.cursor = ''
      }
    }
  }, [])

  useEffect(() => {
    if (!interactive) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const parentContainer = containerRef.current?.parentElement
      if (!parentContainer) return

      const clickedInsidePreview = parentContainer.contains(target)
      if (!clickedInsidePreview) {
        return
      }

      const interactedWithOverlayItem = target.closest('[data-overlay-item]')
      const interactedWithOverlayControls = target.closest('[data-overlay-controls]')

      if (interactedWithOverlayItem || interactedWithOverlayControls) {
        return
      }

      setSelectedOverlayId(null)
      setSelectedStickerId(null)
    }

    window.addEventListener('pointerdown', handlePointerDown, true)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, true)
    }
  }, [interactive, setSelectedOverlayId, setSelectedStickerId])

  const getContainerMetrics = () => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) {
      return null
    }
    return {
      width: rect.width,
      height: rect.height,
    }
  }

  const startDrag = (type: 'text' | 'sticker', id: string, event: React.PointerEvent) => {
    if (!interactive) return
    event.preventDefault()
    event.stopPropagation()
    const metrics = getContainerMetrics()
    if (!metrics) return
    const startX = event.clientX
    const startY = event.clientY

    const target =
      type === 'text'
        ? textOverlays.find((overlay) => overlay.id === id)
        : stickers.find((sticker) => sticker.id === id)

    if (!target) return

    const initialPosition = { ...target.position }

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / metrics.width) * 100
      const deltaY = ((moveEvent.clientY - startY) / metrics.height) * 100
      const nextPosition = {
        x: clamp(initialPosition.x + deltaX, 0, 100),
        y: clamp(initialPosition.y + deltaY, 0, 100),
      }

      if (type === 'text') {
        updateTextOverlay(id, { position: nextPosition })
      } else {
        updateSticker(id, { position: nextPosition })
      }
    }

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const startWidthResize = (id: string, event: React.PointerEvent) => {
    if (!interactive) return
    event.preventDefault()
    event.stopPropagation()
    const overlay = textOverlays.find((item) => item.id === id)
    if (!overlay) return
    const metrics = getContainerMetrics()
    if (!metrics) return
    const startX = event.clientX
    const startWidth = overlay.maxWidth

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const delta = ((moveEvent.clientX - startX) / metrics.width) * 100
      const nextWidth = clamp(startWidth + delta, 10, 100)
      updateTextOverlay(id, { maxWidth: nextWidth })
    }

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const startScaleSticker = (id: string, event: React.PointerEvent) => {
    if (!interactive) return
    event.preventDefault()
    event.stopPropagation()
    const sticker = stickers.find((item) => item.id === id)
    if (!sticker) return
    const metrics = getContainerMetrics()
    if (!metrics) return
    const center = {
      x: (sticker.position.x / 100) * metrics.width,
      y: (sticker.position.y / 100) * metrics.height,
    }
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return
    const startPointer = {
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
    }
    const startDistance = Math.hypot(startPointer.x - center.x, startPointer.y - center.y) || 1
    const startScale = sticker.scale

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const pointerX = moveEvent.clientX - rect.left
      const pointerY = moveEvent.clientY - rect.top
      const nextDistance = Math.hypot(pointerX - center.x, pointerY - center.y) || 1
      const ratio = nextDistance / startDistance
      const nextScale = clamp(startScale * ratio, 0.3, 3)
      updateSticker(id, { scale: parseFloat(nextScale.toFixed(2)) })
    }

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  if (textOverlays.length === 0 && stickers.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-20">
      {textOverlays
        .filter((overlay) => overlay.isVisible)
        .map((overlay) => {
          const isSelected = selectedOverlayId === overlay.id
          const textShadow = overlay.textShadow.enabled
            ? `${overlay.textShadow.offsetX}px ${overlay.textShadow.offsetY}px ${overlay.textShadow.blur}px ${overlay.textShadow.color}`
            : 'none'
          return (
            <div
              key={overlay.id}
              data-overlay-item="text"
              className={cn(
                'absolute select-none',
                'transition-shadow',
                isSelected ? 'drop-shadow-[0_5px_20px_rgba(0,0,0,0.25)]' : ''
              )}
              style={{
                left: `${overlay.position.x}%`,
                top: `${overlay.position.y}%`,
                transform: 'translate(-50%, -50%)',
                width: `${overlay.maxWidth}%`,
                maxWidth: `${overlay.maxWidth}%`,
                minWidth: overlay.orientation === 'horizontal' ? '40px' : undefined,
                opacity: overlay.opacity,
                writingMode: overlay.orientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
                textOrientation: overlay.orientation === 'vertical' ? 'mixed' : 'initial',
                wordBreak: 'break-word',
              }}
            >
              <div
                className={cn(
                  'pointer-events-auto cursor-move rounded-lg px-3 py-2 bg-transparent',
                  isSelected ? 'drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]' : 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                )}
                style={{
                  fontSize: `${overlay.fontSize}px`,
                  fontWeight: overlay.fontWeight,
                  fontFamily: getFontStack(overlay.fontFamily),
                  color: overlay.color,
                  textShadow,
                  backgroundColor: overlay.backgroundFill.enabled
                    ? applyAlphaToColor(overlay.backgroundFill.color, overlay.backgroundFill.opacity)
                    : 'transparent',
                }}
                onPointerDown={(event) => {
                  setSelectedOverlayId(overlay.id)
                  startDrag('text', overlay.id, event)
                }}
              >
                {overlay.text}
              </div>
              {isSelected && interactive && (
                <button
                  aria-label="Resize text overlay"
                  className="pointer-events-auto absolute -right-2 -bottom-2 h-4 w-4 rounded-full border border-primary bg-background text-primary cursor-se-resize"
                  onPointerDown={(event) => startWidthResize(overlay.id, event)}
                />
              )}
            </div>
          )
        })}

      {stickers
        .filter((sticker) => sticker.isVisible)
        .map((sticker) => {
          const isSelected = selectedStickerId === sticker.id
          return (
            <div
              key={sticker.id}
              data-overlay-item="sticker"
              className="absolute"
              style={{
                left: `${sticker.position.x}%`,
                top: `${sticker.position.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: sticker.opacity,
              }}
            >
              <div
                className={cn(
                  'relative pointer-events-auto cursor-move',
                  isSelected ? 'drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]' : 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                )}
                style={{
                  transform: `translateZ(0) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
                  transformOrigin: 'center',
                }}
                onPointerDown={(event) => {
                  setSelectedStickerId(sticker.id)
                  startDrag('sticker', sticker.id, event)
                }}
              >
                <img src={sticker.asset} alt={sticker.label} className="max-w-[160px] max-h-[140px] object-contain select-none" />
                {isSelected && interactive && (
                  <button
                    aria-label="Resize sticker"
                    className="pointer-events-auto absolute -right-3 -bottom-3 h-5 w-5 rounded-full border border-primary bg-background text-primary cursor-se-resize"
                    onPointerDown={(event) => startScaleSticker(sticker.id, event)}
                  />
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}

