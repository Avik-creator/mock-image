/**
 * Vercel Theme Configuration
 * Custom theme matching Vercel's brand colors and styling
 */
export const vercelTheme = {
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
      types: ['keyword', 'storage.modifier', 'storage.type', 'keyword.control', 'keyword.operator', 'keyword.other', 'keyword.other.important'],
      style: {
        color: '#ff4d8d',
      },
    },
    {
      types: ['operator', 'punctuation.definition.operator'],
      style: {
        color: '#ff4d8d',
      },
    },
    {
      types: ['string', 'string.quoted', 'punctuation.definition.string.begin', 'punctuation.definition.string.end', 'string.regexp', 'string.interpolated', 'string.template'],
      style: {
        color: '#00cb50',
      },
    },
    {
      types: ['regex', 'regex-source', 'regex-flags'],
      style: {
        color: '#00cb50',
      },
    },
    {
      types: ['interpolation', 'interpolation-punctuation', 'template-string'],
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
      types: ['constant.numeric', 'constant.numeric.decimal', 'number', 'number.hex', 'number.binary', 'number.octal', 'number.float', 'number.integer'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['constant.language.boolean', 'boolean'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['constant.language.null', 'null'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['constant.language.undefined', 'undefined'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['constant.language'],
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
      types: ['variable', 'variable.other.readwrite', 'variable.other.readwrite.alias', 'variable.parameter', 'variable.other.property', 'support.variable.property', 'parameter'],
      style: {
        color: '#eeeeee',
      },
    },
    {
      types: ['property', 'variable.other.property', 'entity.name.tag.attribute'],
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
      types: ['entity.name.function', 'support.function', 'meta.function-call', 'function'],
      style: {
        color: '#c473fc',
      },
    },
    {
      types: ['builtin', 'support.class'],
      style: {
        color: '#c473fc',
      },
    },
    {
      types: ['class-name', 'entity.name.class', 'entity.name.type.class'],
      style: {
        color: '#C473FC',
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
      types: ['entity.other.attribute-name', 'attr-name'],
      style: {
        color: '#c473fc',
      },
    },
    {
      types: ['attr-value', 'string.attribute-value'],
      style: {
        color: '#00cb50',
      },
    },
    {
      types: ['namespace', 'entity.name.namespace'],
      style: {
        color: '#47a8ff',
      },
    },
    {
      types: ['decorator', 'punctuation.decorator'],
      style: {
        color: '#ff4d8d',
      },
    },
    {
      types: ['module', 'entity.name.module'],
      style: {
        color: '#47a8ff',
      },
    },
    {
      types: ['import', 'keyword.control.import', 'entity.name.import'],
      style: {
        color: '#ff4d8d',
      },
    },
    {
      types: ['export', 'keyword.control.export', 'entity.name.export'],
      style: {
        color: '#ff4d8d',
      },
    },
    {
      types: ['symbol', 'entity.name.symbol'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['punctuation', 'meta.brace', 'punctuation.definition.tag.begin', 'punctuation.definition.tag.end', 'punctuation.definition.tag', 'punctuation.separator', 'punctuation.terminator'],
      style: {
        color: '#eeeeee',
      },
    },
    {
      types: ['support.type.primitive', 'support.type', 'support.type.builtin', 'entity.name.type.primitive'],
      style: {
        color: '#47a8ff',
      },
    },
    {
      types: ['entity.name.type', 'entity.name.type.tsx', 'meta.type.annotation.tsx', 'meta.var-single-variable.expr.tsx', 'entity.name.type.alias', 'entity.name.type.class', 'entity.name.type.interface'],
      style: {
        color: '#C473FC',
      },
    },
    {
      types: ['meta.type', 'meta.type.annotation'],
      style: {
        color: '#47a8ff',
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
    {
      types: ['prolog', 'doctype', 'cdata'],
      style: {
        color: '#a0a0a0',
      },
    },
    {
      types: ['entity', 'entity.name'],
      style: {
        color: '#00cb50',
      },
    },
    {
      types: ['atrule', 'rule'],
      style: {
        color: '#ff4d8d',
      },
    },
    {
      types: ['selector', 'selector.class', 'selector.id', 'selector.attribute'],
      style: {
        color: '#c473fc',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#ff4d8d',
        fontWeight: 'bold',
      },
    },
  ],
}

