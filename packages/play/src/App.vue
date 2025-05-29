<script setup lang="ts">
import { ref } from 'vue';

const openVal = ref(["a"]);
</script>

<template>
  <z-button type="primary" size="small" icon="search">menqi</z-button>
  <z-button-group type="success" size="large">
    <z-button>menqi</z-button>
    <z-button>love</z-button>

    <z-button>zhuzhu</z-button>

  </z-button-group>
  <z-collapse v-model="openVal">
    <z-collapse-item name="a" title="Title a">
      <h1>headline title</h1>
      <div>this is content a</div>
    </z-collapse-item>
    <z-collapse-item name="b" title="title b">
      <div>this is content b</div>
    </z-collapse-item>
    <z-collapse-item name="c" title="title c  disable" disabled>
      <div>this is content c</div>
    </z-collapse-item>
  </z-collapse>

  <z-icon icon="angle-right" class="header-angle"></z-icon>


</template>

<style scoped></style>
