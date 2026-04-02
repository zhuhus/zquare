<template>
  <component :is="tag" ref="_ref" v-bind="_props" :style="buttonStyle" :class="buttonKls" @click="handleClick">
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <z-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </z-icon>
    </template>
    <z-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot name="icon" />
    </z-icon>
    <span v-if="$slots.default" :class="{ [ns.em('text', 'expand')]: shouldAddSpace }">
      <slot />
    </span>
  </component>
</template>



<script setup lang="ts">
import { computed } from 'vue'

import { buttonProps, buttonEmits } from './button'
import { ZIcon } from '@zquare/components/icon'

import { useButtonCustomStyle } from './button-custom'
import { useNamespace } from '@zquare/hooks'
import { useButton } from './use-button'
defineOptions({
  name: "ZButton",
});

const props = defineProps(buttonProps)
const buttonStyle = useButtonCustomStyle(props)
const emit = defineEmits(buttonEmits)

const ns = useNamespace('button')

const {
  _ref,
  _size,
  _type,
  _disabled,
  _props,
  _plain,
  _round,
  _text,
  shouldAddSpace,
  handleClick,
} = useButton(props, emit)
console.log(_ref)
console.log(props)
console.log(shouldAddSpace)
const buttonKls = computed(() => [
  ns.b(),
  ns.m(_type.value),
  ns.m(_size),
  ns.is('disabled', _disabled),
  ns.is('loading', props.loading),
  ns.is('plain', _plain.value),
  ns.is('round', _round.value),
  ns.is('circle', props.circle),
  ns.is('text', _text.value),
  ns.is('link', props.link),
  ns.is('has-bg', props.bg),
])


</script>
