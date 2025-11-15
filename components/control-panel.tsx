'use client'

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Upload, X, Check } from 'lucide-react'
import { useRef } from 'react'
import * as React from 'react'

interface ControlPanelProps {
  playground: 'code' | 'image'
  language: string
  theme: string
  background: string
  padding: number
  rounded: boolean
  showLineNumbers: boolean
  showWindowControls: boolean
  windowTitle?: string
  insertedImage?: string | null
  onLanguageChange: (value: string) => void
  onThemeChange: (value: string) => void
  onBackgroundChange: (value: string) => void
  onPaddingChange: (value: number) => void
  onRoundedChange: (value: boolean) => void
  onLineNumbersChange: (value: boolean) => void
  onWindowControlsChange: (value: boolean) => void
  onWindowTitleChange?: (value: string) => void
  onImageInsert?: (image: string | null) => void
}

const languages = [
  // Web Technologies
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'jsx', label: 'JSX' },
  { value: 'tsx', label: 'TSX' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'graphql', label: 'GraphQL' },

  // Programming Languages
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'dart', label: 'Dart' },
  { value: 'r', label: 'R' },
  { value: 'matlab', label: 'MATLAB' },
  { value: 'lua', label: 'Lua' },
  { value: 'perl', label: 'Perl' },
  { value: 'haskell', label: 'Haskell' },
  { value: 'clojure', label: 'Clojure' },
  { value: 'elixir', label: 'Elixir' },
  { value: 'erlang', label: 'Erlang' },
  { value: 'fsharp', label: 'F#' },
  { value: 'ocaml', label: 'OCaml' },
  { value: 'julia', label: 'Julia' },
  { value: 'nim', label: 'Nim' },
  { value: 'crystal', label: 'Crystal' },

  // Shell & Scripting
  { value: 'bash', label: 'Bash' },
  { value: 'shell', label: 'Shell' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'zsh', label: 'Zsh' },

  // Database & Query Languages
  { value: 'sql', label: 'SQL' },
  { value: 'plsql', label: 'PL/SQL' },
  { value: 'mongodb', label: 'MongoDB' },

  // Configuration & Data Formats
  { value: 'toml', label: 'TOML' },
  { value: 'ini', label: 'INI' },
  { value: 'properties', label: 'Properties' },
  { value: 'diff', label: 'Diff' },

  // Domain-Specific Languages
  { value: 'docker', label: 'Docker' },
  { value: 'dockerfile', label: 'Dockerfile' },
  { value: 'nginx', label: 'Nginx' },
  { value: 'apache', label: 'Apache' },
  { value: 'makefile', label: 'Makefile' },
  { value: 'vim', label: 'Vim Script' },
  { value: 'regex', label: 'Regex' },

  // Styling & Templates
  { value: 'scss', label: 'SCSS' },
  { value: 'sass', label: 'Sass' },
  { value: 'less', label: 'Less' },
  { value: 'stylus', label: 'Stylus' },

  // Assembly & Low-Level
  { value: 'asm6502', label: '6502 Assembly' },
  { value: 'armasm', label: 'ARM Assembly' },

  // Other
  { value: 'plaintext', label: 'Plain Text' },
]

