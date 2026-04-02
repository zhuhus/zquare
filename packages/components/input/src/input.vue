<template>
  <div
    :class="[
      containerKls,
      {
        [nsInput.bm('group', 'append')]: $slots.append,
        [nsInput.bm('group', 'prepend')]: $slots.prepend,
      },
    ]"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" :class="nsInput.be('group', 'prepend')">
        <slot name="prepend"></slot>
      </div>

      <!-- input wrapper -->
      <div ref="warpperRef" :class="wrapperKls">
        <!-- prefix slot -->
        <span v-if="$slots.prefix || prefixIcon" :class="nsInput.e('prefix')">
          <span :class="nsInput.e('prefix-inner')">
            <slot name="prefix" />
            <z-icon v-if="prefixIcon" :class="nsInput.e('icon')">
              <component :is="prefixIcon" />
            </z-icon>
          </span>
        </span>

        <input
          :id="inputId"
          :placeholder="props.placeholder"
          ref="input"
          :class="nsInput.e('inner')"
          :disabled="inputDisabled"
          v-bind="attrs"
          :name="name"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :minlength="minlength"
          :maxlength="maxlength"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @compositionend="handleCompositionEnd"
          @input="handleInput"
        />

        <!-- suffix slot -->
        <span v-if="true" :class="nsInput.e('suffix')">
          <span :class="nsInput.e('suffix-inner')">
            <template
              v-if="!showClear || !showPwdVisible || !isWordLimitVisible"
            >
              <slot name="suffix" />
              <z-icon v-if="suffixIcon" :class="nsInput.e('icon')">
                <component :is="suffixIcon" />
              </z-icon>
            </template>
            <z-icon
              v-if="showClear"
              :class="[nsInput.e('icon'), nsInput.e('clear')]"
              @mousedown.prevent="NOOP"
              @click="clear"
            >
              <component :is="clearIcon" />
            </z-icon>
            <z-icon
              v-if="showPwdVisible"
              :class="[nsInput.e('icon'), nsInput.e('password')]"
              @click="handlePasswordVisible"
              @mousedown.prevent="NOOP"
              @mouseup.prevent="NOOP"
            >
              <component :is="passwordIcon" />
            </z-icon>
            <span
              v-if="isWordLimitVisible"
              :class="[
                nsInput.e('count'),
                nsInput.is('outside', wordLimitPosition === 'outside'),
              ]"
            >
              <span :class="nsInput.e('count-inner')">
                {{ textLength }} / {{ maxlength }}
              </span>
            </span>
          </span>
        </span>
      </div>

      <!-- append slot -->
      <div v-if="$slots.append" :class="nsInput.be('group', 'append')">
        <slot name="append" />
      </div>
    </template>

    <template v-else>
      <textarea
        :id="inputId"
        ref="textarea"
        v-bind="attrs"
        :placeholder="placeholder"
        :class="[nsTextarea.e('inner'), nsInput.is('focus', isFocused)]"
        :name="name"
        :minlength="minlength"
        :maxlength="maxlength"
        :row="rows"
        :disabled="inputDisabled"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span
        v-if="isWordLimitVisible"
        :style="countStyle"
        :class="[
          nsInput.e('count'),
          nsInput.is('outside', wordLimitPosition === 'outside'),
        ]"
      >
        {{ textLength }} / {{ maxlength }}
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace, useFocusController, useComposition } from '@zquare/hooks'
import { inputEmits, inputProps } from './input'
import { isNil } from 'lodash-unified'
import {
  computed,
  useSlots,
  ref,
  useAttrs,
  useAttrs as useRawAttrs,
  shallowRef,
  watch,
  onMounted,
  nextTick,
  toRef,
} from 'vue'
import { ZIcon } from '@zquare/components'
import { Hide as IconHide, View as IconView } from '@element-plus/icons-vue'

import { debugWarn, NOOP } from '@zquare/utils'
import { looseToNumber } from './utils'
import {
  useFormDisabled,
  useFormItem,
  useFormItemInputId,
  useFormSize,
} from '@zquare/components/form'

type TargetElement = HTMLInputElement | HTMLTextAreaElement
import type { StyleValue } from 'vue'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@zquare/constants'

