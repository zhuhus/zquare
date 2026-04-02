<template>
  <!-- <div class="button-example">
    <div class="button-row">
      <z-button>Default</z-button>
      <z-button type="primary">Primary</z-button>
      <z-button type="success">Success</z-button>
      <z-button type="info">Info</z-button>
      <z-button type="warning">Warning</z-button>
      <z-button type="danger">Danger</z-button>
    </div>

    <div class="button-row">
      <z-button plain>Plain</z-button>
      <z-button type="primary" plain>Primary</z-button>
      <z-button type="success" plain>Success</z-button>
      <z-button type="info" plain>Info</z-button>
      <z-button type="warning" plain>Warning</z-button>
      <z-button type="danger" plain>Danger</z-button>
    </div>

    <div class="button-row">
      <z-button round>Round</z-button>
      <z-button type="primary" round>Primary</z-button>
      <z-button type="success" round>Success</z-button>
      <z-button type="info" round>Info</z-button>
      <z-button type="warning" round>Warning</z-button>
      <z-button type="danger" round>Danger</z-button>
    </div>

    <div class="button-row">
      <z-button :icon="Search" circle />
      <z-button type="primary" circle>
        <template #icon>
          <Edit />
        </template>
      </z-button>
      <z-button type="success" :icon="Check" circle loading />
      <z-button type="info" :icon="Message" circle />
      <z-button type="warning" :icon="Star" loading>
        <template #loading>
          <div class="custom-loading">
            <svg class="circular" viewBox="-10, -10, 50, 50">
              <path
                class="path"
                d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
                style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
              />
            </svg>
          </div>
        </template>
        Loading
      </z-button>
    </div>
    <div class="button-row">
      <z-button-group>
        <z-button type="primary" :icon="ArrowLeft">Previous Page</z-button>
        <z-button type="primary">
          Next Page
          <z-icon class="z-icon--right">
            <ArrowRight />
          </z-icon>
        </z-button>
      </z-button-group>
    </div>
    <div class="flex flex-wrap items-center mb-4">
      <z-button size="large" round>Large</z-button>
      <z-button round>Default</z-button>
      <z-button :size="1111" round>Small</z-button>
      <z-button size="large" :icon="Search" round>Search</z-button>
      <z-button :icon="Search" round>Search</z-button>
      <z-button size="small" :icon="Search" round>Search</z-button>
    </div>
    <div class="button-row">
      <z-config-provider :button="{ size: 'large', type: 'danger' }">
        <z-button>zhuzhu</z-button>
      </z-config-provider>
    </div>

    <div class="button-row">
      <z-input
        v-model="input"
        style="width: 240px"
        placeholder="Please inputssss"
        :prefix-icon="Search"
        disabled
      >
        <template #prepend>prepend</template>
      </z-input>
    </div>
    <div class="button-row">
      <z-input
        v-model="input1"
        style="width: 240px"
        placeholder="Please pwd"
        show-passwoxrd
      >
        <template #append>append</template>
      </z-input>
    </div>
    <div class="button-row">
      <z-input
        v-model="input"
        style="width: 240px"
        placeholder="clear"
        clearable
        maxlength="10"
      >
        <template #append> clear icon</template><br />
      </z-input>
    </div>
    <div class="button-row">
      <z-input
        v-model="input"
        style="width: 240px"
        placeholder="Please input"
        :formatter="
          (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        "
        :parser="(value: any) => value.replace(/\$\s?|(,*)/g, '')"
      ></z-input>
    </div>
    <div class="button-row">
      <z-input
        style="width: 240px"
        type="textarea"
        :rows="10"
        show-word-limit
        word-limit-position="outside"
        placeholder="textarea-placeholder"
      ></z-input>
    </div>
    <div class="button-row">
      <z-input
        v-model="zhuzhu"
        maxlength="10"
        style="width: 240px"
        show-word-limit
        word-limit-position="outside"
        minlegth="5"
      >
        <template #prepend> 最大字数 </template>
      </z-input>
    </div>
  </div> -->

  <div class="button-row">
    <z-tooltip content="This is a tooltip">
      <z-button>zhuzhu</z-button>
    </z-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
let input = ref('1111111111111111')
let input1 = ref('22222')
let zhuzhu = ref('最大字数')
</script>

<style scoped>
.button-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.button-row > * {
  margin: 0;
}

.z-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}

.z-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--z-button-text-color);
  stroke-linecap: round;
}
</style>
