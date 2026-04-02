<template>
  <div :class="ns.b()">
    <slot />
    <transition :name="`${ns.namespace.value}=zooom-in-center`">
      <sup
        v-show="!hidden && (content || isDot || $slots.content)"
        :class="[
          ns.e('content'),
          ns.em('content', type),
          ns.is('dot', isDot),
          ns.is('hide-zero', !showZero && value === 0),
          badgeClass,
        ]"
        :style="style"
      >
        <slot name="content" :value="content">
          {{ content }}
        </slot>
      </sup>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from 'zquare'
import { badgeProps } from './badge'
import { addUnit, isNumber } from '@zquare/utils'

defineOptions({
  name: 'ZBadge',
})

const props = defineProps(badgeProps)
const ns = useNamespace('badge')

const content = computed(() => {
  if (props.isDot) return ''
  if (isNumber(props.value) && isNumber(props.max)) {
    return props.max < props.value ? `${props.max}+` : `${props.value}`
  }
  return `${props.value}`
})

const style = computed(() => {
  return [
    {
      backgroundColor: props.color,
      marginRight: addUnit(-(props.offset?.[0] ?? 0)),
      marginTop: addUnit(props.offset?.[1] ?? 0),
    },
  ]
})

defineExpose({
  content,
})
</script>
