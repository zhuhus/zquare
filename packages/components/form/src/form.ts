import { buildProps, definePropType } from '@zquare/utils'
import { componentSizes } from '@zquare/constants'

import type { ExtractPropTypes, __ExtractPublicPropTypes } from 'vue'
import type { FormRules } from './types'

export const formMetaProps = buildProps({
  size: {
    type: String,
    values: componentSizes,
  },
  disabled: Boolean,
} as const)

export const formProps = buildProps({
  ...formMetaProps,
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object),
  },

  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: 'right',
  },

  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },

  labelWidth: {
    type: [String, Number],
    default: '',
  },

  labelSuffix: {
    type: String,
    default: '',
  },

  inline: Boolean,

  inlineMessage: Boolean,

  statusIcon: Boolean,

  showMessage: {
    type: Boolean,
    default: true,
  },

  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },

  hideRequiredAsterisk: Boolean,

  scrollToError: Boolean,

  scrollIntoViewOptions: {
    type: definePropType<ScrollIntoViewOptions | boolean>([Object, Boolean]),
    default: true,
  },
} as const)

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormPropsPublic = __ExtractPublicPropTypes<typeof formProps>

export const formEmits = {}
export type FormEmits = typeof formEmits
