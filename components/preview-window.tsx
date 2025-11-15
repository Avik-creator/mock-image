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
  monokai: themes.vsDark,
  github: themes.github,
  dracula: themes.dracula,
  nightOwl: themes.nightOwl,
  oceanicNext: themes.oceanicNext,
  atomDark: themes.oneDark,
  synthwave: themes.synthwave84,
  vsDark: themes.vsDark,
  vsLight: themes.vsLight,
  duotoneLight: themes.duotoneLight,
}

export const PreviewWindow = forwardRef<HTMLDivElement, PreviewWindowProps>(
  function PreviewWindow(
    { code, language, theme, background, padding, rounded, showLineNumbers, showWindowControls, onChange },
    ref
  ) {
    const selectedTheme = themeMap[theme] || themes.vsDark

    return (
      <div
        ref={ref}
        style={{
          ...(background.startsWith('linear-gradient') || background.startsWith('radial-gradient')
            ? { backgroundImage: background }
            : { backgroundColor: background }),
          padding: `${padding}px`,
        }}
        className="inline-block"
      >
        <div
          className={`bg-[#1e1e1e] shadow-2xl overflow-hidden ${
            rounded ? 'rounded-xl' : ''
          }`}
          style={{ minWidth: '500px' }}
        >
          {showWindowControls && (
            <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
          )}
          <div className="p-6 overflow-x-auto relative">
            {onChange && (
              <textarea
                value={code}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full p-6 bg-transparent text-transparent caret-white resize-none outline-none font-mono text-sm leading-relaxed z-10"
                style={{ caretColor: 'white' }}
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
                        <span className="inline-block w-8 text-right mr-4 select-none opacity-30">
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
