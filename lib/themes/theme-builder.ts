import type { ThemeColors } from './types'

/**
 * Helper function to create a theme with common structure
 * This function generates a Prism theme object with comprehensive token type coverage
 */
export function createTheme(bg: string, fg: string, colors: ThemeColors) {
  return {
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
        types: ['keyword', 'storage.modifier', 'storage.type', 'keyword.control', 'keyword.operator', 'keyword.other', 'keyword.other.important'],
        style: { color: colors.keyword || '#d73a49' },
      },
      {
        types: ['operator', 'punctuation.definition.operator'],
        style: { color: colors.operator || colors.keyword || '#d73a49' },
      },
      {
        types: ['string', 'string.quoted', 'punctuation.definition.string.begin', 'punctuation.definition.string.end', 'string.regexp', 'string.interpolated', 'string.other.link', 'string.template'],
        style: { color: colors.string || '#032f62' },
      },
      {
        types: ['regex', 'regex-source', 'regex-flags'],
        style: { color: colors.regex || colors.string || '#032f62' },
      },
      {
        types: ['interpolation', 'interpolation-punctuation', 'template-string'],
        style: { color: colors.interpolation || colors.string || '#032f62' },
      },
      {
        types: ['entity.name.function', 'support.function', 'meta.function-call', 'function'],
        style: { color: colors.function || '#6f42c1' },
      },
      {
        types: ['builtin', 'support.class'],
        style: { color: colors.builtin || colors.function || '#6f42c1' },
      },
      {
        types: ['class-name', 'entity.name.class', 'entity.name.type.class'],
        style: { color: colors.className || colors.type || '#005cc5' },
      },
      {
        types: ['support.type.primitive', 'support.type', 'support.type.builtin', 'entity.name.type.primitive'],
        style: { color: colors.type || '#005cc5' },
      },
      {
        types: ['entity.name.type', 'entity.name.type.tsx', 'meta.type.annotation.tsx', 'meta.var-single-variable.expr.tsx', 'entity.name.type.alias', 'entity.name.type.class', 'entity.name.type.interface'],
        style: { color: colors.typeAnnotation || colors.type || '#005cc5' },
      },
      {
        types: ['meta.type', 'meta.type.annotation'],
        style: { color: colors.type || '#005cc5' },
      },
      {
        types: ['variable', 'variable.other.readwrite', 'variable.other.readwrite.alias', 'variable.parameter', 'variable.other.property', 'support.variable.property', 'parameter'],
        style: { color: colors.variable || fg },
      },
      {
        types: ['property', 'variable.other.property', 'entity.name.tag.attribute'],
        style: { color: colors.property || colors.variable || fg },
      },
      {
        types: ['constant.numeric', 'constant.numeric.decimal', 'number', 'number.hex', 'number.binary', 'number.octal', 'number.float', 'number.integer'],
        style: { color: colors.number || colors.constant || '#005cc5' },
      },
      {
        types: ['constant.language'],
        style: { color: colors.constant || '#005cc5' },
      },
      {
        types: ['constant.character', 'char'],
        style: { color: colors.character || colors.constant || '#005cc5' },
      },
      {
        types: ['constant.language.boolean', 'boolean'],
        style: { color: colors.boolean || colors.constant || '#005cc5' },
      },
      {
        types: ['constant.language.null', 'null'],
        style: { color: colors.null || colors.constant || '#005cc5' },
      },
      {
        types: ['constant.language.undefined', 'undefined'],
        style: { color: colors.undefined || colors.constant || '#005cc5' },
      },
      {
        types: ['variable.language.this'],
        style: { color: colors.this || colors.keyword || '#d73a49' },
      },
      {
        types: ['variable.other.constant'],
        style: { color: colors.constantVariable || colors.constant || '#005cc5' },
      },
      {
        types: ['variable.other.object'],
        style: { color: colors.objectProperty || colors.variable || fg },
      },
      {
        types: ['entity.name.tag'],
        style: { color: colors.tag || colors.string || '#032f62' },
      },
      {
        types: ['support.class.component'],
        style: { color: colors.component || colors.type || '#005cc5' },
      },
      {
        types: ['entity.other.attribute-name', 'attr-name'],
        style: { color: colors.attribute || colors.function || '#6f42c1' },
      },
      {
        types: ['attr-value', 'string.attribute-value'],
        style: { color: colors.string || '#032f62' },
      },
      {
        types: ['namespace', 'entity.name.namespace'],
        style: { color: colors.namespace || colors.type || '#005cc5' },
      },
      {
        types: ['decorator', 'punctuation.decorator'],
        style: { color: colors.decorator || colors.keyword || '#d73a49' },
      },
      {
        types: ['module', 'entity.name.module'],
        style: { color: colors.module || colors.type || '#005cc5' },
      },
      {
        types: ['import', 'keyword.control.import', 'entity.name.import'],
        style: { color: colors.import || colors.keyword || '#d73a49' },
      },
      {
        types: ['export', 'keyword.control.export', 'entity.name.export'],
        style: { color: colors.export || colors.keyword || '#d73a49' },
      },
      {
        types: ['symbol', 'entity.name.symbol'],
        style: { color: colors.symbol || colors.constant || '#005cc5' },
      },
      {
        types: ['punctuation', 'meta.brace', 'punctuation.definition.tag.begin', 'punctuation.definition.tag.end', 'punctuation.definition.tag', 'punctuation.separator', 'punctuation.terminator'],
        style: { color: colors.punctuation || fg },
      },
      {
        types: ['markup.underline.link'],
        style: { color: colors.link || colors.string || '#032f62' },
      },
      {
        types: ['markup.bold'],
        style: { 
          color: colors.bold || colors.keyword || '#d73a49',
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
          color: colors.heading || colors.function || '#6f42c1',
          fontWeight: 'bold',
        },
      },
      {
        types: ['invalid', 'invalid.illegal'],
        style: { color: colors.invalid || '#ff0000' },
      },
      {
        types: ['prolog', 'doctype', 'cdata'],
        style: { color: colors.comment || '#6a737d' },
      },
      {
        types: ['entity', 'entity.name'],
        style: { color: colors.string || '#032f62' },
      },
      {
        types: ['atrule', 'rule'],
        style: { color: colors.keyword || '#d73a49' },
      },
      {
        types: ['selector', 'selector.class', 'selector.id', 'selector.attribute'],
        style: { color: colors.function || '#6f42c1' },
      },
      {
        types: ['important'],
        style: { 
          color: colors.keyword || '#d73a49',
          fontWeight: 'bold',
        },
      },
    ],
  }
}

