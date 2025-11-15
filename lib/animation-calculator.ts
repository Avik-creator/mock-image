import { AnimationLayer, EasingType } from '@/types/animation'

// Easing functions
const easingFunctions: Record<EasingType, (t: number) => number> = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
}

export function calculateAnimationStyles(
  layers: AnimationLayer[],
  progress: number, // 0-100
  totalDuration: number
): React.CSSProperties {
  let opacity = 1
  let translateX = 0
  let translateY = 0
  let translateZ = 0
  let scale = 1
  let rotate = 0
  let rotateX = 0
  let rotateY = 0
  let rotateZ = 0
  let perspectiveValue = 1000

  layers.forEach(layer => {
    const layerStart = layer.startTime
    const layerEnd = layer.startTime + layer.duration

    // Check if current progress is within this layer's timeline
    if (progress >= layerStart && progress <= layerEnd) {
      // Calculate progress within this layer (0-1)
      const layerProgress = (progress - layerStart) / layer.duration
      const easedProgress = easingFunctions[layer.easing](layerProgress)
      const intensity = layer.intensity / 100

      // Apply animation based on type
      switch (layer.type) {
        case 'fadeIn':
          opacity *= easedProgress * intensity + (1 - intensity)
          break
        case 'fadeOut':
          opacity *= (1 - easedProgress) * intensity + (1 - intensity)
          break
        case 'slideUp':
          translateY -= (1 - easedProgress) * 100 * intensity
          break
        case 'slideDown':
          translateY += (1 - easedProgress) * 100 * intensity
          break
        case 'slideLeft':
          translateX -= (1 - easedProgress) * 100 * intensity
          break
        case 'slideRight':
          translateX += (1 - easedProgress) * 100 * intensity
          break
        case 'scaleUp':
          scale *= easedProgress * intensity + (1 - intensity)
          break
        case 'scaleDown':
          scale *= (1 - easedProgress) * intensity + (1 - intensity)
          break
        case 'rotate':
          rotate += easedProgress * 360 * intensity
          break
        case 'bounce':
          const bounceProgress = Math.sin(easedProgress * Math.PI)
          translateY -= bounceProgress * 50 * intensity
          break
        case 'flip':
          rotate += easedProgress * 180 * intensity
          break
        case 'zoom':
          const zoomProgress = Math.sin(easedProgress * Math.PI)
          scale *= 1 + zoomProgress * 0.5 * intensity
          break
        case 'rotate3DX':
          rotateX += easedProgress * 360 * intensity
          break
        case 'rotate3DY':
          rotateY += easedProgress * 360 * intensity
          break
        case 'rotate3DZ':
          rotateZ += easedProgress * 360 * intensity
          break
        case 'perspective':
          translateZ += easedProgress * 200 * intensity
          perspectiveValue = 1000 - (easedProgress * 500 * intensity)
          break
        case 'flipX':
          rotateY += easedProgress * 180 * intensity
          break
        case 'flipY':
          rotateX += easedProgress * 180 * intensity
          break
      }
    } else if (progress < layerStart) {
      // Before animation starts - apply initial state
      switch (layer.type) {
        case 'fadeIn':
          opacity *= 1 - layer.intensity / 100
          break
        case 'fadeOut':
          opacity *= 1
          break
        case 'slideUp':
        case 'slideDown':
        case 'slideLeft':
        case 'slideRight':
          if (layer.type === 'slideUp') translateY -= 100 * (layer.intensity / 100)
          if (layer.type === 'slideDown') translateY += 100 * (layer.intensity / 100)
          if (layer.type === 'slideLeft') translateX -= 100 * (layer.intensity / 100)
          if (layer.type === 'slideRight') translateX += 100 * (layer.intensity / 100)
          break
        case 'scaleUp':
          scale *= 1 - layer.intensity / 100
          break
        case 'scaleDown':
          scale *= 1
          break
      }
    }
  })

  return {
    opacity,
    perspective: `${perspectiveValue}px`,
    transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotate + rotateZ}deg)`,
    transformStyle: 'preserve-3d',
  }
}
