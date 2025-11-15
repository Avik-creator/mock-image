import { convertCssVarsToRgba, removeColorFix } from './color-utils'

// Helper function to wait for next frame with precise timing
function waitForNextFrame(): Promise<void> {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve)
    })
  })
}

// Helper function to wait for a specific duration
function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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
    // Get initial dimensions
    const initialCanvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      logging: false,
    })
    
    const width = initialCanvas.width
    const height = initialCanvas.height

    // Create a canvas to render frames
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = width
    tempCanvas.height = height
    const ctx = tempCanvas.getContext('2d', { 
      alpha: false,
      desynchronized: true 
    })
    if (!ctx) throw new Error('Could not get canvas context')

    // Collect all frames first for smoother playback
    const frames: ImageData[] = []
    const totalFrames = Math.floor(totalDuration * fps)
    const frameInterval = 1000 / fps // milliseconds per frame
    
    console.log(`Starting video export: ${totalFrames} frames at ${fps} fps`)
    
    for (let i = 0; i <= totalFrames; i++) {
      const progress = (i / totalFrames) * 100
      
      // Update animation progress
      window.dispatchEvent(new CustomEvent('animation-frame-progress', { 
        detail: progress 
      }))
      
      // Wait for React to re-render - use multiple RAF calls for smooth updates
      await waitForNextFrame()
      await waitForNextFrame()
      await wait(10) // Small additional delay to ensure CSS transitions complete
      
      // Capture the frame
      const frameCanvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
      })
      
      // Get image data from the captured frame
      const frameCtx = frameCanvas.getContext('2d')
      if (frameCtx) {
        const imageData = frameCtx.getImageData(0, 0, width, height)
        frames.push(imageData)
      }
      
      if (onProgress) {
        onProgress(progress)
      }
      
      // Wait for next frame timing (except for last frame)
      if (i < totalFrames) {
        await wait(frameInterval)
      }
    }

    console.log(`Captured ${frames.length} frames, starting encoding...`)

    // Setup MediaRecorder with canvas stream
    const stream = tempCanvas.captureStream(fps)
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 8000000, // Higher bitrate for better quality
    })

    const chunks: Blob[] = []
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    return new Promise<Blob>((resolve, reject) => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        console.log(`Video export complete: ${blob.size} bytes`)
        resolve(blob)
      }

      mediaRecorder.onerror = (e) => {
        console.error('MediaRecorder error:', e)
        reject(new Error('MediaRecorder error'))
      }

      mediaRecorder.start()

      // Play back frames at the correct frame rate
      let frameIndex = 0
      const startTime = performance.now()

      const renderFrame = () => {
        if (frameIndex >= frames.length) {
          mediaRecorder.stop()
          return
        }

        const expectedTime = startTime + (frameIndex * frameInterval)
        const currentTime = performance.now()
        const delay = Math.max(0, expectedTime - currentTime)

        setTimeout(() => {
          // Draw frame to canvas
          ctx.putImageData(frames[frameIndex], 0, 0)
          
          frameIndex++
          
          if (frameIndex < frames.length) {
            renderFrame()
          } else {
            // Wait a bit before stopping to ensure last frame is recorded
            setTimeout(() => {
              mediaRecorder.stop()
            }, frameInterval)
          }
        }, delay)
      }

      // Start rendering frames
      renderFrame()
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
