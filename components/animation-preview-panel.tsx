'use client'

import { Card } from '@/components/ui/card'
import { AnimationType, animationPresets } from '@/types/animation'
import { useState } from 'react'

interface AnimationPreviewPanelProps {
  onSelectAnimation: (type: AnimationType) => void
  enableAnimation: boolean
  onToggleAnimation: (enabled: boolean) => void
}

const animationCategories = {
  'Fade': ['fadeIn', 'fadeOut'] as AnimationType[],
  'Slide': ['slideUp', 'slideDown', 'slideLeft', 'slideRight'] as AnimationType[],
  'Scale': ['scaleUp', 'scaleDown', 'zoom'] as AnimationType[],
  'Rotate': ['rotate', 'rotate3DX', 'rotate3DY', 'rotate3DZ'] as AnimationType[],
  'Flip': ['flip', 'flipX', 'flipY'] as AnimationType[],
  'Special': ['bounce', 'perspective'] as AnimationType[],
}

export function AnimationPreviewPanel({ onSelectAnimation, enableAnimation, onToggleAnimation }: AnimationPreviewPanelProps) {
  const [hoveredAnimation, setHoveredAnimation] = useState<AnimationType | null>(null)

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border shadow-sm p-4">
        <h3 className="text-sm font-semibold mb-3 text-center">ANIMATION PREVIEWS</h3>
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {Object.entries(animationCategories).map(([category, animations]) => (
            <div key={category}>
              <h4 className="text-xs font-medium text-zinc-500 mb-2">{category}</h4>
              <div className="grid grid-cols-2 gap-2">
                {animations.map((type) => (
                  <Card
                    key={type}
                    className="relative overflow-hidden cursor-pointer hover:border-zinc-400 transition-all h-24"
                    onClick={() => onSelectAnimation(type)}
                    onMouseEnter={() => setHoveredAnimation(type)}
                    onMouseLeave={() => setHoveredAnimation(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                      <div
                        className={`w-12 h-12 bg-red-500 rounded transition-all duration-1000 ${
                          hoveredAnimation === type ? getAnimationClass(type) : ''
                        }`}
                      />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm p-1.5">
                      <p className="text-[10px] font-medium text-center truncate">
                        {animationPresets[type].label}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getAnimationClass(type: AnimationType): string {
  const animations: Record<AnimationType, string> = {
    fadeIn: 'opacity-0',
    fadeOut: 'opacity-100',
    slideUp: 'translate-y-8',
    slideDown: '-translate-y-8',
    slideLeft: 'translate-x-8',
    slideRight: '-translate-x-8',
    scaleUp: 'scale-150',
    scaleDown: 'scale-50',
    rotate: 'rotate-180',
    bounce: 'animate-bounce',
    flip: 'rotate-y-180',
    zoom: 'scale-125',
    rotate3DX: 'rotate-x-45',
    rotate3DY: 'rotate-y-45',
    rotate3DZ: 'rotate-[45deg]',
    perspective: 'perspective-1000',
    flipX: 'scale-x-[-1]',
    flipY: 'scale-y-[-1]',
  }
  return animations[type] || ''
}
