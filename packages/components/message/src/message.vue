<template>
  <transition
    :name="ns.b('fade')"
    @before-enter="isStartTransition = true"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[
        ns.b(),
        { [ns.m(type)]: type },
        ns.is('closable', showClose),
        ns.is('plain', plain),
        ns.is('bottom', verticalProperty === 'bottom'),
        horizontalClass,
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <z-badge
        v-if="repeatNum > 1"
        :value="repeatNum"
        :type="badgeType"
        :class="ns.e('badge')"
      >
        <z-icon v-if="iconComponent" :class="[ns.e('icon'), typeClass]">
          <component :is="iconComponent"></component>
        </z-icon>
        <slot>
          <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">
            {{ message }}
          </p>
          <p v-else :class="ns.e('content')" v-html="message" />
        </slot>
      </z-badge>
      <z-icon v-if="showClose" :class="ns.e('closeBtn')" @click.stop="close">
        <Close />
      </z-icon>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useEventListener, useResizeObserver, useTimeoutFn } from '@vueuse/core'
import {
  MESSAGE_DEFAULT_PLACEMENT,
  messageEmits,
  messageProps,
} from './message'
import ZBadge from '@zquare/components/badge'
import ZIcon from '@zquare/components/icon'
import { useGlobalComponentSettings } from '@zquare/components/config-provider'
import { TypeComponents, TypeComponentsMap, getEventCode } from '@zquare/utils'
import { EVENT_CODE } from '@zquare/constants'
import { getLastOffset, getOffsetOrSpace } from './instance'

import type { BadgeProps } from '@zquare/components/badge'
import type { CSSProperties } from 'vue'

const { Close } = TypeComponents

defineOptions({
  name: 'ZMessage',
})

const props = defineProps(messageProps)
const emit = defineEmits(messageEmits)
const isStartTransition = ref(false)
const { ns, zIndex } = useGlobalComponentSettings('message')
const { currentZIndex, nextZIndex } = zIndex

const messageRef = ref<HTMLDivElement>()
const visible = ref(false)
const height = ref(0)

let stopTimer: (() => void) | undefined = undefined
const badgeType = computed<BadgeProps['type']>(() =>
  props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info'
)
const typeClass = computed(() => {
  const type = props.type
  return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] }
})
const iconComponent = computed(
  () => props.icon || TypeComponentsMap[props.type] || ''
)

const placement = computed(() => props.placement || MESSAGE_DEFAULT_PLACEMENT)

const lastOffset = computed(() => getLastOffset(props.id, placement.value))
const offset = computed(() => {
  return (
    getOffsetOrSpace(props.id, props.offset, placement.value) + lastOffset.value
  )
})
const bottom = computed(() => height.value + offset.value)
const horizontalClass = computed(() => {
  if (placement.value.includes('left')) return ns.is('left')
  if (placement.value.includes('right')) return ns.is('right')
  return ns.is('center')
})

const verticalProperty = computed(() =>
  placement.value.startsWith('top') ? 'top' : 'bottom'
)

const customStyle = computed<CSSProperties>(() => ({
  [verticalProperty.value]: `${offset.value}px`,
  zIndex: currentZIndex.value,
}))

function startTimer() {
  if (props.duration === 0) return
  ;({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, props.duration))
}

function clearTimer() {
  stopTimer?.()
}

function close() {
  visible.value = false

  // if the message has never started a transition, we can destroy it immediately
  nextTick(() => {
    if (!isStartTransition.value) {
      props.onClose?.()
      emit('destroy')
    }
  })
}

function keydown(event: KeyboardEvent) {
  const code = getEventCode(event)
  if (code === EVENT_CODE.esc) {
    // press esc to close the message
    close()
  }
}

onMounted(() => {
  startTimer()
  nextZIndex()
  visible.value = true
})

watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  }
)

useEventListener(document, 'keydown', keydown)

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  visible,
  bottom,
  close,
})
</script>
