<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isUndefined } from '@zquare/utils'
import { useNamespace } from '@zquare/hooks'
import { iconProps } from './icon'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'ZIcon',
  inheritAttrs: false,
})
const props = defineProps(iconProps)
const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  if (!size && !color) return {}

  return {
    fontSize: isUndefined(size) ? undefined : "12px",
    '--color': color,
  }
})
</script>
