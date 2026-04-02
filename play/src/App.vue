<template>
  <div class="flex flex-wrap gap-1">
    <z-button class="!ml-0" :plain="true" @click="open">
      Show message
    </z-button>
    <z-button class="!ml-0" :plain="true" @click="openVn">VNode</z-button>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { ZMessage } from 'zquare'

const open = () => {
  ZMessage('This is a message.')
}

const openVn = () => {
  ZMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
  console.log(
    ZMessage({
      message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
        h('span', null, 'Message can be '),
        h('i', { style: 'color: teal' }, 'VNode'),
      ]),
    })
  )
}
</script>
