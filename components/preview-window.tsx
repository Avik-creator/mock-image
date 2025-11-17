'use client'

import { forwardRef } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { getTheme } from '@/lib/themes/theme-registry'
import { OverlayLayer } from '@/components/overlay-layer'
import {
  isLightTheme,
  isTechTheme,
  getWindowBackground,
  getControlsBackground,
  getBorderColor,
  getFrameBackgroundStyle,
  getWindowTitleColor,
  getLineNumberColor,
  getGridlineColor,
  shouldShowGridlines,
  shouldShowTransparentPattern,
} from '@/lib/themes/theme-utils'

interface PreviewWindowProps {
  code: string
  language: string
  theme: string
  background: string
  padding: number
  rounded: boolean
  showLineNumbers: boolean
  showWindowControls: boolean
  windowTitle?: string
  insertedImage?: string | null
  onChange?: (code: string) => void
  onImageInsert?: (image: string | null) => void
}

export const PreviewWindow = forwardRef<HTMLDivElement, PreviewWindowProps>(
  function PreviewWindow(
    { code, language, theme, background, padding, rounded, showLineNumbers, showWindowControls, windowTitle, insertedImage, onChange, onImageInsert },
    ref
  ) {
    const selectedTheme = getTheme(theme)
    const themeBg = selectedTheme.plain?.backgroundColor || '#1e1e1e'
    const isLight = isLightTheme(theme)
    const isTech = isTechTheme(theme)
    
    const windowBg = getWindowBackground(theme)
    const controlsBg = getControlsBackground(theme)
    const borderColor = getBorderColor(theme)
    const frameBgStyle = getFrameBackgroundStyle(theme, background)
    const titleColor = getWindowTitleColor(theme, isLight)
    const lineNumberColor = getLineNumberColor(theme, isLight)
    const gridlineColor = getGridlineColor(theme)
    const showGridlines = shouldShowGridlines(theme)
    const showTransparentPattern = shouldShowTransparentPattern(theme, background)

    // Get border style for tech themes
    const getBorderStyle = () => {
      if (theme === 'supabase') return '1px solid #292929'
      if (theme === 'tailwind') return '1px solid rgba(255, 255, 255, 0.1)'
      if (theme === 'trigger') return 'none'
      if (theme === 'clerk') return 'none'
      if (theme === 'mintlify') return 'none'
      if (theme === 'prisma') return '1px solid transparent'
      if (theme === 'openai') return '0.5px solid rgba(255, 255, 255, 0.1)'
      if (theme === 'elevenlabs') return '1px solid #353535'
      if (theme === 'resend') return '0.5px solid hsla(0, 0%, 24%, 0.13)'
      if (theme === 'nuxt') return '1px solid transparent'
      return 'none'
    }

    return (
      <div
        ref={ref}
        style={{
          ...frameBgStyle,
          padding: `${padding}px`,
          position: 'relative',
        }}
        className="inline-block relative"
      >
        {/* Transparent pattern overlay */}
        {showTransparentPattern && (
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: 'linear-gradient(45deg, #1d1d1d 25%, transparent 0), linear-gradient(-45deg, #1d1d1d 25%, transparent 0), linear-gradient(45deg, transparent 75%, #1d1d1d 0), linear-gradient(-45deg, transparent 75%, #1d1d1d 0)',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0',
              backgroundSize: '20px 20px',
            }}
          />
        )}
        <div
          className="overflow-hidden relative"
          style={{ 
            minWidth: '500px',
            backgroundColor: windowBg,
            borderRadius: rounded ? '0.75rem' : '0',
            boxShadow: isTech ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: getBorderStyle(),
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Theme-specific decorations - Gridlines */}
          {showGridlines && (
            <>
              {/* Horizontal gridlines */}
              <span 
                className="absolute top-0 bottom-0 left-[-150px] w-[1200px] h-px pointer-events-none z-0"
                style={{ 
                  background: gridlineColor,
                  top: 0,
                }}
              />
              <span 
                className="absolute top-0 bottom-0 left-[-150px] w-[1200px] h-px pointer-events-none z-0"
                style={{ 
                  background: gridlineColor,
                  bottom: 0,
                  top: 'auto',
                }}
              />
              {/* Vertical gridlines */}
              <span 
                className="absolute top-[-150px] bottom-0 left-0 w-px pointer-events-none z-0"
                style={{ 
                  background: gridlineColor,
                  height: 'calc(100% + 300px)',
                }}
              />
              <span 
                className="absolute top-[-150px] bottom-0 right-0 w-px pointer-events-none z-0"
                style={{ 
                  background: gridlineColor,
                  height: 'calc(100% + 300px)',
                }}
              />
            </>
          )}
          
          {/* Vercel Corner Brackets */}
          {theme === 'vercel' && (
            <>
              <span 
                className="absolute top-[-12px] left-[-12px] w-[25px] h-[25px] pointer-events-none z-10"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span 
                  className="absolute top-[12px] w-full h-px"
                  style={{ background: '#515356' }}
                />
                <span 
                  className="absolute left-[12px] w-px h-full"
                  style={{ background: '#515356' }}
                />
              </span>
              <span 
                className="absolute bottom-[-12px] right-[-12px] w-[25px] h-[25px] pointer-events-none z-10"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span 
                  className="absolute top-[12px] w-full h-px"
                  style={{ background: '#515356' }}
                />
                <span 
                  className="absolute left-[12px] w-px h-full"
                  style={{ background: '#515356' }}
                />
              </span>
            </>
          )}
          
          {/* Prisma Gradient Borders */}
          {theme === 'prisma' && (
            <>
              <span 
                className="absolute inset-[-1px] rounded-[10px] pointer-events-none z-0"
                style={{
                  background: 'linear-gradient(140deg, #3e4083, #16544f)',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
              <span 
                className="absolute inset-[-6px] rounded-[16px] pointer-events-none z-0"
                style={{
                  background: 'linear-gradient(140deg, #3e4083, #16544f)',
                  opacity: 0.5,
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
            </>
          )}
          
          {/* Nuxt Gradient Borders */}
          {theme === 'nuxt' && (
            <>
              <span 
                className="absolute inset-[-1px] rounded-[10px] pointer-events-none z-0"
                style={{
                  background: 'linear-gradient(135deg, #00dc82 0%, #00dc82 8%, transparent 20%, transparent 80%, #00dc82 92%, #00dc82 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
            </>
          )}
          {showWindowControls && (
            <div 
              className="flex items-center gap-2 px-4 py-3 border-b relative"
              style={{ 
                backgroundColor: controlsBg,
                borderColor: borderColor,
              }}
            >
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              {windowTitle && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 text-xs font-medium truncate max-w-[60%]"
                  style={{ 
                    color: titleColor,
                  }}
                  title={windowTitle}
                >
                  {windowTitle}
                </div>
              )}
            </div>
          )}
          <div 
            className="p-6 overflow-x-auto relative"
            style={{ backgroundColor: themeBg }}
          >
            {insertedImage && (
              <div className="mb-4 flex justify-center">
                <img 
                  src={insertedImage} 
                  alt="Inserted" 
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            )}
            {onChange && (
              <textarea
                value={code}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full p-6 bg-transparent text-transparent resize-none outline-none font-mono text-sm leading-relaxed z-10"
                style={{ caretColor: isLight ? '#000000' : '#ffffff' }}
                spellCheck={false}
              />
            )}
            <Highlight theme={selectedTheme} code={code} language={language}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} font-mono text-sm leading-relaxed pointer-events-none`}
                  style={{ backgroundColor: 'transparent', margin: 0 }}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {showLineNumbers && (
                        <span 
                          className="inline-block w-8 text-right mr-4 select-none"
                          style={{ 
                            opacity: isTech ? 1 : 0.4,
                            color: lineNumberColor,
                          }}
                        >
                          {i + 1}
                        </span>
                      )}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
        <OverlayLayer />
      </div>
    )
  }
)
