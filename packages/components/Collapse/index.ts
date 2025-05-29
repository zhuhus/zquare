import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'



import {withInstall} from '@zquare/utils'

export const ZCollapse = withInstall(Collapse)
export const ZCollapseItem = withInstall(CollapseItem)

export * from "./types";