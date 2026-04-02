<template>
    <div ref="formItemRef" :class="formItemClasses" :role="isGroup ? " group" : undefined">

    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { formItemProps } from './form-item'
import { useId, useNamespace } from '@zquare/hooks'
import { useFormSize } from './hooks/use-form-common-props'

import type { FormItemValidateState } from './form-item';

defineOptions({
    name: "ZFormItem"
})
const props = defineProps(formItemProps)

const formItemRef = ref<HTMLDivElement>()

const _size = useFormSize(undefined, { formItem: false })


const validateState = ref<FormItemValidateState>('')

const ns = useNamespace('form-item')
const labelId = useId().value
const inputIds = ref<string[]>([])
const formItemClasses = computed(() => [
    ns.b(),
    ns.m(_size.value),
    ns.is('error', validateState.value === 'error'),
    ns.is('validating', validateState.value === 'validating'),
    ns.is('success', validateState.value === 'success'),
    ns.is('required', isRequired.value || props.required),
    ns.is('no-asterisk', formContext?.hideRequiredAsterisk),
    formContext?.requireAsteriskPosition === 'right'
        ? 'asterisk-right'
        : 'asterisk-left',
    {
        [ns.m('feedback')]: formContext?.statusIcon,
        [ns.m(`label-${labelPosition.value}`)]: labelPosition.value,
    },
])

const isRequired = computed(() =>
    normalizedRules.value.some((rule) => rule.required)
)

const labelFor = computed<string | undefined>(() => {
    return (
        props.for ?? (inputIds.value.length === 1 ? inputIds.value[0] : undefined)
    )
})

const isGroup = computed<boolean>(() => {
    return !labelFor.value && hasLabel.value
})

</script>