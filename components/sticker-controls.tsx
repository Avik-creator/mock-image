'use client'

import { useMemo, useRef } from 'react'
import { Eye, EyeOff, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { stickerLibrary } from '@/lib/constants/stickers'
import { useImageStore } from '@/lib/store'

export const StickerControls = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    stickers,
    addSticker,
    updateSticker,
    removeSticker,
    clearStickers,
    selectedStickerId,
    setSelectedStickerId,
  } = useImageStore()

  const selectedSticker = useMemo(
    () => stickers.find((sticker) => sticker.id === selectedStickerId) ?? null,
    [selectedStickerId, stickers]
  )

  const handleAddSticker = (assetId: string) => {
    const asset = stickerLibrary.find((item) => item.id === assetId)
    if (!asset) return
    addSticker({
      asset: asset.src,
      label: asset.name,
      position: { x: 50, y: 50 },
      scale: 1,
      rotation: 0,
      opacity: 1,
      isVisible: true,
      type: 'library',
    })
  }

  const handleUploadSticker = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = (readEvent) => {
      const result = readEvent.target?.result as string | null
      if (!result) return
      addSticker({
        asset: result,
        label: file.name || 'Custom sticker',
        position: { x: 50, y: 50 },
        scale: 1,
        rotation: 0,
        opacity: 1,
        isVisible: true,
        type: 'custom',
      })
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleToggleVisibility = (id: string) => {
    const sticker = stickers.find((item) => item.id === id)
    if (!sticker) return
    updateSticker(id, { isVisible: !sticker.isVisible })
  }

  return (
    <div className="space-y-5" data-overlay-controls="true">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-foreground">Stickers</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={clearStickers}
          disabled={stickers.length === 0}
          className="h-8 px-3 text-xs font-medium rounded-lg"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Sticker Library</p>
        <div className="grid grid-cols-2 gap-2">
          {stickerLibrary.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => handleAddSticker(sticker.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-primary transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="w-full aspect-video rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
                <img src={sticker.src} alt={sticker.name} className="w-16 h-16 object-contain" />
              </div>
              <span className="text-xs font-medium text-foreground">{sticker.name}</span>
            </button>
          ))}
        </div>
        <div className="pt-3 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload custom sticker
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            Transparent PNG/SVG works best. Sticker attaches to preview immediately.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUploadSticker}
            className="hidden"
          />
        </div>
      </div>

      {stickers.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">Manage Stickers</p>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
            {stickers.map((sticker) => (
              <div
                key={sticker.id}
                className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-colors ${
                  selectedStickerId === sticker.id
                    ? 'bg-accent border-primary'
                    : 'bg-background hover:bg-accent border-border'
                }`}
                onClick={() => setSelectedStickerId(sticker.id)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleVisibility(sticker.id)
                  }}
                  className="h-6 w-6 p-0"
                >
                  {sticker.isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
                <span className="flex-1 text-xs truncate">{sticker.label}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSticker(sticker.id)
                  }}
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSticker && (
        <div className="space-y-4 border-t pt-5">
          <p className="text-sm font-semibold text-foreground">{`Edit: ${selectedSticker.label}`}</p>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Scale</span>
            <div className="flex-1 flex items-center gap-3">
              <Slider
                value={[selectedSticker.scale]}
                onValueChange={(value) => updateSticker(selectedSticker.id, { scale: value[0] })}
                max={3}
                min={0.3}
                step={0.01}
              />
              <span className="text-sm text-foreground font-medium whitespace-nowrap">
                {(selectedSticker.scale * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Rotation</span>
            <div className="flex-1 flex items-center gap-3">
              <Slider
                value={[selectedSticker.rotation]}
                onValueChange={(value) => updateSticker(selectedSticker.id, { rotation: value[0] })}
                max={180}
                min={-180}
                step={1}
              />
              <span className="text-sm text-foreground font-medium whitespace-nowrap">
                {Math.round(selectedSticker.rotation)}°
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Opacity</span>
            <div className="flex-1 flex items-center gap-3">
              <Slider
                value={[selectedSticker.opacity]}
                onValueChange={(value) => updateSticker(selectedSticker.id, { opacity: value[0] })}
                max={1}
                min={0}
                step={0.01}
              />
              <span className="text-sm text-foreground font-medium whitespace-nowrap">
                {Math.round(selectedSticker.opacity * 100)}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Position</p>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">X Position</span>
              <div className="flex-1 flex items-center gap-3">
                <Slider
                  value={[selectedSticker.position.x]}
                  onValueChange={(value) =>
                    updateSticker(selectedSticker.id, { position: { ...selectedSticker.position, x: value[0] } })
                  }
                  max={100}
                  min={0}
                  step={1}
                />
                <span className="text-sm text-foreground font-medium whitespace-nowrap">
                  {Math.round(selectedSticker.position.x)}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">Y Position</span>
              <div className="flex-1 flex items-center gap-3">
                <Slider
                  value={[selectedSticker.position.y]}
                  onValueChange={(value) =>
                    updateSticker(selectedSticker.id, { position: { ...selectedSticker.position, y: value[0] } })
                  }
                  max={100}
                  min={0}
                  step={1}
                />
                <span className="text-sm text-foreground font-medium whitespace-nowrap">
                  {Math.round(selectedSticker.position.y)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

