/**
 * Tailwind Theme Configuration
 * Custom theme matching Tailwind CSS's brand colors and styling
 */
export const tailwindTheme = {
  plain: {
    color: '#e2e8f0',
    backgroundColor: '#1e293b',
  },
  styles: [
    {
      types: ['comment', 'punctuation.definition.comment'],
      style: {
        color: '#64748b',
      },
    },
    {
      types: ['keyword', 'storage.modifier', 'storage.type', 'keyword.control', 'keyword.operator', 'keyword.other', 'keyword.other.important'],
      style: {
        color: '#f472b6',
      },
    },
    {
      types: ['operator', 'punctuation.definition.operator'],
      style: {
        color: '#f472b6',
      },
    },
    {
      types: ['string', 'string.quoted', 'punctuation.definition.string.begin', 'punctuation.definition.string.end', 'string.regexp', 'string.interpolated', 'string.template'],
      style: {
        color: '#34d399',
      },
    },
    {
      types: ['regex', 'regex-source', 'regex-flags'],
      style: {
        color: '#34d399',
      },
    },
    {
      types: ['interpolation', 'interpolation-punctuation', 'template-string'],
      style: {
        color: '#34d399',
      },
    },
    {
      types: ['entity.name.function', 'support.function', 'meta.function-call', 'function'],
      style: {
        color: '#818cf8',
      },
    },
    {
      types: ['builtin', 'support.class'],
      style: {
        color: '#818cf8',
      },
    },
    {
      types: ['class-name', 'entity.name.class', 'entity.name.type.class'],
      style: {
        color: '#60a5fa',
      },
    },
    {
      types: ['support.type.primitive', 'support.type', 'support.type.builtin', 'entity.name.type.primitive'],
      style: {
        color: '#60a5fa',
      },
    },
    {
      types: ['entity.name.type', 'entity.name.type.tsx', 'meta.type.annotation.tsx', 'meta.var-single-variable.expr.tsx', 'entity.name.type.alias', 'entity.name.type.class', 'entity.name.type.interface'],
      style: {
        color: '#60a5fa',
      },
    },
    {
      types: ['meta.type', 'meta.type.annotation'],
      style: {
        color: '#60a5fa',
      },
    },
    {
      types: ['variable', 'variable.other.readwrite', 'variable.other.readwrite.alias', 'variable.parameter', 'variable.other.property', 'support.variable.property', 'parameter'],
      style: {
        color: '#e2e8f0',
      },
    },
    {
      types: ['property', 'variable.other.property', 'entity.name.tag.attribute'],
      style: {
        color: '#e2e8f0',
      },
    },
    {
      types: ['constant.numeric', 'constant.numeric.decimal', 'number', 'number.hex', 'number.binary', 'number.octal', 'number.float', 'number.integer'],
      style: {
        color: '#fbbf24',
      },
    },
    {
      types: ['constant.language'],
      style: {
        color: '#fbbf24',
      },
    },
    {
      types: ['constant.character', 'char'],
      style: {
        color: '#fbbf24',
      },
    },
    {
      types: ['constant.language.boolean', 'boolean'],
      style: {
        color: '#fbbf24',
      },
    },
    {
      types: ['constant.language.null', 'null'],
      style: {
        color: '#fbbf24',
      },
    },
    {
      types: ['constant.language.undefined', 'undefined'],
      style: {
        color: '#fbbf24',
      },
    },
    {
      types: ['variable.language.this'],
      style: {
        color: '#f472b6',
      },
    },
    {
      types: ['variable.other.constant'],
      style: {
        color: '#fbbf24',
      },
    },
    {
      types: ['variable.other.object'],
      style: {
        color: '#818cf8',
      },
    },
    {
      types: ['entity.name.tag'],
      style: {
        color: '#34d399',
      },
    },
    {
      types: ['support.class.component'],
      style: {
        color: '#60a5fa',
      },
    },
    {
      types: ['entity.other.attribute-name', 'attr-name'],
      style: {
        color: '#818cf8',
      },
    },
    {
      types: ['attr-value', 'string.attribute-value'],
      style: {
        color: '#34d399',
      },
    },
    {
      types: ['namespace', 'entity.name.namespace'],
      style: {
        color: '#60a5fa',
      },
    },
    {
      types: ['decorator', 'punctuation.decorator'],
      style: {
        color: '#f472b6',
      },
    },
    {
      types: ['module', 'entity.name.module'],
      style: {
        color: '#60a5fa',
      },
    },
    {
      types: ['import', 'keyword.control.import', 'entity.name.import'],
      style: {
        color: '#f472b6',
      },
    },
    {
      types: ['export', 'keyword.control.export', 'entity.name.export'],
      style: {
        color: '#f472b6',
      },
    },
    {
      types: ['symbol', 'entity.name.symbol'],
      style: {
        color: '#fbbf24',
      },
    },
    {
      types: ['punctuation', 'meta.brace', 'punctuation.definition.tag.begin', 'punctuation.definition.tag.end', 'punctuation.definition.tag', 'punctuation.separator', 'punctuation.terminator'],
      style: {
        color: '#e2e8f0',
      },
    },
    {
      types: ['markup.underline.link', 'string.other.link'],
      style: {
        color: '#34d399',
      },
    },
    {
      types: ['markup.bold'],
      style: {
        color: '#f472b6',
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
        color: '#818cf8',
        fontWeight: 'bold',
      },
    },
    {
      types: ['invalid', 'invalid.illegal'],
      style: {
        color: '#f472b6',
      },
    },
    {
      types: ['prolog', 'doctype', 'cdata'],
      style: {
        color: '#64748b',
      },
    },
    {
      types: ['entity', 'entity.name'],
      style: {
        color: '#34d399',
      },
    },
    {
      types: ['atrule', 'rule'],
      style: {
        color: '#f472b6',
      },
    },
    {
      types: ['selector', 'selector.class', 'selector.id', 'selector.attribute'],
      style: {
        color: '#818cf8',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#f472b6',
        fontWeight: 'bold',
      },
    },
  ],
}

