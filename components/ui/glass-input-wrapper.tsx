'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassInputWrapperProps {
  children: ReactNode
  className?: string
}

export function GlassInputWrapper({ children, className }: GlassInputWrapperProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border/60 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30 p-2',
        className
      )}
    >
      {children}
    </div>
  )
}

