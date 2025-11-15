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
  windowTitle?: string
  insertedImage?: string | null
  onChange?: (code: string) => void
  onImageInsert?: (image: string | null) => void
}

// Helper function to create theme with common structure
const createTheme = (bg: string, fg: string, colors: {
  comment?: string
  keyword?: string
  string?: string
  function?: string
  variable?: string
  constant?: string
  type?: string
  punctuation?: string
}) => ({
  plain: {
    color: fg,
    backgroundColor: bg,
  },
  styles: [
    {
      types: ['comment', 'punctuation.definition.comment'],
      style: { color: colors.comment || '#6a737d' },
    },
    {
      types: ['keyword', 'storage.modifier', 'storage.type', 'keyword.control', 'keyword.operator'],
      style: { color: colors.keyword || '#d73a49' },
    },
    {
      types: ['string', 'string.quoted', 'punctuation.definition.string.begin', 'punctuation.definition.string.end', 'string.regexp', 'string.interpolated'],
      style: { color: colors.string || '#032f62' },
    },
    {
      types: ['entity.name.function', 'support.function', 'meta.function-call'],
      style: { color: colors.function || '#6f42c1' },
    },
    {
      types: ['variable.other.readwrite', 'variable.other.readwrite.alias', 'variable.parameter', 'variable.other.property', 'support.variable.property'],
      style: { color: colors.variable || fg },
    },
    {
      types: ['constant.language', 'constant.numeric', 'constant.numeric.decimal'],
      style: { color: colors.constant || '#005cc5' },
    },
    {
      types: ['support.type.primitive', 'support.type', 'entity.name.type'],
      style: { color: colors.type || '#005cc5' },
    },
    {
      types: ['punctuation', 'meta.brace'],
      style: { color: colors.punctuation || fg },
    },
  ],
})

