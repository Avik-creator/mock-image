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
  { value: 'monokai', label: 'Monokai', category: 'dark' },
  { value: 'dracula', label: 'Dracula', category: 'dark' },
  { value: 'nightOwl', label: 'Night Owl', category: 'dark' },
  { value: 'oceanicNext', label: 'Oceanic Next', category: 'dark' },
  { value: 'atomDark', label: 'Atom Dark', category: 'dark' },
  { value: 'synthwave', label: 'Synthwave 84', category: 'dark' },
  { value: 'vsDark', label: 'VS Code Dark', category: 'dark' },
  { value: 'vscDarkPlus', label: 'VS Code Dark+', category: 'dark' },
  { value: 'duotoneDark', label: 'Duotone Dark', category: 'dark' },
  { value: 'shadesOfPurple', label: 'Shades of Purple', category: 'dark' },
  { value: 'palenight', label: 'Palenight', category: 'dark' },
  { value: 'materialDark', label: 'Material Dark', category: 'dark' },
  { value: 'materialOceanic', label: 'Material Oceanic', category: 'dark' },
  { value: 'nord', label: 'Nord', category: 'dark' },
  { value: 'zTouch', label: 'zTouch', category: 'dark' },
  { value: 'pojoaque', label: 'Pojoaque', category: 'dark' },
  { value: 'github', label: 'GitHub', category: 'light' },
  { value: 'vsLight', label: 'VS Code Light', category: 'light' },
  { value: 'duotoneLight', label: 'Duotone Light', category: 'light' },
  { value: 'materialLight', label: 'Material Light', category: 'light' },
  { value: 'oneLight', label: 'One Light', category: 'light' },
]

