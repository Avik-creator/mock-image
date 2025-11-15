'use client'

import { forwardRef, useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { AnimationLayer } from '@/types/animation'
import { calculateAnimationStyles } from '@/lib/animation-calculator'

interface ImagePreviewProps {
  uploadedImage: string | null
  background: string
  padding: number
  rounded: boolean
  animationProgress: number
  animationLayers: AnimationLayer[]
  totalDuration: number
  onImageUpload: (image: string | null) => void
}

export const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(
  function ImagePreview(
    {
      uploadedImage,
      background,
      padding,
      rounded,
      animationProgress,
      animationLayers,
      totalDuration,
      onImageUpload,
    },
    ref
  ) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
      const handleFrameProgress = (e: CustomEvent) => {
        // This allows video export to control animation progress
      }
      
      window.addEventListener('animation-frame-progress', handleFrameProgress as EventListener)
      
      return () => {
        window.removeEventListener('animation-frame-progress', handleFrameProgress as EventListener)
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current)
        }
      }
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          if (result) {
            onImageUpload(result)
          }
        }
        reader.onerror = () => {
          console.error('Error reading file')
        }
        reader.readAsDataURL(file)
        // Reset input so the same file can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }

    const handleUploadClick = (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      
      // Prevent double-clicks
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
      
      clickTimeoutRef.current = setTimeout(() => {
        fileInputRef.current?.click()
        clickTimeoutRef.current = null
      }, 0)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          if (result) {
            onImageUpload(result)
          }
        }
        reader.onerror = () => {
          console.error('Error reading file')
        }
        reader.readAsDataURL(file)
      } else {
        console.warn('Please drop an image file')
      }
    }

    const animationStyles = uploadedImage && animationLayers.length > 0
      ? calculateAnimationStyles(animationLayers, animationProgress, totalDuration)
      : {}

    // Determine background style
    const getBackgroundStyle = () => {
      if (background.startsWith('/')) {
        // Image background
        return {
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      } else if (background.startsWith('linear-gradient') || background.startsWith('radial-gradient')) {
        // Gradient background
        return { backgroundImage: background }
      } else {
        // Solid color background
        return { backgroundColor: background }
      }
    }

    return (
      <div className="w-full">
        <div
          ref={ref}
          style={{
            ...getBackgroundStyle(),
            padding: `${padding}px`,
          }}
          className={`flex ${uploadedImage ? 'items-start justify-center' : 'items-center justify-center'} min-h-[600px] rounded-xl`}
        >
          {!uploadedImage ? (
            <div className="text-center w-full">
              <div
                className={`bg-white/80 backdrop-blur-sm border-2 border-dashed transition-all p-16 cursor-pointer ${
                  isDragging 
                    ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/10' 
                    : 'border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600'
                } ${
                  rounded ? 'rounded-3xl' : ''
                }`}
                onClick={(e) => {
                  // Only trigger if clicking directly on the div, not on the button or its children
                  const target = e.target as HTMLElement
                  const isButton = target.closest('button') || target.tagName === 'BUTTON'
                  if (!isButton) {
                    handleUploadClick(e)
                  }
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className={`h-16 w-16 mx-auto mb-4 ${isDragging ? 'text-purple-500' : 'text-zinc-400'}`} />
                <p className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                  {isDragging ? 'Drop image here' : 'Upload an image'}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  Click to browse or drag and drop
                </p>
                <Button 
                  onClick={handleUploadClick}
                >
                  Choose File
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div
              style={animationStyles}
              className={`bg-white shadow-2xl overflow-hidden ${rounded ? 'rounded-2xl' : ''} w-full max-w-6xl`}
            >
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded preview"
                className="w-full h-auto object-contain block"
                style={{ display: 'block' }}
              />
            </div>
          )}
        </div>

        {uploadedImage && (
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Change Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>
    )
  }
)
