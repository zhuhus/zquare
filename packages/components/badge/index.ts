import { withInstall } from '@zquare/utils'
import Badge from './src/badge.vue'
import type { SFCWithInstall } from '@zquare/utils'

export const ZBadge: SFCWithInstall<typeof Badge> = withInstall(Badge)
export default ZBadge

export * from './src/badge'
export type { BadgeInstance } from './src/instance'
