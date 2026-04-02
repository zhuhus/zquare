import { withInstallFunction } from '@zquare/utils'
import Message from './src/method'

export const ZMessage = withInstallFunction(Message, '$message')
export default ZMessage

export * from './src/message'
