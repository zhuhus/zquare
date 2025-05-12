import {makeInstaller} from '@zquare/utils'
import components from './components'

const installer =makeInstaller(components)

export * from '@zquare/components'
export default installer