const themes = [
  { value: 'vercel', label: 'Vercel', category: 'tech' },
  { value: 'supabase', label: 'Supabase', category: 'tech' },
  { value: 'tailwind', label: 'Tailwind', category: 'tech' },
  { value: 'trigger', label: 'Trigger.dev', category: 'tech' },
  { value: 'clerk', label: 'Clerk', category: 'tech' },
  { value: 'mintlify', label: 'Mintlify', category: 'tech' },
  { value: 'prisma', label: 'Prisma', category: 'tech' },
  { value: 'openai', label: 'OpenAI', category: 'tech' },
  { value: 'elevenlabs', label: 'ElevenLabs', category: 'tech' },
  { value: 'resend', label: 'Resend', category: 'tech' },
  { value: 'nuxt', label: 'Nuxt', category: 'tech' },
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
  { value: 'transparent', label: 'Transparent', type: 'color' },
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

const paddingPresets = [
  { value: 16, label: '16px' },
  { value: 32, label: '32px' },
  { value: 48, label: '48px' },
  { value: 64, label: '64px' },
  { value: 80, label: '80px' },
  { value: 96, label: '96px' },
  { value: 112, label: '112px' },
  { value: 128, label: '128px' },
]

// Get sample code for language preview
function getLanguageSampleCode(langValue: string): string {
  const samples: Record<string, string> = {
    javascript: 'function greet() {\n  console.log("Hello!");\n}',
    typescript: 'function greet(): void {\n  console.log("Hello!");\n}',
    jsx: 'function Button() {\n  return <button>Click</button>;\n}',
    tsx: 'function Button(): JSX.Element {\n  return <button>Click</button>;\n}',
    python: 'def greet():\n    print("Hello!")',
    java: 'public void greet() {\n    System.out.println("Hello!");\n}',
    csharp: 'public void Greet() {\n    Console.WriteLine("Hello!");\n}',
    cpp: 'void greet() {\n    std::cout << "Hello!";\n}',
    c: 'void greet() {\n    printf("Hello!");\n}',
    go: 'func greet() {\n    fmt.Println("Hello!")\n}',
    rust: 'fn greet() {\n    println!("Hello!");\n}',
    ruby: 'def greet\n  puts "Hello!"\nend',
    php: 'function greet() {\n    echo "Hello!";\n}',
    swift: 'func greet() {\n    print("Hello!")\n}',
    kotlin: 'fun greet() {\n    println("Hello!")\n}',
    scala: 'def greet(): Unit = {\n    println("Hello!")\n}',
    dart: 'void greet() {\n    print("Hello!");\n}',
    r: 'greet <- function() {\n  print("Hello!")\n}',
    matlab: 'function greet()\n    disp("Hello!");\nend',
    lua: 'function greet()\n    print("Hello!")\nend',
    perl: 'sub greet {\n    print "Hello!";\n}',
    haskell: 'greet = putStrLn "Hello!"',
    clojure: '(defn greet []\n  (println "Hello!"))',
    elixir: 'def greet do\n  IO.puts "Hello!"\nend',
    erlang: 'greet() ->\n    io:format("Hello!~n").',
    fsharp: 'let greet() =\n    printfn "Hello!"',
    ocaml: 'let greet () =\n    print_endline "Hello!"',
    julia: 'function greet()\n    println("Hello!")\nend',
    nim: 'proc greet() =\n    echo "Hello!"',
    crystal: 'def greet\n  puts "Hello!"\nend',
    bash: 'greet() {\n    echo "Hello!"\n}',
    shell: 'greet() {\n    echo "Hello!"\n}',
    powershell: 'function Greet {\n    Write-Host "Hello!"\n}',
    zsh: 'greet() {\n    echo "Hello!"\n}',
    sql: 'SELECT * FROM users\nWHERE id = 1;',
    plsql: 'BEGIN\n    DBMS_OUTPUT.PUT_LINE("Hello!");\nEND;',
    mongodb: 'db.users.find({\n  name: "John"\n})',
    css: '.button {\n  padding: 10px;\n  color: blue;\n}',
    html: '<div class="card">\n  <h1>Hello!</h1>\n</div>',
    scss: '.button {\n  padding: 10px;\n  &:hover { color: red; }\n}',
    sass: '.button\n  padding: 10px\n  &:hover\n    color: red',
    less: '.button {\n  padding: 10px;\n  &:hover { color: red; }\n}',
    stylus: '.button\n  padding 10px\n  &:hover\n    color red',
    json: '{\n  "name": "John",\n  "age": 30\n}',
    xml: '<person>\n  <name>John</name>\n</person>',
    yaml: 'name: John\nage: 30\ncity: NYC',
    markdown: '# Heading\n\nSome **bold** text',
    graphql: 'query {\n  user(id: 1) {\n    name\n  }\n}',
    toml: '[user]\nname = "John"\nage = 30',
    ini: '[user]\nname=John\nage=30',
    properties: 'user.name=John\nuser.age=30',
    diff: '- old code\n+ new code',
    docker: 'FROM node:18\nRUN npm install',
    dockerfile: 'FROM node:18\nRUN npm install',
    nginx: 'server {\n    listen 80;\n    root /var/www;\n}',
    apache: '<VirtualHost *:80>\n    DocumentRoot /var/www\n</VirtualHost>',
    makefile: 'build:\n\tgcc main.c -o app',
    vim: 'function! Greet()\n    echo "Hello!"\nendfunction',
    regex: '^[a-z]+@[a-z]+\\.[a-z]+$',
    asm6502: 'LDA #$01\nSTA $0200',
    armasm: 'MOV R0, #1\nSTR R0, [R1]',
    plaintext: 'Hello, World!\nThis is plain text.',
  }
  return samples[langValue] || '// Code preview'
}

// Get theme preview colors for visual preview
function getThemePreviewColors(themeValue: string) {
  const colorMap: Record<string, { bg: string; text: string; keyword: string; string: string; function: string }> = {
    vercel: { bg: '#000000', text: '#eeeeee', keyword: '#ff4d8d', string: '#00cb50', function: '#c473fc' },
    supabase: { bg: '#171717', text: '#fafafa', keyword: '#ff6b6b', string: '#51cf66', function: '#74c0fc' },
    tailwind: { bg: '#1e293b', text: '#e2e8f0', keyword: '#f472b6', string: '#34d399', function: '#818cf8' },
    trigger: { bg: '#121317', text: '#b5b8c0', keyword: '#ff6b9d', string: '#4ade80', function: '#a78bfa' },
    clerk: { bg: '#191919', text: '#ffffff', keyword: '#ff6b6b', string: '#51cf66', function: '#74c0fc' },
    mintlify: { bg: '#070a08', text: '#55d799', keyword: '#ff6b9d', string: '#55d799', function: '#a78bfa' },
    prisma: { bg: '#0c1d26', text: '#e2e8f0', keyword: '#f472b6', string: '#34d399', function: '#818cf8' },
    openai: { bg: '#232b41', text: '#ffffff', keyword: '#ff6b9d', string: '#4ade80', function: '#a78bfa' },
    elevenlabs: { bg: '#111', text: '#ffffff', keyword: '#ff6b6b', string: '#51cf66', function: '#74c0fc' },
    resend: { bg: '#000000', text: '#ffffff', keyword: '#00fff6', string: '#67ffde', function: '#00fff6' },
    nuxt: { bg: '#0b0c11', text: '#ffffff', keyword: '#00dc82', string: '#00dc82', function: '#00dc82' },
    monokai: { bg: '#272822', text: '#f8f8f2', keyword: '#f92672', string: '#e6db74', function: '#66d9ef' },
    dracula: { bg: '#282a36', text: '#f8f8f2', keyword: '#ff79c6', string: '#f1fa8c', function: '#50fa7b' },
    nightOwl: { bg: '#011627', text: '#d6deeb', keyword: '#c792ea', string: '#addb67', function: '#82aaff' },
    oceanicNext: { bg: '#1b2632', text: '#c0c5ce', keyword: '#c594c5', string: '#99c794', function: '#6699cc' },
    atomDark: { bg: '#272b35', text: '#c5c8c6', keyword: '#c85e7c', string: '#9fca56', function: '#7aa6da' },
    synthwave: { bg: '#2b213a', text: '#f92aad', keyword: '#f97e72', string: '#72f1b8', function: '#fede5d' },
    vsDark: { bg: '#1e1e1e', text: '#d4d4d4', keyword: '#569cd6', string: '#ce9178', function: '#4ec9b0' },
    vscDarkPlus: { bg: '#1e1e1e', text: '#d4d4d4', keyword: '#569cd6', string: '#ce9178', function: '#4ec9b0' },
    duotoneDark: { bg: '#2a2734', text: '#6c6783', keyword: '#ffcc99', string: '#ffb870', function: '#9a86fd' },
    shadesOfPurple: { bg: '#2d2b55', text: '#a599e9', keyword: '#ff79c6', string: '#fad000', function: '#9effff' },
    palenight: { bg: '#292d3e', text: '#a6accd', keyword: '#c792ea', string: '#c3e88d', function: '#82aaff' },
    materialDark: { bg: '#263238', text: '#eeffff', keyword: '#c792ea', string: '#c3e88d', function: '#82aaff' },
    materialOceanic: { bg: '#0f111a', text: '#a6b2c0', keyword: '#c792ea', string: '#c3e88d', function: '#82aaff' },
    nord: { bg: '#2e3440', text: '#d8dee9', keyword: '#81a1c1', string: '#a3be8c', function: '#88c0d0' },
    zTouch: { bg: '#1c1c1c', text: '#d0d0d0', keyword: '#af5f5f', string: '#5f875f', function: '#87875f' },
    pojoaque: { bg: '#181914', text: '#dccf8f', keyword: '#cb7312', string: '#96b38a', function: '#ffb964' },
    github: { bg: '#ffffff', text: '#24292e', keyword: '#d73a49', string: '#032f62', function: '#6f42c1' },
    vsLight: { bg: '#ffffff', text: '#000000', keyword: '#0000ff', string: '#a31515', function: '#795e26' },
    duotoneLight: { bg: '#faf8f5', text: '#6c6783', keyword: '#b29762', string: '#896724', function: '#9a86fd' },
    materialLight: { bg: '#fafafa', text: '#90a4ae', keyword: '#7c4dff', string: '#39adb5', function: '#39adb5' },
    oneLight: { bg: '#fafafa', text: '#383a42', keyword: '#a626a4', string: '#50a14f', function: '#4078f2' },
  }

  return colorMap[themeValue] || { bg: '#1e1e1e', text: '#d4d4d4', keyword: '#569cd6', string: '#ce9178', function: '#4ec9b0' }
}

export function ControlPanel({
  playground,
  language,
  theme,
  background,
  padding,
  rounded,
  showLineNumbers,
  showWindowControls,
  windowTitle,
  insertedImage,
  onLanguageChange,
  onThemeChange,
  onBackgroundChange,
  onPaddingChange,
  onRoundedChange,
  onLineNumbersChange,
  onWindowControlsChange,
  onWindowTitleChange,
  onImageInsert,
}: ControlPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [themePopoverOpen, setThemePopoverOpen] = React.useState(false)
  const [languagePopoverOpen, setLanguagePopoverOpen] = React.useState(false)
  const [backgroundPopoverOpen, setBackgroundPopoverOpen] = React.useState(false)
  return (
    <div className="space-y-6">
      {playground === 'code' && (
        <>
          {/* Language */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Language</Label>
            <Popover open={languagePopoverOpen} onOpenChange={setLanguagePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-9 text-sm font-normal"
                >
                  <span>{languages.find(l => l.value === language)?.label || 'Select language'}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[600px] md:w-[700px] lg:w-[800px] p-0 max-h-[85vh] flex flex-col" align="start">
                <div className="p-3 sm:p-4 border-b bg-muted/30 flex-shrink-0">
                  <div className="text-sm font-semibold">Programming Languages</div>
                  <div className="text-xs text-muted-foreground">Choose your language</div>
                </div>
                <div className="p-3 sm:p-4 overflow-y-auto overflow-x-hidden flex-1 min-h-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
                    {languages.map((lang) => {
                      const sampleCode = getLanguageSampleCode(lang.value)
                      return (
                        <button
                          key={lang.value}
                          onClick={() => {
                            onLanguageChange(lang.value)
                            setLanguagePopoverOpen(false)
                          }}
                          className={`group relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg border transition-all ${language === lang.value
                            ? 'bg-primary/10 border-primary shadow-sm'
                            : 'bg-background border-border hover:bg-accent/50 hover:border-accent-foreground/20'
                            }`}
                        >
                          <div className="relative w-full aspect-video rounded overflow-hidden border border-border/50 bg-[#1e1e1e]">
                            <div className="absolute inset-0 flex flex-col p-1 sm:p-1.5">
                              <div className="flex items-start gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff5f57]" />
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#febc2e]" />
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#28c840]" />
                              </div>
                              <div className="flex-1 flex items-start justify-start overflow-hidden">
                                <pre className="text-[6px] sm:text-[7px] leading-tight font-mono text-[#d4d4d4] whitespace-pre-wrap break-words w-full">
                                  <code>{sampleCode}</code>
                                </pre>
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight">
                            {lang.label}
                          </span>
                          {language === lang.value && (
                            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm z-10">
                              <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Theme</Label>
            <Popover open={themePopoverOpen} onOpenChange={setThemePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-9 text-sm font-normal"
                >
                  <span>{themes.find(t => t.value === theme)?.label || 'Select theme'}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[600px] md:w-[700px] lg:w-[800px] p-0 max-h-[85vh] flex flex-col" align="start">
                <div className="overflow-y-auto flex-1">
                  {/* Light Themes Section */}
                  <div className="p-3 sm:p-4 border-b bg-muted/30 flex-shrink-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="text-sm font-semibold">Light Themes</div>
                        <div className="text-xs text-muted-foreground">Clean and minimal</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 border-b flex-shrink-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
                      {themes.filter(t => t.category === 'light').map((t) => {
                        const themeColors = getThemePreviewColors(t.value)
                        return (
                          <button
                            key={t.value}
                            onClick={() => {
                              onThemeChange(t.value)
                              setThemePopoverOpen(false)
                            }}
                            className={`group relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg border transition-all ${theme === t.value
                              ? 'bg-primary/10 border-primary shadow-sm'
                              : 'bg-background border-border hover:bg-accent/50 hover:border-accent-foreground/20'
                              }`}
                          >
                            <div className="relative w-full aspect-video rounded overflow-hidden border border-border/50 bg-white">
                              <div
                                className="absolute inset-0"
                                style={{ backgroundColor: themeColors.bg }}
                              />
                              <div className="absolute inset-0 flex flex-col p-1 sm:p-1.5">
                                <div className="flex items-start gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff5f57]" />
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#febc2e]" />
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div
                                    className="text-[8px] sm:text-[9px] font-medium leading-tight text-center"
                                    style={{ color: themeColors.text }}
                                  >
                                    {t.label}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight">
                              {t.label}
                            </span>
                            {theme === t.value && (
                              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm z-10">
                                <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Tech Themes Section */}
                  <div className="p-3 sm:p-4 bg-muted/30 flex-shrink-0 border-b">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="text-sm font-semibold">Tech Themes</div>
                        <div className="text-xs text-muted-foreground">Brand-inspired themes</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 border-b flex-shrink-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
                      {themes.filter(t => t.category === 'tech').map((t) => {
                        const themeColors = getThemePreviewColors(t.value)
                        return (
                          <button
                            key={t.value}
                            onClick={() => {
                              onThemeChange(t.value)
                              setThemePopoverOpen(false)
                            }}
                            className={`group relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg border transition-all ${theme === t.value
                              ? 'bg-primary/10 border-primary shadow-sm'
                              : 'bg-background border-border hover:bg-accent/50 hover:border-accent-foreground/20'
                              }`}
                          >
                            <div className="relative w-full aspect-video rounded overflow-hidden border border-border/50 bg-white">
                              <div
                                className="absolute inset-0"
                                style={{ backgroundColor: themeColors.bg }}
                              />
                              <div className="absolute inset-0 flex flex-col p-1 sm:p-1.5">
                                <div className="flex items-start gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff5f57]" />
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#febc2e]" />
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div
                                    className="text-[8px] sm:text-[9px] font-medium leading-tight text-center"
                                    style={{ color: themeColors.text }}
                                  >
                                    {t.label}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight">
                              {t.label}
                            </span>
                            {theme === t.value && (
                              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm z-10">
                                <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Dark Themes Section */}
                  <div className="p-3 sm:p-4 bg-muted/30 flex-shrink-0 border-b">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="text-sm font-semibold">Dark Themes</div>
                        <div className="text-xs text-muted-foreground">Easy on the eyes</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex-shrink-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
                      {themes.filter(t => t.category === 'dark').map((t) => {
                        const themeColors = getThemePreviewColors(t.value)
                        return (
                          <button
                            key={t.value}
                            onClick={() => {
                              onThemeChange(t.value)
                              setThemePopoverOpen(false)
                            }}
                            className={`group relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg border transition-all ${theme === t.value
                              ? 'bg-primary/10 border-primary shadow-sm'
                              : 'bg-background border-border hover:bg-accent/50 hover:border-accent-foreground/20'
                              }`}
                          >
                            <div className="relative w-full aspect-video rounded overflow-hidden border border-border/50 bg-white">
                              <div
                                className="absolute inset-0"
                                style={{ backgroundColor: themeColors.bg }}
                              />
                              <div className="absolute inset-0 flex flex-col p-1 sm:p-1.5">
                                <div className="flex items-start gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff5f57]" />
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#febc2e]" />
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div
                                    className="text-[8px] sm:text-[9px] font-medium leading-tight text-center"
                                    style={{ color: themeColors.text }}
                                  >
                                    {t.label}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight">
                              {t.label}
                            </span>
                            {theme === t.value && (
                              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm z-10">
                                <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}

      {/* Background */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground">Background</Label>
        <Popover open={backgroundPopoverOpen} onOpenChange={setBackgroundPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-9 text-sm font-normal"
            >
              <div className="flex items-center gap-2">
                {(() => {
                  const bg = backgrounds.find(b => b.value === background)
                  if (!bg) return <span>Select background</span>
                  if (bg.type === 'image') {
                    return (
                      <>
                        <img
                          src={bg.value || "/placeholder.svg"}
                          alt={bg.label}
                          className="w-4 h-4 rounded border border-border object-cover"
                        />
                        <span>{bg.label}</span>
                      </>
                    )
                  }
                  if (bg.value === 'transparent') {
                    return (
                      <>
                        <div
                          className="w-4 h-4 rounded border-2 border-dashed border-border"
                          style={{
                            backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                            backgroundSize: '8px 8px',
                            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                          }}
                        />
                        <span>{bg.label}</span>
                      </>
                    )
                  }
                  return (
                    <>
                      <div
                        className="w-4 h-4 rounded border border-border"
                        style={{
                          ...(bg.value.startsWith('linear-gradient') || bg.value.startsWith('radial-gradient')
                            ? { backgroundImage: bg.value }
                            : { backgroundColor: bg.value })
                        }}
                      />
                      <span>{bg.label}</span>
                    </>
                  )
                })()}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[600px] md:w-[700px] lg:w-[800px] p-0 max-h-[85vh] flex flex-col" align="start">
            <div className="p-3 sm:p-4 border-b bg-muted/30 flex-shrink-0">
              <div className="text-sm font-semibold">Backgrounds</div>
              <div className="text-xs text-muted-foreground">Choose a background style</div>
            </div>
            <div className="p-3 sm:p-4 overflow-y-auto flex-1 min-h-0">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-2.5">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => {
                      onBackgroundChange(bg.value)
                      setBackgroundPopoverOpen(false)
                    }}
                    className={`group relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg border transition-all ${background === bg.value
                      ? 'bg-primary/10 border-primary shadow-sm'
                      : 'bg-background border-border hover:bg-accent/50 hover:border-accent-foreground/20'
                      }`}
                  >
                    <div className="relative w-full aspect-video rounded overflow-hidden border border-border/50">
                      {bg.type === 'image' ? (
                        <img
                          src={bg.value || "/placeholder.svg"}
                          alt={bg.label}
                          className="w-full h-full object-cover"
                        />
                      ) : bg.value === 'transparent' ? (
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                            backgroundSize: '8px 8px',
                            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                          }}
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{
                            ...(bg.value.startsWith('linear-gradient') || bg.value.startsWith('radial-gradient')
                              ? { backgroundImage: bg.value }
                              : { backgroundColor: bg.value })
                          }}
                        />
                      )}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-medium text-center leading-tight">
                      {bg.label}
                    </span>
                    {background === bg.value && (
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm z-10">
                        <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Padding */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-muted-foreground">Padding</Label>
          <span className="text-xs text-muted-foreground">{padding}px</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {paddingPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onPaddingChange(preset.value)}
              className={`px-2 py-1.5 text-xs rounded-md border transition-colors ${padding === preset.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border hover:bg-accent'
                }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <Slider
          value={[padding]}
          onValueChange={([value]) => onPaddingChange(value)}
          min={16}
          max={128}
          step={8}
          className="py-1"
        />
        <div className="text-xs text-muted-foreground pt-1">
          💡 Drag handles on preview to adjust padding
        </div>
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
            {onWindowTitleChange && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Window Title</Label>
                <Input
                  value={windowTitle || ''}
                  onChange={(e) => onWindowTitleChange(e.target.value)}
                  placeholder="e.g., app.js"
                  className="h-9 text-sm"
                />
              </div>
            )}

            {onImageInsert && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Insert Image</Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => onImageInsert(null)}
                    disabled={!insertedImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file && file.type.startsWith('image/')) {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        const result = event.target?.result as string
                        if (result) {
                          onImageInsert(result)
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="hidden"
                />
              </div>
            )}

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
