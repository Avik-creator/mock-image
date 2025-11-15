import { convertCssVarsToRgba, removeColorFix } from './color-utils'

export async function exportAsVideo(
  element: HTMLDivElement,
  animationLayers: any[],
  totalDuration: number,
  fps: number = 30,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const html2canvas = (await import('html2canvas-pro')).default
  
  convertCssVarsToRgba(element)
  
  try {
    // Create a canvas to render frames
    const tempCanvas = document.createElement('canvas')
    const ctx = tempCanvas.getContext('2d')
    if (!ctx) throw new Error('Could not get canvas context')

    // Get initial dimensions
    const initialCanvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      logging: false,
    })
    
    tempCanvas.width = initialCanvas.width
    tempCanvas.height = initialCanvas.height

    // Setup MediaRecorder with canvas stream
    const stream = tempCanvas.captureStream(fps)
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 5000000,
    })

    const chunks: Blob[] = []
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    mediaRecorder.start()

    const totalFrames = Math.floor(totalDuration * fps)
    
    for (let i = 0; i <= totalFrames; i++) {
      const progress = (i / totalFrames) * 100
      
      // Dispatch event to update animation progress in React
      window.dispatchEvent(new CustomEvent('animation-frame-progress', { detail: progress }))
      
      // Wait for React to re-render with the new animation state
      // Use requestAnimationFrame to ensure DOM updates are applied
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(resolve, 50) // Additional small delay to ensure rendering
          })
        })
      })
      
      const frameCanvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      })
      
      ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height)
      ctx.drawImage(frameCanvas, 0, 0)
      
      if (onProgress) {
        onProgress((i / totalFrames) * 100)
      }
      
      // Wait for the next frame timing
      if (i < totalFrames) {
        await new Promise(resolve => setTimeout(resolve, 1000 / fps))
      }
    }

    return new Promise<Blob>((resolve) => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        resolve(blob)
      }
      mediaRecorder.stop()
    })
  } catch (error) {
    console.error('[v0] Video export error:', error)
    throw error
  } finally {
    removeColorFix()
  }
}

export async function exportAsGif(
  element: HTMLDivElement,
  totalDuration: number,
  fps: number = 15,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const html2canvas = (await import('html2canvas-pro')).default
  
  convertCssVarsToRgba(element)
  
  try {
    const totalFrames = Math.floor(totalDuration * fps)
    const frames: HTMLCanvasElement[] = []

    for (let i = 0; i <= totalFrames; i++) {
      const progress = (i / totalFrames) * 100
      
      window.dispatchEvent(new CustomEvent('animation-frame-progress', { detail: progress }))
      await new Promise(resolve => setTimeout(resolve, 16))
      
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 1,
        logging: false,
      })
      
      frames.push(canvas)
      
      if (onProgress) {
        onProgress((i / totalFrames) * 100)
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000 / fps))
    }

    return new Promise<Blob>((resolve) => {
      frames[0]?.toBlob((blob) => {
        resolve(blob || new Blob())
      })
    })
  } finally {
    removeColorFix()
  }
}
