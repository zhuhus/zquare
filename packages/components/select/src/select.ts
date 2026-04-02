import { buildProps } from '@zquare/utils'

import type { ExtractPropTypes, __ExtractPublicPropTypes } from 'vue'

export const selectProps = buildProps({} as const)
export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectPropsPublic = __ExtractPublicPropTypes<typeof selectProps>

export const selectEmits = {}
export type SelectEmits = typeof selectEmits
