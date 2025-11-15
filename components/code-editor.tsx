'use client'

import { useRef, useEffect } from 'react'

interface CodeEditorProps {
  code: string
  language: string
  onChange: (code: string) => void
}

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [code])

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 text-xs text-muted-foreground font-mono">
        {language}
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[600px] p-6 font-mono text-sm bg-transparent text-foreground resize-none focus:outline-none"
        placeholder="Paste or write your code here..."
        spellCheck={false}
      />
    </div>
  )
}
