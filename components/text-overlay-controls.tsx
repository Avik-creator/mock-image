'use client'

import { useState, useMemo } from 'react'
import { Eye, EyeOff, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GlassInputWrapper } from '@/components/ui/glass-input-wrapper'
import { useImageStore, getDefaultTextOverlay } from '@/lib/store'
import { fontFamilies, getAvailableFontWeights } from '@/lib/constants/fonts'

export const TextOverlayControls = () => {
  const [newText, setNewText] = useState('')
  const {
    textOverlays,
    addTextOverlay,
    updateTextOverlay,
    removeTextOverlay,
    clearTextOverlays,
    selectedOverlayId,
    setSelectedOverlayId,
  } = useImageStore()

  const selectedOverlay = useMemo(
    () => textOverlays.find((overlay) => overlay.id === selectedOverlayId) ?? null,
    [selectedOverlayId, textOverlays]
  )

  const handleAddText = () => {
    if (!newText.trim()) {
      return
    }
    const defaults = getDefaultTextOverlay(newText.trim())
    addTextOverlay(defaults)
    setNewText('')
  }

  const handleUpdatePosition = (axis: 'x' | 'y', value: number[]) => {
    if (!selectedOverlay) return
    updateTextOverlay(selectedOverlay.id, {
      position: {
        ...selectedOverlay.position,
        [axis]: value[0],
      },
    })
  }

  const handleUpdateFontSize = (value: number[]) => {
    if (!selectedOverlay) return
    updateTextOverlay(selectedOverlay.id, { fontSize: value[0] })
  }

  const handleUpdateOpacity = (value: number[]) => {
    if (!selectedOverlay) return
    updateTextOverlay(selectedOverlay.id, { opacity: value[0] })
  }

  const handleUpdateWidth = (value: number[]) => {
    if (!selectedOverlay) return
    updateTextOverlay(selectedOverlay.id, { maxWidth: value[0] })
  }

  const handleUpdateTextShadow = (
    updates: Partial<{
      enabled: boolean
      color: string
      blur: number
      offsetX: number
      offsetY: number
    }>
  ) => {
    if (!selectedOverlay) return
    updateTextOverlay(selectedOverlay.id, {
      textShadow: {
        ...selectedOverlay.textShadow,
        ...updates,
      },
    })
  }

  const handleUpdateBackgroundFill = (
    updates: Partial<{
      enabled: boolean
      color: string
      opacity: number
    }>
  ) => {
    if (!selectedOverlay) return
    updateTextOverlay(selectedOverlay.id, {
      backgroundFill: {
        ...selectedOverlay.backgroundFill,
        ...updates,
      },
    })
  }

  const handleToggleVisibility = (id: string) => {
    const overlay = textOverlays.find((item) => item.id === id)
    if (!overlay) return
    updateTextOverlay(id, { isVisible: !overlay.isVisible })
  }

  return (
    <div className="space-y-5" data-overlay-controls="true">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-foreground">Text Overlays</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={clearTextOverlays}
          disabled={textOverlays.length === 0}
          className="h-8 px-3 text-xs font-medium rounded-lg"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-3">
        <Input
          placeholder="Enter text..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddText()}
          className="h-11 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-ring"
        />
        <Button onClick={handleAddText} className="w-full rounded-xl" size="sm">
          Add Overlay
        </Button>
      </div>

      {textOverlays.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">Manage Overlays</p>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
            {textOverlays.map((overlay) => (
              <div
                key={overlay.id}
                className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-colors ${
                  selectedOverlayId === overlay.id
                    ? 'bg-accent border-primary'
                    : 'bg-background hover:bg-accent border-border'
                }`}
                onClick={() => setSelectedOverlayId(overlay.id)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleVisibility(overlay.id)
                  }}
                  className="h-6 w-6 p-0"
                >
                  {overlay.isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
                <span className="flex-1 text-xs truncate">{overlay.text}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTextOverlay(overlay.id)
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

      {selectedOverlay && (
        <div className="space-y-5 border-t pt-5">
          <div className="space-y-5">
            <p className="text-sm font-semibold text-foreground">{`Edit: "${selectedOverlay.text}"`}</p>

            <Input
              placeholder="Edit text..."
              value={selectedOverlay.text}
              onChange={(e) => updateTextOverlay(selectedOverlay.id, { text: e.target.value })}
              className="h-11 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-ring"
            />

            <div className="flex gap-2 items-center">
              <Input
                type="color"
                value={selectedOverlay.color}
                onChange={(e) => updateTextOverlay(selectedOverlay.id, { color: e.target.value })}
                className="w-12 h-12 rounded-xl border border-border cursor-pointer"
              />
              <Input
                placeholder="#ffffff"
                value={selectedOverlay.color}
                onChange={(e) => updateTextOverlay(selectedOverlay.id, { color: e.target.value })}
                className="flex-1 h-11 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-ring font-mono text-sm"
              />
            </div>

            <Select
              value={selectedOverlay.fontFamily}
              onValueChange={(fontId) => {
                const availableWeights = getAvailableFontWeights(fontId)
                const nextWeight = availableWeights.includes(selectedOverlay.fontWeight)
                  ? selectedOverlay.fontWeight
                  : availableWeights[0] || '400'
                updateTextOverlay(selectedOverlay.id, {
                  fontFamily: fontId,
                  fontWeight: nextWeight,
                })
              }}
            >
              <SelectTrigger className="w-full h-11 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Font family" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.id} value={font.id}>
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedOverlay.fontWeight}
              onValueChange={(weight) => updateTextOverlay(selectedOverlay.id, { fontWeight: weight })}
            >
              <SelectTrigger className="w-full h-11 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Font weight" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableFontWeights(selectedOverlay.fontFamily).map((weight) => (
                  <SelectItem key={weight} value={weight}>
                    {weight === '400'
                      ? 'Regular'
                      : weight === '500'
                      ? 'Medium (500)'
                      : weight === '600'
                      ? 'Semi Bold (600)'
                      : weight === '700'
                      ? 'Bold (700)'
                      : weight === '300'
                      ? 'Light (300)'
                      : `Weight ${weight}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedOverlay.orientation}
              onValueChange={(value: 'horizontal' | 'vertical') =>
                updateTextOverlay(selectedOverlay.id, { orientation: value })
              }
            >
              <SelectTrigger className="w-full h-11 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Text orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Font Size</span>
            <div className="flex-1 flex items-center gap-3">
              <Slider
                value={[selectedOverlay.fontSize]}
                onValueChange={handleUpdateFontSize}
                max={150}
                min={12}
                step={1}
              />
              <span className="text-sm text-foreground font-medium whitespace-nowrap">
                {selectedOverlay.fontSize}px
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Opacity</span>
            <div className="flex-1 flex items-center gap-3">
              <Slider value={[selectedOverlay.opacity]} onValueChange={handleUpdateOpacity} max={1} min={0} step={0.01} />
              <span className="text-sm text-foreground font-medium whitespace-nowrap">
                {Math.round(selectedOverlay.opacity * 100)}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Max Width</span>
            <div className="flex-1 flex items-center gap-3">
              <Slider value={[selectedOverlay.maxWidth]} onValueChange={handleUpdateWidth} max={100} min={10} step={1} />
              <span className="text-sm text-foreground font-medium whitespace-nowrap">
                {Math.round(selectedOverlay.maxWidth)}%
              </span>
            </div>
          </div>

          <div className="space-y-4 border-t pt-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Background Fill</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdateBackgroundFill({ enabled: !selectedOverlay.backgroundFill.enabled })}
                className="h-6 px-2 text-xs"
              >
                {selectedOverlay.backgroundFill.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>

            {selectedOverlay.backgroundFill.enabled && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={selectedOverlay.backgroundFill.color}
                    onChange={(e) => handleUpdateBackgroundFill({ color: e.target.value })}
                    className="w-12 h-10 p-1 rounded-lg border border-border"
                  />
                  <GlassInputWrapper className="flex-1">
                    <Input
                      placeholder="#000000"
                      value={selectedOverlay.backgroundFill.color}
                      onChange={(e) => handleUpdateBackgroundFill({ color: e.target.value })}
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </GlassInputWrapper>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">Opacity</span>
                  <div className="flex-1 flex items-center gap-3">
                    <Slider
                      value={[selectedOverlay.backgroundFill.opacity]}
                      onValueChange={(value) => handleUpdateBackgroundFill({ opacity: value[0] })}
                      max={1}
                      min={0}
                      step={0.01}
                    />
                    <span className="text-sm text-foreground font-medium whitespace-nowrap">
                      {Math.round(selectedOverlay.backgroundFill.opacity * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Text Shadow</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdateTextShadow({ enabled: !selectedOverlay.textShadow.enabled })}
                className="h-6 px-2 text-xs"
              >
                {selectedOverlay.textShadow.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>

            {selectedOverlay.textShadow.enabled && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={selectedOverlay.textShadow.color}
                    onChange={(e) => handleUpdateTextShadow({ color: e.target.value })}
                    className="w-12 h-10 p-1 rounded-lg border border-border"
                  />
                  <GlassInputWrapper className="flex-1">
                    <Input
                      placeholder="rgba(0, 0, 0, 0.5)"
                      value={selectedOverlay.textShadow.color}
                      onChange={(e) => handleUpdateTextShadow({ color: e.target.value })}
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </GlassInputWrapper>
                </div>

                {[
                  { label: 'Blur', key: 'blur', min: 0, max: 20, step: 1, suffix: 'px' },
                  { label: 'Offset X', key: 'offsetX', min: -20, max: 20, step: 1, suffix: 'px' },
                  { label: 'Offset Y', key: 'offsetY', min: -20, max: 20, step: 1, suffix: 'px' },
                ].map((control) => (
                  <div key={control.key} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">{control.label}</span>
                    <div className="flex-1 flex items-center gap-3">
                      <Slider
                        value={[selectedOverlay.textShadow[control.key as 'blur' | 'offsetX' | 'offsetY']]}
                        onValueChange={(value) => handleUpdateTextShadow({ [control.key]: value[0] })}
                        max={control.max}
                        min={control.min}
                        step={control.step}
                      />
                      <span className="text-sm text-foreground font-medium whitespace-nowrap">
                        {selectedOverlay.textShadow[control.key as 'blur' | 'offsetX' | 'offsetY']}
                        {control.suffix}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Position</p>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">X Position</span>
              <div className="flex-1 flex items-center gap-3">
                <Slider
                  value={[selectedOverlay.position.x]}
                  onValueChange={(value) => handleUpdatePosition('x', value)}
                  max={100}
                  min={0}
                  step={1}
                />
                <span className="text-sm text-foreground font-medium whitespace-nowrap">
                  {Math.round(selectedOverlay.position.x)}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">Y Position</span>
              <div className="flex-1 flex items-center gap-3">
                <Slider
                  value={[selectedOverlay.position.y]}
                  onValueChange={(value) => handleUpdatePosition('y', value)}
                  max={100}
                  min={0}
                  step={1}
                />
                <span className="text-sm text-foreground font-medium whitespace-nowrap">
                  {Math.round(selectedOverlay.position.y)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

