/**
 * Supabase Theme Configuration
 * Custom theme matching Supabase's brand colors and styling
 */
export const supabaseTheme = {
  plain: {
    color: '#fafafa',
    backgroundColor: '#171717',
  },
  styles: [
    {
      types: ['comment', 'punctuation.definition.comment'],
      style: {
        color: '#898989',
      },
    },
    {
      types: ['keyword', 'storage.modifier', 'storage.type', 'keyword.control', 'keyword.operator', 'keyword.other', 'keyword.other.important'],
      style: {
        color: '#ff6b6b',
      },
    },
    {
      types: ['operator', 'punctuation.definition.operator'],
      style: {
        color: '#ff6b6b',
      },
    },
    {
      types: ['string', 'string.quoted', 'punctuation.definition.string.begin', 'punctuation.definition.string.end', 'string.regexp', 'string.interpolated', 'string.template'],
      style: {
        color: '#51cf66',
      },
    },
    {
      types: ['regex', 'regex-source', 'regex-flags'],
      style: {
        color: '#51cf66',
      },
    },
    {
      types: ['interpolation', 'interpolation-punctuation', 'template-string'],
      style: {
        color: '#51cf66',
      },
    },
    {
      types: ['entity.name.function', 'support.function', 'meta.function-call', 'function'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['builtin', 'support.class'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['class-name', 'entity.name.class', 'entity.name.type.class'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['support.type.primitive', 'support.type', 'support.type.builtin', 'entity.name.type.primitive'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['entity.name.type', 'entity.name.type.tsx', 'meta.type.annotation.tsx', 'meta.var-single-variable.expr.tsx', 'entity.name.type.alias', 'entity.name.type.class', 'entity.name.type.interface'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['meta.type', 'meta.type.annotation'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['variable', 'variable.other.readwrite', 'variable.other.readwrite.alias', 'variable.parameter', 'variable.other.property', 'support.variable.property', 'parameter'],
      style: {
        color: '#fafafa',
      },
    },
    {
      types: ['property', 'variable.other.property', 'entity.name.tag.attribute'],
      style: {
        color: '#fafafa',
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
        color: '#ff6b6b',
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
        color: '#74c0fc',
      },
    },
    {
      types: ['entity.name.tag'],
      style: {
        color: '#51cf66',
      },
    },
    {
      types: ['support.class.component'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['entity.other.attribute-name', 'attr-name'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['attr-value', 'string.attribute-value'],
      style: {
        color: '#51cf66',
      },
    },
    {
      types: ['namespace', 'entity.name.namespace'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['decorator', 'punctuation.decorator'],
      style: {
        color: '#ff6b6b',
      },
    },
    {
      types: ['module', 'entity.name.module'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['import', 'keyword.control.import', 'entity.name.import'],
      style: {
        color: '#ff6b6b',
      },
    },
    {
      types: ['export', 'keyword.control.export', 'entity.name.export'],
      style: {
        color: '#ff6b6b',
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
        color: '#fafafa',
      },
    },
    {
      types: ['markup.underline.link', 'string.other.link'],
      style: {
        color: '#51cf66',
      },
    },
    {
      types: ['markup.bold'],
      style: {
        color: '#ff6b6b',
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
        color: '#74c0fc',
        fontWeight: 'bold',
      },
    },
    {
      types: ['invalid', 'invalid.illegal'],
      style: {
        color: '#ff6b6b',
      },
    },
    {
      types: ['prolog', 'doctype', 'cdata'],
      style: {
        color: '#898989',
      },
    },
    {
      types: ['entity', 'entity.name'],
      style: {
        color: '#51cf66',
      },
    },
    {
      types: ['atrule', 'rule'],
      style: {
        color: '#ff6b6b',
      },
    },
    {
      types: ['selector', 'selector.class', 'selector.id', 'selector.attribute'],
      style: {
        color: '#74c0fc',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#ff6b6b',
        fontWeight: 'bold',
      },
    },
  ],
}