const COMPONENT_NAME = 'ZInput'
defineOptions({
  name: COMPONENT_NAME,
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
console.log(props)
console.log(emit)

const rawAttrs = useRawAttrs()
const attrs = useAttrs()
const slots = useSlots()

const containerKls = computed(() => [
  props.type === 'textarea' ? nsTextarea.b() : nsInput.b(),
  nsInput.m(inputSize.value),
  nsInput.is('disabled', inputDisabled.value),
  nsInput.is('exceed', inputExceed.value),
  {
    [nsInput.b('group')]: slots.prepend || slots.append,
    [nsInput.m('prefix')]: slots.prefix || props.prefixIcon, //z-input__prefix
    [nsInput.m('suffix')]:
      slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
    [nsInput.bm('suffix', 'password-clear')]:
      showClear.value && showPwdVisible.value,
    [nsInput.b('hidden')]: props.type === 'hidden',
  },
  rawAttrs.class,
])

const wrapperKls = computed(() => [
  props.type === 'textarea' ? nsTextarea.e('wrapper') : nsInput.e('wrapper'),
])

const { form: zForm, formItem: zFormItem } = useFormItem()
const { inputId } = useFormItemInputId(props, {
  formItemContext: zFormItem,
})
const inputSize = useFormSize()
const inputDisabled = useFormDisabled()
const nsInput = useNamespace('input')
const nsTextarea = useNamespace('textarea')

const input = shallowRef<HTMLInputElement>()
console.log(input.value)
const textarea = shallowRef<HTMLTextAreaElement>()

const hovering = ref(false)
const passwordVisible = ref(false)
const countStyle = ref<StyleValue>()
const textareaCalcStyle = shallowRef(props.inputStyle)

const _ref = computed(() => input.value || textarea.value)

const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
  _ref,
  {
    disabled: inputDisabled,
    afterBlur() {
      if (props.validateEvent) {
        zFormItem?.validate?.('blur').catch((err) => debugWarn(err))
      }
    },
  }
)

const nativeInputValue = computed(() =>
  isNil(props.modelValue) ? '' : String(props.modelValue)
)

const showClear = computed(
  () =>
    props.clearable &&
    !inputDisabled.value &&
    !props.readonly &&
    !!nativeInputValue.value
  // (isFocused.value || hovering.value)
)
console.log(!!nativeInputValue.value)
console.log(isFocused.value || hovering.value)

const showPwdVisible = computed(
  () => props.showPassword && !inputDisabled.value && !!nativeInputValue.value
)

const isWordLimitVisible = computed(
  () =>
    props.showWordLimit &&
    !!props.maxlength &&
    (props.type === 'text' || props.type === 'textarea') &&
    !inputDisabled.value &&
    !props.readonly &&
    !props.showPassword
)
const textLength = computed(() => nativeInputValue.value.length)
const inputExceed = computed(
  () =>
    // show exceed style if length of initial value greater then maxlength
    !!isWordLimitVisible.value && textLength.value > Number(props.maxlength)
)

const passwordIcon = computed(() =>
  passwordVisible.value ? IconView : IconHide
)
const containerStyle = computed<StyleValue>(() => [
  rawAttrs.style as StyleValue,
])

const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

const focus = () => _ref.value?.focus()

const blur = () => _ref.value?.blur()

const handleMouseLeave = (evt: MouseEvent) => {
  hovering.value = false
  emit('mouseleave', evt)
}

const handleMouseEnter = (evt: MouseEvent) => {
  hovering.value = true
  emit('mouseenter', evt)
}

const handleKeydown = (evt: KeyboardEvent) => {
  emit('keydown', evt)
}

const select = () => {
  _ref.value?.select()
}

const setNativeInputValue = () => {
  const input = _ref.value
  const formatterValue = props.formatter
    ? props.formatter(nativeInputValue.value)
    : nativeInputValue.value
  if (!input || input.value === formatterValue) return
  input.value = formatterValue
}

const formatValue = (value: string) => {
  const { trim, number } = props.modelModifiers
  if (trim) {
    value = value.trim()
  }
  if (number) {
    value = `${looseToNumber(value)}`
  }
  if (props.formatter && props.parser) {
    value = props.parser(value)
  }
  return value
}

const handleInput = (event: Event) => {
  let { value } = event.target as TargetElement
  if (isComposing.value) return
  console.log('input事件触发了')

  value = formatValue(value)
  setNativeInputValue()
  emit(UPDATE_MODEL_EVENT, value) //传回去
}

const {
  isComposing,
  handleCompositionStart,
  handleCompositionUpdate,
  handleCompositionEnd,
} = useComposition({ emit, afterComposition: handleInput })

const clear = () => {
  emit(UPDATE_MODEL_EVENT, '')
  emit(CHANGE_EVENT, '')
  emit('clear')
  emit(INPUT_EVENT, '')
}

watch(nativeInputValue, () => {
  setNativeInputValue()
})

onMounted(() => {
  if (!props.formatter && props.parser) {
    debugWarn(
      COMPONENT_NAME,
      'If you set the parser, you also need to set the formatter.'
    )
  }
  setNativeInputValue()
})
const handleChange = async (event: Event) => {
  let { value } = event.target as TargetElement

  value = formatValue(value)
  if (props.modelModifiers.lazy) {
    emit(UPDATE_MODEL_EVENT, value)
  }
  emit(CHANGE_EVENT, value)

  await nextTick()
  setNativeInputValue()
}

defineExpose({
  /** @description HTML input element */
  input,
  /** @description HTML textarea element */
  textarea,
  /** @description HTML element, input or textarea */
  ref: _ref,
  /** @description style of textarea. */

  /** @description from props (used on unit test) */
  autosize: toRef(props, 'autosize'),

  /** @description is input composing */
  isComposing,

  /** @description HTML input element native method */
  focus,
  /** @description HTML input element native method */
  blur,
  /** @description HTML input element native method */
  select,
  /** @description clear input value */
  clear,
  /** @description resize textarea. */
})
// init here
</script>
