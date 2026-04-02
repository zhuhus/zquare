/* prettier-ignore */
declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ZButton: typeof import('zquare')['ZButton']
    ZForm: typeof import('zquare')['ZForm']
    ZForm: typeof import('zquare')['ZForm']
    ZForm: typeof import('zquare')['ZForm']
    ZForm: typeof import('zquare')['ZForm']
    ZInput: typeof import('zquare')['ZInput']
    ZSelect: typeof import('zquare')['ZSelect']
    ZTooltip: typeof import('zquare')['ZTooltip']
    ZPopover: typeof import('zquare')['ZPopover']
    ZPopper: typeof import('zquare')['ZPopper']
    ZPopover: typeof import('zquare')['ZPopover']
    ZMessage: typeof import('zquare')['ZMessage']
    ZBadge: typeof import('zquare')['ZBadge']
  }

  interface ComponentCustomProperties {
    $message: typeof import('element-plus')['ElMessage']
    $notify: typeof import('element-plus')['ElNotification']
    $msgbox: typeof import('element-plus')['ElMessageBox']
    $messageBox: typeof import('element-plus')['ElMessageBox']
    $alert: typeof import('element-plus')['ElMessageBox']['alert']
    $confirm: typeof import('element-plus')['ElMessageBox']['confirm']
    $prompt: typeof import('element-plus')['ElMessageBox']['prompt']
    $loading: typeof import('element-plus')['ElLoadingService']
  }
}

export {}
