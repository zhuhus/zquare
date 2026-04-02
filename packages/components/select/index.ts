import { withInstall } from '@zquare/utils'
import Select from './src/select.vue'
import type { SFCWithInstall } from '@zquare/utils'

export const ZSelect: SFCWithInstall<typeof Select> = withInstall(Select)
export default ZSelect

export * from './src/select'
export type { SelectInstance } from './src/instance'
