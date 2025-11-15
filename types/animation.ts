export type AnimationType = 
  | 'fadeIn' 
  | 'fadeOut' 
  | 'slideUp' 
  | 'slideDown' 
  | 'slideLeft' 
  | 'slideRight'
  | 'scaleUp'
  | 'scaleDown'
  | 'rotate'
  | 'bounce'
  | 'flip'
  | 'zoom'
  | 'rotate3DX'
  | 'rotate3DY'
  | 'rotate3DZ'
  | 'perspective'
  | 'flipX'
  | 'flipY'

export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'

export interface AnimationLayer {
  id: string
  type: AnimationType
  startTime: number // 0-100 (percentage of total timeline)
  duration: number // 0-100 (percentage of total timeline)
  easing: EasingType
  intensity: number // 0-100 (controls strength of effect)
}

export const animationPresets: Record<AnimationType, { label: string; icon: string }> = {
  fadeIn: { label: 'Fade In', icon: '○' },
  fadeOut: { label: 'Fade Out', icon: '●' },
  slideUp: { label: 'Slide Up', icon: '↑' },
  slideDown: { label: 'Slide Down', icon: '↓' },
  slideLeft: { label: 'Slide Left', icon: '←' },
  slideRight: { label: 'Slide Right', icon: '→' },
  scaleUp: { label: 'Scale Up', icon: '+' },
  scaleDown: { label: 'Scale Down', icon: '-' },
  rotate: { label: 'Rotate', icon: '↻' },
  bounce: { label: 'Bounce', icon: '⇅' },
  flip: { label: 'Flip', icon: '⇄' },
  zoom: { label: 'Zoom', icon: '⊕' },
  rotate3DX: { label: 'Rotate 3D X', icon: '⟲' },
  rotate3DY: { label: 'Rotate 3D Y', icon: '⟳' },
  rotate3DZ: { label: 'Rotate 3D Z', icon: '⊚' },
  perspective: { label: 'Perspective', icon: '◰' },
  flipX: { label: 'Flip X', icon: '⇆' },
  flipY: { label: 'Flip Y', icon: '⇵' },
}