// Vercel Theme Configuration
const vercelTheme = {
  plain: {
    color: '#eeeeee',
    backgroundColor: '#000000',
  },
  styles: [
    {
      types: ['comment', 'punctuation.definition.comment'],
      style: {
        color: '#a0a0a0',
      },
    },
    {
      types: ['keyword', 'storage.modifier', 'storage.type', 'keyword.control', 'keyword.operator'],
      style: {
        color: '#ff4d8d',
      },
    },
    {
      types: ['string', 'string.quoted', 'punctuation.definition.string.begin', 'punctuation.definition.string.end', 'string.regexp', 'string.interpolated'],
      style: {
        color: '#00cb50',
      },
    },
    {
      types: ['constant.character', 'variable.language.this'],
      style: {
        color: '#A6B5FF',
      },
    },
    {
      types: ['constant.language', 'constant.numeric', 'constant.numeric.decimal'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['variable.other.constant'],
      style: {
        color: '#47a8ff',
      },
    },
    {
      types: ['variable.other.readwrite', 'variable.other.readwrite.alias', 'variable.parameter', 'variable.other.property', 'support.variable.property'],
      style: {
        color: '#eeeeee',
      },
    },
    {
      types: ['variable.other.object'],
      style: {
        color: '#47a8ff',
      },
    },
    {
      types: ['entity.name.function', 'support.function', 'meta.function-call'],
      style: {
        color: '#c473fc',
      },
    },
    {
      types: ['entity.name.tag'],
      style: {
        color: '#00cb50',
      },
    },
    {
      types: ['support.class.component'],
      style: {
        color: '#47a8ff',
      },
    },
    {
      types: ['entity.other.attribute-name'],
      style: {
        color: '#c473fc',
      },
    },
    {
      types: ['punctuation', 'meta.brace', 'punctuation.definition.tag.begin', 'punctuation.definition.tag.end', 'punctuation.definition.tag'],
      style: {
        color: '#eeeeee',
      },
    },
    {
      types: ['support.type.primitive', 'support.type'],
      style: {
        color: '#47a8ff',
      },
    },
    {
      types: ['entity.name.type.tsx', 'meta.type.annotation.tsx', 'meta.var-single-variable.expr.tsx', 'entity.name'],
      style: {
        color: '#C473FC',
      },
    },
    {
      types: ['markup.underline.link', 'string.other.link'],
      style: {
        color: '#00cb50',
      },
    },
    {
      types: ['markup.bold'],
      style: {
        color: '#ff4d8d',
        fontWeight: 'bold',
      },
    },
    {
      types: ['markup.italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['markup.heading', 'entity.name.section'],
      style: {
        color: '#c473fc',
        fontWeight: 'bold',
      },
    },
    {
      types: ['invalid', 'invalid.illegal'],
      style: {
        color: '#ff0000',
      },
    },
  ],
}

// Supabase Theme
const supabaseTheme = createTheme('#171717', '#fafafa', {
  comment: '#898989',
  keyword: '#ff6b6b',
  string: '#51cf66',
  function: '#74c0fc',
  variable: '#fafafa',
  constant: '#ffd43b',
  type: '#74c0fc',
  punctuation: '#fafafa',
})

// Tailwind Theme
const tailwindTheme = createTheme('#1e293b', '#e2e8f0', {
  comment: '#64748b',
  keyword: '#f472b6',
  string: '#34d399',
  function: '#818cf8',
  variable: '#e2e8f0',
  constant: '#fbbf24',
  type: '#60a5fa',
  punctuation: '#e2e8f0',
})

// Trigger.dev Theme
const triggerTheme = createTheme('#121317', '#b5b8c0', {
  comment: '#5f6570',
  keyword: '#ff6b9d',
  string: '#4ade80',
  function: '#a78bfa',
  variable: '#b5b8c0',
  constant: '#fbbf24',
  type: '#60a5fa',
  punctuation: '#b5b8c0',
})

// Clerk Theme
const clerkTheme = createTheme('#191919', '#ffffff', {
  comment: '#666666',
  keyword: '#ff6b6b',
  string: '#51cf66',
  function: '#74c0fc',
  variable: '#ffffff',
  constant: '#ffd43b',
  type: '#74c0fc',
  punctuation: '#ffffff',
})

// Mintlify Theme
const mintlifyTheme = createTheme('#070a08', '#55d799', {
  comment: '#4a5568',
  keyword: '#ff6b9d',
  string: '#55d799',
  function: '#a78bfa',
  variable: '#55d799',
  constant: '#fbbf24',
  type: '#60a5fa',
  punctuation: '#55d799',
})

// Prisma Theme
const prismaTheme = createTheme('hsla(223, 41%, 7%, 75%)', '#e2e8f0', {
  comment: '#64748b',
  keyword: '#f472b6',
  string: '#34d399',
  function: '#818cf8',
  variable: '#e2e8f0',
  constant: '#fbbf24',
  type: '#60a5fa',
  punctuation: '#e2e8f0',
})

// OpenAI Theme
const openaiTheme = createTheme('#232b41', '#ffffff', {
  comment: 'rgba(255, 255, 255, 0.2)',
  keyword: '#ff6b9d',
  string: '#4ade80',
  function: '#a78bfa',
  variable: '#ffffff',
  constant: '#fbbf24',
  type: '#60a5fa',
  punctuation: '#ffffff',
})

// ElevenLabs Theme
const elevenLabsTheme = createTheme('#111', '#ffffff', {
  comment: '#666666',
  keyword: '#ff6b6b',
  string: '#51cf66',
  function: '#74c0fc',
  variable: '#ffffff',
  constant: '#ffd43b',
  type: '#74c0fc',
  punctuation: '#ffffff',
})

// Resend Theme (Dark)
const resendTheme = createTheme('hsla(0, 0%, 0%, 0.88)', 'hsl(0, 0%, 98%)', {
  comment: '#666666',
  keyword: '#00fff6',
  string: '#67ffde',
  function: '#00fff6',
  variable: 'hsl(0, 0%, 98%)',
  constant: '#ffd43b',
  type: '#00fff6',
  punctuation: 'hsl(0, 0%, 98%)',
})

// Nuxt Theme
const nuxtTheme = createTheme('#0b0c11', '#ffffff', {
  comment: '#8b949e',
  keyword: '#00dc82',
  string: '#00dc82',
  function: '#00dc82',
  variable: '#ffffff',
  constant: '#ffd43b',
  type: '#00dc82',
  punctuation: '#ffffff',
})

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
  vercel: vercelTheme,
  supabase: supabaseTheme,
  tailwind: tailwindTheme,
  trigger: triggerTheme,
  clerk: clerkTheme,
  mintlify: mintlifyTheme,
  prisma: prismaTheme,
  openai: openaiTheme,
  elevenlabs: elevenLabsTheme,
  resend: resendTheme,
  nuxt: nuxtTheme,
}

export const PreviewWindow = forwardRef<HTMLDivElement, PreviewWindowProps>(
  function PreviewWindow(
    { code, language, theme, background, padding, rounded, showLineNumbers, showWindowControls, windowTitle, insertedImage, onChange, onImageInsert },
    ref
  ) {
    const selectedTheme = themeMap[theme] || themes.vsDark
    const themeBg = selectedTheme.plain?.backgroundColor || '#1e1e1e'
    const isLightTheme = theme === 'vsLight' || theme === 'duotoneLight' || theme === 'materialLight' || theme === 'oneLight'
    const isVercelTheme = theme === 'vercel'
    const isSupabaseTheme = theme === 'supabase'
    const isTailwindTheme = theme === 'tailwind'
    const isTriggerTheme = theme === 'trigger'
    const isClerkTheme = theme === 'clerk'
    const isMintlifyTheme = theme === 'mintlify'
    const isPrismaTheme = theme === 'prisma'
    const isOpenAITheme = theme === 'openai'
    const isElevenLabsTheme = theme === 'elevenlabs'
    const isResendTheme = theme === 'resend'
    const isNuxtTheme = theme === 'nuxt'
    
    // Determine window background based on theme
    let windowBg = isLightTheme ? '#ffffff' : '#1e1e1e'
    if (isVercelTheme) windowBg = '#000000'
    else if (isSupabaseTheme) windowBg = '#171717'
    else if (isTailwindTheme) windowBg = '#1e293b'
    else if (isTriggerTheme) windowBg = '#121317'
    else if (isClerkTheme) windowBg = '#111111'
    else if (isMintlifyTheme) windowBg = '#070a08'
    else if (isPrismaTheme) windowBg = 'hsla(223, 41%, 7%, 75%)'
    else if (isOpenAITheme) windowBg = '#232b41'
    else if (isElevenLabsTheme) windowBg = '#111'
    else if (isResendTheme) windowBg = 'hsla(0, 0%, 0%, 0.88)'
    else if (isNuxtTheme) windowBg = '#0b0c11'
    
    // Determine controls background
    let controlsBg = isLightTheme ? '#f5f5f5' : '#2d2d2d'
    if (isVercelTheme) controlsBg = '#000000'
    else if (isSupabaseTheme) controlsBg = '#1f1f1f'
    else if (isTailwindTheme) controlsBg = '#1e293b'
    else if (isTriggerTheme) controlsBg = '#16181d'
    else if (isClerkTheme) controlsBg = '#191919'
    else if (isMintlifyTheme) controlsBg = '#010201'
    else if (isPrismaTheme) controlsBg = 'hsla(223, 41%, 7%, 75%)'
    else if (isOpenAITheme) controlsBg = '#232b41'
    else if (isElevenLabsTheme) controlsBg = '#111'
    else if (isResendTheme) controlsBg = 'hsla(0, 0%, 0%, 0.9)'
    else if (isNuxtTheme) controlsBg = '#0b0c11'
    
    // Determine border color
    let borderColor = isLightTheme ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)'
    if (isVercelTheme) borderColor = '#1a1a1a'
    else if (isSupabaseTheme) borderColor = '#292929'
    else if (isTailwindTheme) borderColor = 'rgb(255 255 255 / 10%)'
    else if (isTriggerTheme) borderColor = '#272a2e'
    else if (isClerkTheme) borderColor = '#353535'
    else if (isMintlifyTheme) borderColor = '#141818'
    else if (isPrismaTheme) borderColor = 'transparent'
    else if (isOpenAITheme) borderColor = 'rgba(255, 255, 255, 0.1)'
    else if (isElevenLabsTheme) borderColor = '#353535'
    else if (isResendTheme) borderColor = 'hsla(0, 0%, 24%, 0.13)'
    else if (isNuxtTheme) borderColor = 'transparent'

    // Determine background style
    const getBackgroundStyle = () => {
      if (background === 'transparent') {
        return { backgroundColor: 'transparent' }
      } else if (background.startsWith('/')) {
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
          className="shadow-2xl overflow-hidden relative"
          style={{ 
            minWidth: '500px',
            backgroundColor: windowBg,
            borderRadius: rounded ? '0.75rem' : '0',
          }}
        >
          {/* Theme-specific decorations */}
          {(isVercelTheme || isNuxtTheme || isElevenLabsTheme) && (
            <>
              <span 
                className="absolute top-0 bottom-0 left-[-150px] w-[1200px] h-px pointer-events-none"
                style={{ 
                  background: isVercelTheme ? '#1a1a1a' : (isNuxtTheme ? 'transparent' : '#353535'),
                  top: 0,
                }}
              />
              <span 
                className="absolute top-0 bottom-0 left-[-150px] w-[1200px] h-px pointer-events-none"
                style={{ 
                  background: isVercelTheme ? '#1a1a1a' : (isNuxtTheme ? 'transparent' : '#353535'),
                  bottom: 0,
                  top: 'auto',
                }}
              />
              <span 
                className="absolute top-[-150px] bottom-0 left-0 w-px pointer-events-none"
                style={{ 
                  background: isVercelTheme ? '#1a1a1a' : (isNuxtTheme ? 'transparent' : '#353535'),
                  height: 'calc(100% + 300px)',
                }}
              />
              <span 
                className="absolute top-[-150px] bottom-0 right-0 w-px pointer-events-none"
                style={{ 
                  background: isVercelTheme ? '#1a1a1a' : (isNuxtTheme ? 'transparent' : '#353535'),
                  height: 'calc(100% + 300px)',
                }}
              />
              {/* Vercel Brackets */}
              {isVercelTheme && (
                <>
                  <span 
                    className="absolute top-[-12px] left-[-12px] w-[25px] h-[25px] pointer-events-none"
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
                    className="absolute bottom-[-12px] right-[-12px] w-[25px] h-[25px] pointer-events-none"
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
                    color: isVercelTheme ? '#eeeeee' : 
                           isSupabaseTheme ? '#fafafa' :
                           isTailwindTheme ? '#e2e8f0' :
                           isTriggerTheme ? '#b5b8c0' :
                           isClerkTheme ? '#ffffff' :
                           isMintlifyTheme ? '#55d799' :
                           isPrismaTheme ? '#e2e8f0' :
                           isOpenAITheme ? '#ffffff' :
                           isElevenLabsTheme ? '#ffffff' :
                           isResendTheme ? 'hsl(0, 0%, 98%)' :
                           isNuxtTheme ? '#ffffff' :
                           (isLightTheme ? '#666666' : '#cccccc') 
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
                            opacity: (isVercelTheme || isSupabaseTheme || isTailwindTheme || isTriggerTheme || isClerkTheme || isMintlifyTheme || isPrismaTheme || isOpenAITheme || isElevenLabsTheme || isResendTheme || isNuxtTheme) ? 1 : 0.4,
                            color: isVercelTheme ? '#a0a0a0' :
                                   isSupabaseTheme ? '#898989' :
                                   isTailwindTheme ? '#64748b' :
                                   isTriggerTheme ? '#5f6570' :
                                   isClerkTheme ? '#666666' :
                                   isMintlifyTheme ? '#4a5568' :
                                   isPrismaTheme ? '#64748b' :
                                   isOpenAITheme ? 'rgba(255, 255, 255, 0.2)' :
                                   isElevenLabsTheme ? '#666666' :
                                   isResendTheme ? '#666666' :
                                   isNuxtTheme ? '#8b949e' :
                                   (isLightTheme ? '#666666' : '#888888')
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
