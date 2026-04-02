<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { selectEmits, selectProps } from './select'

defineOptions({
  name: 'ZSelect',
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

// init here
</script>
