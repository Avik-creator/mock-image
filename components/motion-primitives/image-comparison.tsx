'use client'

import { cn } from '@/lib/utils'
import {
  motion,
  type MotionValue,
  type SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { createContext, useContext, useState, type ReactNode, type MouseEvent, type TouchEvent } from 'react'

interface ImageComparisonContextValue {
  sliderPosition: number
  setSliderPosition: (value: number) => void
  motionSliderPosition: MotionValue<number>
}

const ImageComparisonContext = createContext<ImageComparisonContextValue | null>(null)

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  bounce: 0,
  duration: 0,
}

export type ImageComparisonProps = {
  children: ReactNode
  className?: string
  enableHover?: boolean
  springOptions?: SpringOptions
}

export function ImageComparison({
  children,
  className,
  enableHover = false,
  springOptions,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false)
  const motionValue = useMotionValue(50)
  const motionSliderPosition = useSpring(motionValue, springOptions ?? DEFAULT_SPRING_OPTIONS)
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleDrag = (event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    if (!isDragging && !enableHover) return

    const containerRect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const clientX =
      'touches' in event
        ? event.touches[0]?.clientX ?? containerRect.left
        : (event as MouseEvent).clientX
    const relativeX = clientX - containerRect.left
    const percentage = Math.min(Math.max((relativeX / containerRect.width) * 100, 0), 100)
    motionValue.set(percentage)
    setSliderPosition(percentage)
  }

  return (
    <ImageComparisonContext.Provider value={{ sliderPosition, setSliderPosition, motionSliderPosition }}>
      <div
        className={cn(
          'relative isolate select-none overflow-hidden rounded-2xl border border-border bg-card shadow-lg',
          enableHover && 'cursor-ew-resize',
          className
        )}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  )
}

interface ImageComparisonImageProps {
  className?: string
  alt: string
  src: string
  position: 'left' | 'right'
}

export function ImageComparisonImage({ className, alt, src, position }: ImageComparisonImageProps) {
  const context = useContext(ImageComparisonContext)
  if (!context) {
    throw new Error('ImageComparisonImage must be used within <ImageComparison>')
  }
  const { motionSliderPosition } = context

  const leftClipPath = useTransform(motionSliderPosition, (value) => `inset(0 ${100 - value}% 0 0)`)
  const rightClipPath = useTransform(motionSliderPosition, (value) => `inset(0 0 0 ${value}%)`)

  return (
    <motion.img
      src={src || '/placeholder.svg'}
      alt={alt}
      className={cn('absolute inset-0 h-full w-full object-cover', className)}
      style={{
        clipPath: position === 'left' ? leftClipPath : rightClipPath,
      }}
      draggable={false}
    />
  )
}

interface ImageComparisonSliderProps {
  className?: string
  children?: ReactNode
}

export function ImageComparisonSlider({ className, children }: ImageComparisonSliderProps) {
  const context = useContext(ImageComparisonContext)
  if (!context) {
    throw new Error('ImageComparisonSlider must be used within <ImageComparison>')
  }

  const { motionSliderPosition } = context
  const left = useTransform(motionSliderPosition, (value) => `${value}%`)

  return (
    <motion.div
      className={cn(
        'absolute inset-y-0 w-0.5 -translate-x-1/2 cursor-ew-resize rounded-full bg-white/70 dark:bg-white/50',
        className
      )}
      style={{ left }}
    >
      {children}
    </motion.div>
  )
}

