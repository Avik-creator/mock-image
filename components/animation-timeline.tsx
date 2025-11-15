'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Play, Pause, RotateCcw } from 'lucide-react'
import { AnimationLayer, AnimationType, EasingType, animationPresets } from '@/types/animation'

interface AnimationTimelineProps {
  layers: AnimationLayer[]
  onLayersChange: (layers: AnimationLayer[]) => void
  totalDuration: number
  onTotalDurationChange: (duration: number) => void
  isPlaying: boolean
  onPlayPause: () => void
  onReset: () => void
  currentProgress: number
  onProgressChange: (progress: number) => void
}

export function AnimationTimeline({
  layers,
  onLayersChange,
  totalDuration,
  onTotalDurationChange,
  isPlaying,
  onPlayPause,
  onReset,
  currentProgress,
  onProgressChange,
}: AnimationTimelineProps) {
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null)

  const addLayer = (type: AnimationType) => {
    const newLayer: AnimationLayer = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      startTime: 0,
      duration: 30,
      easing: 'easeOut',
      intensity: 100,
    }
    onLayersChange([...layers, newLayer])
    setSelectedLayerId(newLayer.id)
  }

  const removeLayer = (id: string) => {
    onLayersChange(layers.filter(layer => layer.id !== id))
    if (selectedLayerId === id) {
      setSelectedLayerId(null)
    }
  }

  const updateLayer = (id: string, updates: Partial<AnimationLayer>) => {
    onLayersChange(
      layers.map(layer => 
        layer.id === id ? { ...layer, ...updates } : layer
      )
    )
  }

  const selectedLayer = layers.find(l => l.id === selectedLayerId)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-lg p-3 border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPlayPause}
          className="h-8 w-8"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="flex-1 px-2">
          <Slider
            value={[currentProgress]}
            onValueChange={([value]) => onProgressChange(value)}
            min={0}
            max={100}
            step={0.1}
            className="w-full"
          />
        </div>
        <span className="text-xs text-muted-foreground w-16 text-right">
          {((currentProgress / 100) * totalDuration).toFixed(1)}s
        </span>
      </div>

      <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Duration</Label>
          <span className="text-xs font-medium">{totalDuration}s</span>
        </div>
        <Slider
          value={[totalDuration]}
          onValueChange={([value]) => onTotalDurationChange(value)}
          min={1}
          max={10}
          step={0.5}
        />
      </div>

      <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border space-y-2">
        <Label className="text-xs">Add Animation</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {(Object.entries(animationPresets) as [AnimationType, typeof animationPresets[AnimationType]][]).map(([type, preset]) => (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              onClick={() => addLayer(type)}
              className="h-8 text-xs justify-start hover:bg-primary/10"
              title={preset.label}
            >
              <span className="mr-1.5">{preset.icon}</span>
              <span className="truncate">{preset.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Layers</Label>
          <span className="text-xs text-muted-foreground">{layers.length}</span>
        </div>
        {layers.length === 0 ? (
          <div className="text-center py-6 text-xs text-muted-foreground">
            <Plus className="h-6 w-6 mx-auto mb-1.5 opacity-50" />
            Add animations above
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[250px] overflow-y-auto">
            {layers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`p-2 border rounded-md cursor-pointer transition-all ${
                  selectedLayerId === layer.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium">
                    {animationPresets[layer.type].icon} {animationPresets[layer.type].label}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeLayer(layer.id)
                    }}
                    className="h-5 w-5 p-0 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                {/* Timeline Bar */}
                <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-primary rounded-full"
                    style={{
                      left: `${layer.startTime}%`,
                      width: `${layer.duration}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>{((layer.startTime / 100) * totalDuration).toFixed(1)}s</span>
                  <span>{((layer.duration / 100) * totalDuration).toFixed(1)}s</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLayer && (
        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs">
              {animationPresets[selectedLayer.type].icon} {animationPresets[selectedLayer.type].label}
            </Label>
          </div>

          {/* Start Time */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] text-muted-foreground">Start</Label>
              <span className="text-[10px] font-medium">{((selectedLayer.startTime / 100) * totalDuration).toFixed(2)}s</span>
            </div>
            <Slider
              value={[selectedLayer.startTime]}
              onValueChange={([value]) => updateLayer(selectedLayer.id, { startTime: value })}
              min={0}
              max={100 - selectedLayer.duration}
              step={1}
            />
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] text-muted-foreground">Duration</Label>
              <span className="text-[10px] font-medium">{((selectedLayer.duration / 100) * totalDuration).toFixed(2)}s</span>
            </div>
            <Slider
              value={[selectedLayer.duration]}
              onValueChange={([value]) => updateLayer(selectedLayer.id, { duration: value })}
              min={5}
              max={100 - selectedLayer.startTime}
              step={1}
            />
          </div>

          {/* Intensity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] text-muted-foreground">Intensity</Label>
              <span className="text-[10px] font-medium">{selectedLayer.intensity}%</span>
            </div>
            <Slider
              value={[selectedLayer.intensity]}
              onValueChange={([value]) => updateLayer(selectedLayer.id, { intensity: value })}
              min={0}
              max={100}
              step={5}
            />
          </div>

          {/* Easing */}
          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">Easing</Label>
            <Select
              value={selectedLayer.easing}
              onValueChange={(value: EasingType) => updateLayer(selectedLayer.id, { easing: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="easeIn">Ease In</SelectItem>
                <SelectItem value="easeOut">Ease Out</SelectItem>
                <SelectItem value="easeInOut">Ease In Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
