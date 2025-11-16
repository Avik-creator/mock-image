/**
 * Nuxt Theme Configuration
 * Custom theme matching Nuxt's brand colors and styling
 */
export const nuxtTheme = {
  plain: {
    color: '#ffffff',
    backgroundColor: '#0b0c11',
  },
  styles: [
    {
      types: ['comment', 'punctuation.definition.comment'],
      style: {
        color: '#8b949e',
      },
    },
    {
      types: ['keyword', 'storage.modifier', 'storage.type', 'keyword.control', 'keyword.operator', 'keyword.other', 'keyword.other.important'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['operator', 'punctuation.definition.operator'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['string', 'string.quoted', 'punctuation.definition.string.begin', 'punctuation.definition.string.end', 'string.regexp', 'string.interpolated', 'string.template'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['regex', 'regex-source', 'regex-flags'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['interpolation', 'interpolation-punctuation', 'template-string'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['entity.name.function', 'support.function', 'meta.function-call', 'function'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['builtin', 'support.class'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['class-name', 'entity.name.class', 'entity.name.type.class'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['support.type.primitive', 'support.type', 'support.type.builtin', 'entity.name.type.primitive'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['entity.name.type', 'entity.name.type.tsx', 'meta.type.annotation.tsx', 'meta.var-single-variable.expr.tsx', 'entity.name.type.alias', 'entity.name.type.class', 'entity.name.type.interface'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['meta.type', 'meta.type.annotation'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['variable', 'variable.other.readwrite', 'variable.other.readwrite.alias', 'variable.parameter', 'variable.other.property', 'support.variable.property', 'parameter'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['property', 'variable.other.property', 'entity.name.tag.attribute'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['constant.numeric', 'constant.numeric.decimal', 'number', 'number.hex', 'number.binary', 'number.octal', 'number.float', 'number.integer'],
      style: {
        color: '#ffd43b',
      },
    },
    {
      types: ['constant.language'],
      style: {
        color: '#ffd43b',
      },
    },
    {
      types: ['constant.character', 'char'],
      style: {
        color: '#ffd43b',
      },
    },
    {
      types: ['constant.language.boolean', 'boolean'],
      style: {
        color: '#ffd43b',
      },
    },
    {
      types: ['constant.language.null', 'null'],
      style: {
        color: '#ffd43b',
      },
    },
    {
      types: ['constant.language.undefined', 'undefined'],
      style: {
        color: '#ffd43b',
      },
    },
    {
      types: ['variable.language.this'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['variable.other.constant'],
      style: {
        color: '#ffd43b',
      },
    },
    {
      types: ['variable.other.object'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['entity.name.tag'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['support.class.component'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['entity.other.attribute-name', 'attr-name'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['attr-value', 'string.attribute-value'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['namespace', 'entity.name.namespace'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['decorator', 'punctuation.decorator'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['module', 'entity.name.module'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['import', 'keyword.control.import', 'entity.name.import'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['export', 'keyword.control.export', 'entity.name.export'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['symbol', 'entity.name.symbol'],
      style: {
        color: '#ffd43b',
      },
    },
    {
      types: ['punctuation', 'meta.brace', 'punctuation.definition.tag.begin', 'punctuation.definition.tag.end', 'punctuation.definition.tag', 'punctuation.separator', 'punctuation.terminator'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['markup.underline.link', 'string.other.link'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['markup.bold'],
      style: {
        color: '#00dc82',
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
        color: '#00dc82',
        fontWeight: 'bold',
      },
    },
    {
      types: ['invalid', 'invalid.illegal'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['prolog', 'doctype', 'cdata'],
      style: {
        color: '#8b949e',
      },
    },
    {
      types: ['entity', 'entity.name'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['atrule', 'rule'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['selector', 'selector.class', 'selector.id', 'selector.attribute'],
      style: {
        color: '#00dc82',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#00dc82',
        fontWeight: 'bold',
      },
    },
  ],
}

