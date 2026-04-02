import { withInstall } from '@zquare/utils'
import Teleport from './src/teleport.vue'

import type { SFCWithInstall } from '@zquare/utils'

export const ZTeleport: SFCWithInstall<typeof Teleport> = withInstall(Teleport)

export default ZTeleport

export * from './src/teleport'
