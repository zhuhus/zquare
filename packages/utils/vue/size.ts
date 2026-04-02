import { componentSizeMap } from '@zquare/constants'

import type { ComponentSize } from '@zquare/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
