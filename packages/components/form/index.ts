import { withInstall } from '@zquare/utils'
import Form from './src/form.vue'

import type { SFCWithInstall } from '@zquare/utils'

export const ZForm: SFCWithInstall<typeof Form> = withInstall(Form)
export default ZForm

export * from './src/constants'
export * from './src/form'
export * from './src/hooks'
export type { FormInstance } from './src/instance'
