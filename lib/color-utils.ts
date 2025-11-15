export function oklchToRgba(oklch: string): string {
  // Parse oklch format: oklch(L C H / A) or oklch(L C H)
  const match = oklch.match(/oklch$$([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?$$/)
  
  if (!match) return 'rgba(0, 0, 0, 1)'
  
  const l = parseFloat(match[1])
  const c = parseFloat(match[2])
  const h = parseFloat(match[3])
  const alpha = match[4] ? parseFloat(match[4]) : 1
  
  // Convert OKLCH to linear sRGB
  // This is a simplified conversion - for production, use a proper color library
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)
  
  // Convert OKLab to linear RGB (simplified)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b
  
  const l3 = l_ * l_ * l_
  const m3 = m_ * m_ * m_
  const s3 = s_ * s_ * s_
  
  let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  let bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3
  
  // Clamp and convert to 0-255 range
  r = Math.max(0, Math.min(1, r))
  g = Math.max(0, Math.min(1, g))
  bl = Math.max(0, Math.min(1, bl))
  
  // Apply gamma correction
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1/2.4) - 0.055 : 12.92 * r
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1/2.4) - 0.055 : 12.92 * g
  bl = bl > 0.0031308 ? 1.055 * Math.pow(bl, 1/2.4) - 0.055 : 12.92 * bl
  
  const red = Math.round(r * 255)
  const green = Math.round(g * 255)
  const blue = Math.round(bl * 255)
  
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export function convertCssVarsToRgba(element: HTMLElement): void {
  // Get computed styles
  const computedStyle = window.getComputedStyle(element)
  
  // Convert all oklch CSS variables to rgba
  const root = document.documentElement
  const rootStyles = window.getComputedStyle(root)
  
  // Create a temporary style element to override colors
  const styleEl = document.createElement('style')
  styleEl.id = 'html2canvas-color-fix'
  
  let cssRules = ''
  
  // Convert all oklch colors to rgba
  for (let i = 0; i < rootStyles.length; i++) {
    const prop = rootStyles[i]
    if (prop.startsWith('--')) {
      const value = rootStyles.getPropertyValue(prop).trim()
      if (value.startsWith('oklch')) {
        const rgba = oklchToRgba(value)
        cssRules += `${prop}: ${rgba};\n`
      }
    }
  }
  
  if (cssRules) {
    styleEl.textContent = `:root { ${cssRules} }`
    document.head.appendChild(styleEl)
  }
}

export function removeColorFix(): void {
  const styleEl = document.getElementById('html2canvas-color-fix')
  if (styleEl) {
    styleEl.remove()
  }
}
