import { withInstall } from '@zquare/utils'
import ConfigProvider from './src/config-provider'

import type { SFCWithInstall } from '@zquare/utils'

export const ZConfigProvider: SFCWithInstall<typeof ConfigProvider> =
  withInstall(ConfigProvider)
export default ZConfigProvider

export * from './src/config-provider'
export * from './src/config-provider-props'
export * from './src/constants'
export * from './src/hooks/use-global-config'
