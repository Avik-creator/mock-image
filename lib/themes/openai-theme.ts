/**
 * OpenAI Theme Configuration
 * Custom theme matching OpenAI's brand colors and styling
 */
export const openaiTheme = {
  plain: {
    color: '#ffffff',
    backgroundColor: '#232b41',
  },
  styles: [
    {
      types: ['comment', 'punctuation.definition.comment'],
      style: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
    },
    {
      types: ['keyword', 'storage.modifier', 'storage.type', 'keyword.control', 'keyword.operator', 'keyword.other', 'keyword.other.important'],
      style: {
        color: '#ff6b9d',
      },
    },
    {
      types: ['operator', 'punctuation.definition.operator'],
      style: {
        color: '#ff6b9d',
      },
    },
    {
      types: ['string', 'string.quoted', 'punctuation.definition.string.begin', 'punctuation.definition.string.end', 'string.regexp', 'string.interpolated', 'string.template'],
      style: {
        color: '#4ade80',
      },
    },
    {
      types: ['regex', 'regex-source', 'regex-flags'],
      style: {
        color: '#4ade80',
      },
    },
    {
      types: ['interpolation', 'interpolation-punctuation', 'template-string'],
      style: {
        color: '#4ade80',
      },
    },
    {
      types: ['entity.name.function', 'support.function', 'meta.function-call', 'function'],
      style: {
        color: '#a78bfa',
      },
    },
    {
      types: ['builtin', 'support.class'],
      style: {
        color: '#a78bfa',
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
        color: '#ff6b9d',
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
        color: '#a78bfa',
      },
    },
    {
      types: ['entity.name.tag'],
      style: {
        color: '#4ade80',
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
        color: '#a78bfa',
      },
    },
    {
      types: ['attr-value', 'string.attribute-value'],
      style: {
        color: '#4ade80',
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
        color: '#ff6b9d',
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
        color: '#ff6b9d',
      },
    },
    {
      types: ['export', 'keyword.control.export', 'entity.name.export'],
      style: {
        color: '#ff6b9d',
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
        color: '#ffffff',
      },
    },
    {
      types: ['markup.underline.link', 'string.other.link'],
      style: {
        color: '#4ade80',
      },
    },
    {
      types: ['markup.bold'],
      style: {
        color: '#ff6b9d',
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
        color: '#a78bfa',
        fontWeight: 'bold',
      },
    },
    {
      types: ['invalid', 'invalid.illegal'],
      style: {
        color: '#ff6b9d',
      },
    },
    {
      types: ['prolog', 'doctype', 'cdata'],
      style: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
    },
    {
      types: ['entity', 'entity.name'],
      style: {
        color: '#4ade80',
      },
    },
    {
      types: ['atrule', 'rule'],
      style: {
        color: '#ff6b9d',
      },
    },
    {
      types: ['selector', 'selector.class', 'selector.id', 'selector.attribute'],
      style: {
        color: '#a78bfa',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#ff6b9d',
        fontWeight: 'bold',
      },
    },
  ],
}

