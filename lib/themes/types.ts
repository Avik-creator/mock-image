export interface ThemeColors {
  comment?: string
  keyword?: string
  string?: string
  function?: string
  variable?: string
  constant?: string
  type?: string
  punctuation?: string
  character?: string
  this?: string
  constantVariable?: string
  objectProperty?: string
  tag?: string
  component?: string
  attribute?: string
  typeAnnotation?: string
  link?: string
  bold?: string
  heading?: string
  invalid?: string
  builtin?: string
  className?: string
  property?: string
  namespace?: string
  regex?: string
  symbol?: string
  operator?: string
  number?: string
  boolean?: string
  null?: string
  undefined?: string
  decorator?: string
  module?: string
  import?: string
  export?: string
  interpolation?: string
}

export interface ThemeConfig {
  bg: string
  fg: string
  colors: ThemeColors
}

