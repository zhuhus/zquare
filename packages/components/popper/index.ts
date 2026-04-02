import { withInstall } from '@zquare/utils'
import Popper from './src/popper.vue'
import ZPopperArrow from './src/arrow.vue'
import ZPopperTrigger from './src/trigger.vue'
import ZPopperContent from './src/content.vue'

import type { SFCWithInstall } from '@zquare/utils'

export { ZPopperArrow, ZPopperTrigger, ZPopperContent }
export const ZPopper: SFCWithInstall<typeof Popper> = withInstall(Popper)
export default ZPopper

export * from './src/popper'
export * from './src/trigger'
export * from './src/content'
export * from './src/arrow'
export * from './src/constants'
export * from './style'
export type { Placement, Options } from '@popperjs/core'
