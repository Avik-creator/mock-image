'use client'

import { forwardRef, useRef, useEffect } from 'react'
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

    useEffect(() => {
      const handleFrameProgress = (e: CustomEvent) => {
        // This allows video export to control animation progress
      }
      
      window.addEventListener('animation-frame-progress', handleFrameProgress as EventListener)
      
      return () => {
        window.removeEventListener('animation-frame-progress', handleFrameProgress as EventListener)
      }
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          onImageUpload(event.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }

    const handleUploadClick = () => {
      fileInputRef.current?.click()
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
            <div className="text-center">
              <div
                className={`bg-white/80 backdrop-blur-sm border-2 border-dashed border-zinc-300 hover:border-zinc-400 transition-all p-16 cursor-pointer ${
                  rounded ? 'rounded-3xl' : ''
                }`}
                onClick={handleUploadClick}
              >
                <Upload className="h-16 w-16 mx-auto mb-4 text-zinc-400" />
                <p className="text-lg font-semibold mb-2 text-zinc-900">Upload an image</p>
                <p className="text-sm text-zinc-500 mb-6">
                  Click to browse or drag and drop
                </p>
                <Button 
                  onClick={handleUploadClick}
                  className="bg-zinc-900 hover:bg-zinc-800"
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
