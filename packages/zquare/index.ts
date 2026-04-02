import installer from './defaults'

export * from '@zquare/components'
export * from '@zquare/hooks'
export * from './make-installer'

export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
