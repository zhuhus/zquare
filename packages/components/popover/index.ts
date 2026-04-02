import { withInstall } from '@zquare/utils'
import Popover from './src/popover.vue'
import type { SFCWithInstall } from '@zquare/utils'

export const ZPopover: SFCWithInstall<typeof Popover> = withInstall(Popover)
export default ZPopover

export * from './src/popover'
export type { PopoverInstance } from './src/instance'
