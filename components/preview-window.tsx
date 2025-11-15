'use client'

import { forwardRef } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface PreviewWindowProps {
  code: string
  language: string
  theme: string
  background: string
  padding: number
  rounded: boolean
  showLineNumbers: boolean
  showWindowControls: boolean
  onChange?: (code: string) => void
}

const themeMap: Record<string, any> = {
  monokai: themes.vsDark, // Monokai-like dark theme
  github: themes.github,
  dracula: themes.dracula,
  nightOwl: themes.nightOwl,
  oceanicNext: themes.oceanicNext,
  atomDark: themes.oneDark,
  synthwave: themes.synthwave84,
  vsDark: themes.vsDark,
  vsLight: themes.vsLight,
  duotoneLight: themes.duotoneLight,
  duotoneDark: themes.duotoneDark,
  shadesOfPurple: themes.shadesOfPurple,
  palenight: themes.palenight,
  materialDark: themes.materialDark,
  materialLight: themes.materialLight,
  materialOceanic: themes.materialOceanic,
  nord: themes.nord,
  oneLight: themes.oneLight,
  pojoaque: themes.pojoaque,
  vscDarkPlus: themes.vscDarkPlus,
  zTouch: themes.zTouch,
}

export const PreviewWindow = forwardRef<HTMLDivElement, PreviewWindowProps>(
  function PreviewWindow(
    { code, language, theme, background, padding, rounded, showLineNumbers, showWindowControls, onChange },
    ref
  ) {
    const selectedTheme = themeMap[theme] || themes.vsDark
    const themeBg = selectedTheme.plain?.backgroundColor || '#1e1e1e'
    const isLightTheme = theme === 'vsLight' || theme === 'duotoneLight' || theme === 'materialLight' || theme === 'oneLight'
    const windowBg = isLightTheme ? '#ffffff' : '#1e1e1e'
    const controlsBg = isLightTheme ? '#f5f5f5' : '#2d2d2d'
    const borderColor = isLightTheme ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)'

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
      <div
        ref={ref}
        style={{
          ...getBackgroundStyle(),
          padding: `${padding}px`,
        }}
        className="inline-block"
      >
        <div
          className="shadow-2xl overflow-hidden"
          style={{ 
            minWidth: '500px',
            backgroundColor: windowBg,
            borderRadius: rounded ? '0.75rem' : '0',
          }}
        >
          {showWindowControls && (
            <div 
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ 
                backgroundColor: controlsBg,
                borderColor: borderColor,
              }}
            >
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
          )}
          <div 
            className="p-6 overflow-x-auto relative"
            style={{ backgroundColor: themeBg }}
          >
            {onChange && (
              <textarea
                value={code}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full p-6 bg-transparent text-transparent resize-none outline-none font-mono text-sm leading-relaxed z-10"
                style={{ caretColor: isLightTheme ? '#000000' : '#ffffff' }}
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
                            opacity: 0.4,
                            color: isLightTheme ? '#666666' : '#888888'
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
      </div>
    )
  }
)
