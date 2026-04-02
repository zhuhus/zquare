<template>
  <z-tooltip
    ref="tooltipRef"
    v-bind="$attrs"
    :trigger="trigger"
    :trigger-keys="triggerKeys"
    :placement="placement"
    :disabled="disabled"
    :visible="visible"
    :transition="transition"
    :popper-options="popperOptions"
    :content="content"
    :offset="offset"
    :show-after="showAfter"
    :hide-after="hideAfter"
    :auto-close="autoClose"
    :show-arrow="showArrow"
    :aria-label="title"
    :effect="effect"
    :enterable="enterable"
    :popper-class="kls"
    :popper-style="style"
    :teleported="teleported"
    :append-to="appendTo"
    :persistent="persistent"
    :gpu-acceleration="gpuAcceleration"
    @update:visible="onUpdateVisible"
    @before-show="beforeEnter"
    @before-hide="beforeLeave"
    @show="afterEnter"
    @hide="afterLeave"
  >
    <teamplate v-if="$slots.reference">
      <slot name="reference" />
    </teamplate>
    <template #content>
      <div v-if="title" :class="ns.e(title)" role="title">
        {{ title }}
      </div>
      <slot>
        {{ content }}
      </slot>
    </template>
  </z-tooltip>
</template>

<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { ZTooltip } from '@zquare/components/tooltip'
import { popoverEmits, popoverProps } from './popover'
import { useNamespace } from '@zquare/hooks'
import { addUnit } from '@zquare/utils'

import type { TooltipInstance } from '@zquare/components/tooltip/src/instance'

defineOptions({
  name: 'ZPopover',
})
const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

const updateEventKeyRaw = `onUpdate:visible` as const

const onUpdateVisible = computed(() => {
  return props[updateEventKeyRaw]
})
const ns = useNamespace('popover')
const tooltipRef = ref<TooltipInstance>()
const popperRef = computed(() => {
  return unref(tooltipRef)?.popperRef
})

const style = computed(() => {
  return [
    {
      width: addUnit(props.width),
    },
    props.popperStyle!,
  ]
})

const kls = computed(() => {
  return [ns.b(), props.popperClass!, { [ns.m('plain')]: !!props.content }]
})

const gpuAcceleration = computed(() => {
  return props.transition === `${ns.namespace}-fade-in-linear`
})

const hide = () => {
  tooltipRef.value?.hide()
}
const beforeEnter = () => {
  emit('before-enter')
}
const beforeLeave = () => {
  emit('before-leave')
}

const afterEnter = () => {
  emit('after-enter')
}

const afterLeave = () => {
  emit('update:visible', false)
  emit('after-leave')
}

defineExpose({
  popperRef,
  hide,
})
// init here
</script>
