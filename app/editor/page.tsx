'use client'

import { useState, useRef, useEffect } from 'react'
import { PreviewWindow } from '@/components/preview-window'
import { ImagePreview } from '@/components/image-preview'
import { ControlPanel } from '@/components/control-panel'
import { AnimationTimeline } from '@/components/animation-timeline'
import { Button } from '@/components/ui/button'
import { Download, Copy, Code, Image, Video, ImagePlay, ArrowLeft, Globe, GripVertical } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { AnimationLayer, AnimationType } from '@/types/animation'
import { exportAsVideo, exportAsGif } from '@/lib/video-export'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const defaultCode = `.container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}`

export default function EditorPage() {
  const [playground, setPlayground] = useState<'code' | 'image' | 'url'>('code')
  const [code, setCode] = useState(defaultCode)
  const [language, setLanguage] = useState('css')
  const [theme, setTheme] = useState('monokai')
  const [background, setBackground] = useState('linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)')
  const [padding, setPadding] = useState(64)
  const [rounded, setRounded] = useState(true)
  const [showLineNumbers, setShowLineNumbers] = useState(false)
  const [showWindowControls, setShowWindowControls] = useState(true)
  const [windowTitle, setWindowTitle] = useState('')
  const [insertedImage, setInsertedImage] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [animationLayers, setAnimationLayers] = useState<AnimationLayer[]>([])
  const [totalDuration, setTotalDuration] = useState(3)
  const [url, setUrl] = useState('')
  const [urlImage, setUrlImage] = useState<string | null>(null)
  const [isLoadingUrl, setIsLoadingUrl] = useState(false)
  const [urlDarkMode, setUrlDarkMode] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [isExportingVideo, setIsExportingVideo] = useState(false)
  const [videoExportProgress, setVideoExportProgress] = useState(0)
  const [isExportingGif, setIsExportingGif] = useState(false)
  const [gifExportProgress, setGifExportProgress] = useState(0)

  // Listen for animation frame progress events during video export
  useEffect(() => {
    let rafId: number | null = null
    let pendingProgress: number | null = null

    const handleAnimationFrameProgress = (e: Event) => {
      const customEvent = e as CustomEvent<number>
      if (customEvent.detail !== undefined) {
        pendingProgress = customEvent.detail

        // Use requestAnimationFrame for smooth updates
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            if (pendingProgress !== null) {
              setAnimationProgress(pendingProgress)
              pendingProgress = null
            }
            rafId = null
          })
        }
      }
    }

    window.addEventListener('animation-frame-progress', handleAnimationFrameProgress as EventListener)

    return () => {
      window.removeEventListener('animation-frame-progress', handleAnimationFrameProgress as EventListener)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number | null = null
    let startTime: number = 0

    if (!isAnimating) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
      return
    }

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const duration = totalDuration * 1000
      const progress = Math.min((elapsed / duration) * 100, 100)

      setAnimationProgress(progress)

      if (progress < 100) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        animationFrameId = null
        startTime = 0
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isAnimating, totalDuration])

  const handlePlayPause = () => {
    if (!uploadedImage && !urlImage) return
    setIsAnimating(!isAnimating)
  }

  const handleReset = () => {
    setAnimationProgress(0)
    setIsAnimating(false)
  }

  const handleProgressChange = (value: number) => {
    setAnimationProgress(value)
    setIsAnimating(false)
  }

  const handleAddAnimation = (type: AnimationType) => {
    const newLayer: AnimationLayer = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      startTime: 0,
      duration: 30,
      easing: 'easeOut',
      intensity: 100,
    }
    setAnimationLayers([...animationLayers, newLayer])
    if (!isAnimating) {
      setIsAnimating(true)
    }
  }

  const handleCaptureUrl = async () => {
    if (!url.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid URL',
        variant: 'destructive',
      })
      return
    }

    // Validate URL format
    let validUrl = url.trim()
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = `https://${validUrl}`
    }

    setIsLoadingUrl(true)
    try {
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: validUrl, darkMode: urlDarkMode }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.error || `Failed to capture screenshot: ${response.statusText}`
        )
      }

      const blob = await response.blob()

      if (!blob || blob.size === 0) {
        throw new Error('Received empty screenshot')
      }

      const imageUrl = URL.createObjectURL(blob)
      setUrlImage(imageUrl)
      setUploadedImage(imageUrl)
      toast({
        title: 'Success',
        description: 'Screenshot captured successfully!',
      })
    } catch (error) {
      console.error('URL capture error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error
          ? error.message
          : 'Failed to capture screenshot. Please ensure the URL is accessible and try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoadingUrl(false)
    }
  }

  const handleExportVideo = async () => {
    if (!previewRef.current || (!uploadedImage && !urlImage) || animationLayers.length === 0) {
      toast({
        title: 'No animation',
        description: 'Add animations to export as video',
        variant: 'destructive',
      })
      return
    }

    const previousProgress = animationProgress
    const wasAnimating = isAnimating

    setIsAnimating(false)
    setIsExportingVideo(true)
    setVideoExportProgress(0)
    setAnimationProgress(0) // Reset animation progress at start

    try {
      const videoBlob = await exportAsVideo(
        previewRef.current,
        animationLayers,
        totalDuration,
        30,
        (progress) => setVideoExportProgress(progress)
      )

      const url = URL.createObjectURL(videoBlob)
      const link = document.createElement('a')
      link.download = `snipp-animation-${Date.now()}.webm`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)

      toast({
        title: 'Success',
        description: 'Video exported successfully!',
      })
    } catch (error) {
      console.error('[v0] Video export error:', error)
      toast({
        title: 'Error',
        description: 'Failed to export video. Try exporting as image instead.',
        variant: 'destructive',
      })
    } finally {
      setIsExportingVideo(false)
      setVideoExportProgress(0)
      setAnimationProgress(previousProgress) // Restore previous progress so the preview stays visible
      setIsAnimating(wasAnimating)
    }
  }

  const handleExportGif = async () => {
    if (!previewRef.current || (!uploadedImage && !urlImage) || animationLayers.length === 0) {
      toast({
        title: 'No animation',
        description: 'Add animations to export as GIF',
        variant: 'destructive',
      })
      return
    }

    const previousProgress = animationProgress
    const wasAnimating = isAnimating

    setIsAnimating(false)
    setIsExportingGif(true)
    setGifExportProgress(0)
    setAnimationProgress(0)

    try {
      const gifBlob = await exportAsGif(previewRef.current, totalDuration, 15, (progress) =>
        setGifExportProgress(progress)
      )

      const url = URL.createObjectURL(gifBlob)
      const link = document.createElement('a')
      link.download = `snipp-animation-${Date.now()}.gif`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)

      toast({
        title: 'Success',
        description: 'GIF exported successfully!',
      })
    } catch (error) {
      console.error('[v0] GIF export error:', error)
      toast({
        title: 'Error',
        description: 'Failed to export GIF. Try exporting as video instead.',
        variant: 'destructive',
      })
    } finally {
      setIsExportingGif(false)
      setGifExportProgress(0)
      setAnimationProgress(previousProgress)
      setIsAnimating(wasAnimating)
    }
  }

  const handleExportImage = async () => {
    if (!previewRef.current) return

    try {
      const html2canvas = (await import('html2canvas-pro')).default
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
      })

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = `snipp-${playground}-${Date.now()}.png`
          link.href = url
          link.click()
          URL.revokeObjectURL(url)
          toast({
            title: 'Success',
            description: 'Image downloaded successfully!',
          })
        }
      })
    } catch (error) {
      console.error('[v0] Image export error:', error)
      toast({
        title: 'Error',
        description: 'Failed to export image',
        variant: 'destructive',
      })
    }
  }

  const handleCopyImage = async () => {
    if (!previewRef.current) {
      toast({
        title: 'Error',
        description: 'No preview available to copy',
        variant: 'destructive',
      })
      return
    }

    try {
      const html2canvas = (await import('html2canvas-pro')).default
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: false,
      })

      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast({
            title: 'Error',
            description: 'Failed to generate image',
            variant: 'destructive',
          })
          return
        }

        // Check for Safari and modern clipboard API
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        const hasClipboardAPI = navigator.clipboard && window.ClipboardItem

        if (hasClipboardAPI) {
          try {
            // Request clipboard permission explicitly for Safari
            if (isSafari && navigator.permissions) {
              try {
                const permission = await navigator.permissions.query({ name: 'clipboard-write' as PermissionName })
                if (permission.state === 'denied') {
                  throw new Error('Clipboard permission denied')
                }
              } catch (permError) {
                // Permission query might not be supported, continue anyway
                console.log('Permission query not available, attempting clipboard write')
              }
            }

            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ])
            toast({
              title: 'Success',
              description: 'Image copied to clipboard!',
            })
          } catch (clipboardError: any) {
            console.error('Clipboard write error:', clipboardError)

            // Fallback for Safari or permission issues
            if (isSafari || clipboardError.name === 'NotAllowedError' || clipboardError.name === 'SecurityError') {
              // Fallback: Create a temporary download link
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = `snippet-${Date.now()}.png`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(url)

              toast({
                title: 'Info',
                description: 'Clipboard access denied. Image downloaded instead. Please enable clipboard permissions in Safari settings.',
              })
            } else {
              toast({
                title: 'Error',
                description: 'Failed to copy to clipboard. Please try again.',
                variant: 'destructive',
              })
            }
          }
        } else {
          // Fallback for browsers without ClipboardItem support
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `snippet-${Date.now()}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          toast({
            title: 'Info',
            description: 'Clipboard API not supported. Image downloaded instead.',
          })
        }
      }, 'image/png')
    } catch (error) {
      console.error('Copy image error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to copy image',
        variant: 'destructive',
      })
    }
  }

  const currentImage = playground === 'url' ? urlImage : uploadedImage

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold flex-shrink-0">
            <span className="text-lg">{'</>'}</span>
            <span>Snippet</span>
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            {playground !== 'code' && currentImage && animationLayers.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportGif}
                  disabled={isExportingGif}
                  className="gap-2"
                >
                  <ImagePlay className="h-4 w-4" />
                  {isExportingGif ? `Exporting GIF... ${Math.round(gifExportProgress)}%` : 'Export GIF'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportVideo}
                  disabled={isExportingVideo}
                  className="gap-2"
                >
                  <Video className="h-4 w-4" />
                  {isExportingVideo ? `Exporting... ${Math.round(videoExportProgress)}%` : 'Export Video'}
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyImage}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleExportImage}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-72 border-r bg-background flex flex-col">
          {/* Header in Sidebar */}
          <div className="p-4 border-b">
            <div className="mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Playground Toggle */}
            <div className="inline-flex items-center gap-1 bg-muted p-1 rounded-lg w-full">
              <button
                onClick={() => setPlayground('code')}
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${playground === 'code'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Code className="h-3.5 w-3.5" />
                Code
              </button>
              <button
                onClick={() => setPlayground('image')}
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${playground === 'image'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Image className="h-3.5 w-3.5" />
                Image
              </button>
              <button
                onClick={() => setPlayground('url')}
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${playground === 'url'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Globe className="h-3.5 w-3.5" />
                URL
              </button>
            </div>
          </div>

          {/* URL Input for URL mode */}
          {playground === 'url' && (
            <div className="p-4 border-b space-y-3">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCaptureUrl()
                  }
                }}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <Label htmlFor="url-dark-mode" className="text-sm font-medium cursor-pointer">
                  Dark Mode
                </Label>
                <Switch
                  id="url-dark-mode"
                  checked={urlDarkMode}
                  onCheckedChange={setUrlDarkMode}
                />
              </div>
              <Button
                onClick={handleCaptureUrl}
                disabled={isLoadingUrl || !url.trim()}
                className="w-full"
                size="sm"
              >
                {isLoadingUrl ? 'Capturing...' : 'Capture Screenshot'}
              </Button>
            </div>
          )}

          {/* Control Panel */}
          <div className="flex-1 overflow-y-auto p-4">
            <ControlPanel
              playground={playground === 'url' ? 'image' : playground}
              language={language}
              theme={theme}
              background={background}
              padding={padding}
              rounded={rounded}
              showLineNumbers={showLineNumbers}
              showWindowControls={showWindowControls}
              windowTitle={windowTitle}
              insertedImage={insertedImage}
              onLanguageChange={setLanguage}
              onThemeChange={setTheme}
              onBackgroundChange={setBackground}
              onPaddingChange={setPadding}
              onRoundedChange={setRounded}
              onLineNumbersChange={setShowLineNumbers}
              onWindowControlsChange={setShowWindowControls}
              onWindowTitleChange={setWindowTitle}
              onImageInsert={playground === 'code' ? setInsertedImage : undefined}
            />
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto relative">
            {/* Padding Handles Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Left Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-8 h-16 rounded-r-lg bg-background/80 backdrop-blur-sm border-r-2 border-primary shadow-lg flex items-center justify-center cursor-ew-resize pointer-events-auto hover:bg-background/90 transition-all group"
                style={{ left: `${padding}px`, transform: 'translate(-50%, -50%)' }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  const startX = e.clientX
                  const startPadding = padding

                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const deltaX = moveEvent.clientX - startX
                    const newPadding = Math.max(16, Math.min(128, startPadding + deltaX))
                    setPadding(newPadding)
                  }

                  const handleMouseUp = () => {
                    window.removeEventListener('mousemove', handleMouseMove)
                    window.removeEventListener('mouseup', handleMouseUp)
                  }

                  window.addEventListener('mousemove', handleMouseMove)
                  window.addEventListener('mouseup', handleMouseUp)
                }}
              >
                <GripVertical className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </div>

              {/* Right Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-16 rounded-l-lg bg-background/80 backdrop-blur-sm border-l-2 border-primary shadow-lg flex items-center justify-center cursor-ew-resize pointer-events-auto hover:bg-background/90 transition-all group"
                style={{ right: `${padding}px`, transform: 'translate(50%, -50%)' }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  const startX = e.clientX
                  const startPadding = padding

                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const deltaX = startX - moveEvent.clientX
                    const newPadding = Math.max(16, Math.min(128, startPadding + deltaX))
                    setPadding(newPadding)
                  }

                  const handleMouseUp = () => {
                    window.removeEventListener('mousemove', handleMouseMove)
                    window.removeEventListener('mouseup', handleMouseUp)
                  }

                  window.addEventListener('mousemove', handleMouseMove)
                  window.addEventListener('mouseup', handleMouseUp)
                }}
              >
                <GripVertical className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {playground === 'url' || playground === 'image' ? (
              <ImagePreview
                ref={previewRef}
                uploadedImage={currentImage}
                background={background}
                padding={padding}
                animationLayers={animationLayers}
                animationProgress={animationProgress}
                totalDuration={totalDuration}
                onImageUpload={setUploadedImage}
              />
            ) : (
              <PreviewWindow
                ref={previewRef}
                code={code}
                language={language}
                theme={theme}
                background={background}
                padding={padding}
                rounded={rounded}
                showLineNumbers={showLineNumbers}
                showWindowControls={showWindowControls}
                windowTitle={windowTitle}
                insertedImage={insertedImage}
                onChange={setCode}
                onImageInsert={setInsertedImage}
              />
            )}
          </div>

          {/* Animation Timeline at Bottom */}
          {(playground === 'image' || playground === 'url') && currentImage && (
            <div className="border-t bg-background">
              <AnimationTimeline
                layers={animationLayers}
                onLayersChange={setAnimationLayers}
                totalDuration={totalDuration}
                onTotalDurationChange={setTotalDuration}
                isPlaying={isAnimating}
                onPlayPause={handlePlayPause}
                onReset={handleReset}
                currentProgress={animationProgress}
                onProgressChange={handleProgressChange}
              />
            </div>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  )
}

