import { withInstall } from '@zquare/utils'
import Tooltip from './src/tooltip.vue'

import type { SFCWithInstall } from '@zquare/utils'

export const ZTooltip: SFCWithInstall<typeof Tooltip> = withInstall(Tooltip)
export * from './src/trigger'
export * from './src/content'
export * from './src/constants'
export default ZTooltip
