'use client'

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface ControlPanelProps {
  playground: 'code' | 'image'
  language: string
  theme: string
  background: string
  padding: number
  rounded: boolean
  showLineNumbers: boolean
  showWindowControls: boolean
  onLanguageChange: (value: string) => void
  onThemeChange: (value: string) => void
  onBackgroundChange: (value: string) => void
  onPaddingChange: (value: number) => void
  onRoundedChange: (value: boolean) => void
  onLineNumbersChange: (value: boolean) => void
  onWindowControlsChange: (value: boolean) => void
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'jsx', label: 'JSX' },
  { value: 'tsx', label: 'TSX' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'python', label: 'Python' },
  { value: 'json', label: 'JSON' },
  { value: 'bash', label: 'Bash' },
  { value: 'sql', label: 'SQL' },
]

const themes = [
  { value: 'monokai', label: 'Monokai' },
  { value: 'github', label: 'GitHub' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'nightOwl', label: 'Night Owl' },
  { value: 'oceanicNext', label: 'Oceanic Next' },
  { value: 'atomDark', label: 'Atom Dark' },
  { value: 'synthwave', label: 'Synthwave 84' },
  { value: 'vsDark', label: 'VS Dark' },
  { value: 'vsLight', label: 'VS Light' },
  { value: 'duotoneLight', label: 'Duotone Light' },
]

const backgrounds = [
  { value: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', label: 'Pink Purple' },
  { value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Blue Purple' },
  { value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Pink Red' },
  { value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Blue Cyan' },
  { value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Green Teal' },
  { value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'Pink Yellow' },
  { value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', label: 'Mint Pink' },
  { value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', label: 'Coral Pink' },
  { value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', label: 'Peach' },
  { value: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', label: 'Sky Blue' },
  { value: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', label: 'Purple Blue' },
  { value: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', label: 'Lavender' },
  { value: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', label: 'Sunset' },
  { value: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', label: 'Violet Sky' },
  { value: 'radial-gradient(circle at top left, #667eea 0%, #764ba2 100%)', label: 'Radial Purple' },
  { value: 'radial-gradient(circle at top right, #43e97b 0%, #38f9d7 100%)', label: 'Radial Teal' },
  { value: '#1e1e1e', label: 'Dark' },
  { value: '#18181b', label: 'Zinc Dark' },
  { value: '#0a0a0a', label: 'Almost Black' },
  { value: '#ffffff', label: 'White' },
  { value: '#f4f4f5', label: 'Light Gray' },
  { value: '#fafafa', label: 'Off White' },
]

export function ControlPanel({
  playground,
  language,
  theme,
  background,
  padding,
  rounded,
  showLineNumbers,
  showWindowControls,
  onLanguageChange,
  onThemeChange,
  onBackgroundChange,
  onPaddingChange,
  onRoundedChange,
  onLineNumbersChange,
  onWindowControlsChange,
}: ControlPanelProps) {
  return (
    <div className="space-y-6">
      {playground === 'code' && (
        <>
          {/* Language */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Language</Label>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Theme</Label>
            <Select value={theme} onValueChange={onThemeChange}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Background */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground">Background</Label>
        <Select value={background} onValueChange={onBackgroundChange}>
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {backgrounds.map((bg) => (
              <SelectItem key={bg.value} value={bg.value}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border border-border"
                    style={{
                      ...(bg.value.startsWith('linear-gradient') || bg.value.startsWith('radial-gradient')
                        ? { backgroundImage: bg.value }
                        : { backgroundColor: bg.value })
                    }}
                  />
                  {bg.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Padding */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-muted-foreground">Padding</Label>
          <span className="text-xs text-muted-foreground">{padding}px</span>
        </div>
        <Slider
          value={[padding]}
          onValueChange={([value]) => onPaddingChange(value)}
          min={16}
          max={128}
          step={8}
          className="py-1"
        />
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div className="flex items-center justify-between">
          <Label htmlFor="rounded" className="text-xs font-medium text-muted-foreground cursor-pointer">
            Rounded Corners
          </Label>
          <Switch
            id="rounded"
            checked={rounded}
            onCheckedChange={onRoundedChange}
          />
        </div>

        {playground === 'code' && (
          <>
            <div className="flex items-center justify-between">
              <Label htmlFor="lineNumbers" className="text-xs font-medium text-muted-foreground cursor-pointer">
                Line Numbers
              </Label>
              <Switch
                id="lineNumbers"
                checked={showLineNumbers}
                onCheckedChange={onLineNumbersChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="windowControls" className="text-xs font-medium text-muted-foreground cursor-pointer">
                Window Controls
              </Label>
              <Switch
                id="windowControls"
                checked={showWindowControls}
                onCheckedChange={onWindowControlsChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
