import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'


import {withInstall} from '@zquare/utils'

export const ZButton = withInstall(Button)
export const ZButtonGroup = withInstall(ButtonGroup);

export * from "./types";