const backgrounds = [
  // Gradients
  { value: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', label: 'Pink Purple', type: 'gradient' },
  { value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Blue Purple', type: 'gradient' },
  { value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Pink Red', type: 'gradient' },
  { value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Blue Cyan', type: 'gradient' },
  { value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Green Teal', type: 'gradient' },
  { value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'Pink Yellow', type: 'gradient' },
  { value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', label: 'Mint Pink', type: 'gradient' },
  { value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', label: 'Coral Pink', type: 'gradient' },
  { value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', label: 'Peach', type: 'gradient' },
  { value: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', label: 'Sky Blue', type: 'gradient' },
  { value: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', label: 'Purple Blue', type: 'gradient' },
  { value: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', label: 'Lavender', type: 'gradient' },
  { value: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', label: 'Sunset', type: 'gradient' },
  { value: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', label: 'Violet Sky', type: 'gradient' },
  { value: 'radial-gradient(circle at top left, #667eea 0%, #764ba2 100%)', label: 'Radial Purple', type: 'gradient' },
  { value: 'radial-gradient(circle at top right, #43e97b 0%, #38f9d7 100%)', label: 'Radial Teal', type: 'gradient' },
  
  // Solid Colors
  { value: '#1e1e1e', label: 'Dark', type: 'color' },
  { value: '#18181b', label: 'Zinc Dark', type: 'color' },
  { value: '#0a0a0a', label: 'Almost Black', type: 'color' },
  { value: '#ffffff', label: 'White', type: 'color' },
  { value: '#f4f4f5', label: 'Light Gray', type: 'color' },
  { value: '#fafafa', label: 'Off White', type: 'color' },
  
  // Abstract Images
  { value: '/abstract/abstract1.avif', label: 'Abstract 1', type: 'image' },
  { value: '/abstract/abstract2.avif', label: 'Abstract 2', type: 'image' },
  { value: '/abstract/abstract3.avif', label: 'Abstract 3', type: 'image' },
  { value: '/abstract/abstract4.avif', label: 'Abstract 4', type: 'image' },
  
  // Radiant Images
  { value: '/radiant/radiant1.jpg', label: 'Radiant 1', type: 'image' },
  { value: '/radiant/radiant2.jpg', label: 'Radiant 2', type: 'image' },
  { value: '/radiant/radiant3.jpg', label: 'Radiant 3', type: 'image' },
  { value: '/radiant/radiant4.jpg', label: 'Radiant 4', type: 'image' },
  { value: '/radiant/radiant5.jpg', label: 'Radiant 5', type: 'image' },
  { value: '/radiant/radiant6.jpg', label: 'Radiant 6', type: 'image' },
  { value: '/radiant/radiant7.avif', label: 'Radiant 7', type: 'image' },
  { value: '/radiant/radiant8.jpg', label: 'Radiant 8', type: 'image' },
  { value: '/radiant/radiant9.jpg', label: 'Radiant 9', type: 'image' },
  { value: '/radiant/radiant10.jpg', label: 'Radiant 10', type: 'image' },
  
  // Pattern Images
  { value: '/pattern/pattern1.png', label: 'Pattern 1', type: 'image' },
  { value: '/pattern/pattern2.png', label: 'Pattern 2', type: 'image' },
  { value: '/pattern/pattern3.webp', label: 'Pattern 3', type: 'image' },
  { value: '/pattern/pattern4.png', label: 'Pattern 4', type: 'image' },
  
  // Nature Images
  { value: '/nature/nature1.avif', label: 'Nature 1', type: 'image' },
  { value: '/nature/nature2.avif', label: 'Nature 2', type: 'image' },
  { value: '/nature/nature3.avif', label: 'Nature 3', type: 'image' },
  { value: '/nature/nature4.avif', label: 'Nature 4', type: 'image' },
  { value: '/nature/nature5.avif', label: 'Nature 5', type: 'image' },
  
  // Mesh Images
  { value: '/mesh/mesh1.webp', label: 'Mesh 1', type: 'image' },
  { value: '/mesh/mesh2.webp', label: 'Mesh 2', type: 'image' },
  { value: '/mesh/mesh3.webp', label: 'Mesh 3', type: 'image' },
  { value: '/mesh/mesh4.webp', label: 'Mesh 4', type: 'image' },
  { value: '/mesh/mesh5.webp', label: 'Mesh 5', type: 'image' },
  { value: '/mesh/mesh6.webp', label: 'Mesh 6', type: 'image' },
  { value: '/mesh/mesh7.webp', label: 'Mesh 7', type: 'image' },
  { value: '/mesh/mesh8.webp', label: 'Mesh 8', type: 'image' },
  
  // Mac Images
  { value: '/mac/mac1.webp', label: 'Mac 1', type: 'image' },
  { value: '/mac/mac2.webp', label: 'Mac 2', type: 'image' },
  { value: '/mac/mac3.webp', label: 'Mac 3', type: 'image' },
  { value: '/mac/mac4.webp', label: 'Mac 4', type: 'image' },
  { value: '/mac/mac5.webp', label: 'Mac 5', type: 'image' },
  { value: '/mac/mac6.jpeg', label: 'Mac 6', type: 'image' },
  { value: '/mac/mac7.jpg', label: 'Mac 7', type: 'image' },
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
              <SelectContent className="max-h-[400px]">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Dark Themes
                </div>
                {themes.filter(t => t.category === 'dark').map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                  Light Themes
                </div>
                {themes.filter(t => t.category === 'light').map((t) => (
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
          <SelectContent className="max-h-[500px]">
            {backgrounds.map((bg) => (
              <SelectItem key={bg.value} value={bg.value}>
                <div className="flex items-center gap-2">
                  {bg.type === 'image' ? (
                    <img
                      src={bg.value}
                      alt={bg.label}
                      className="w-8 h-8 rounded border border-border object-cover"
                    />
                  ) : (
                    <div
                      className="w-4 h-4 rounded border border-border"
                      style={{
                        ...(bg.value.startsWith('linear-gradient') || bg.value.startsWith('radial-gradient')
                          ? { backgroundImage: bg.value }
                          : { backgroundColor: bg.value })
                      }}
                    />
                  )}
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
