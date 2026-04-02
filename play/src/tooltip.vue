<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <z-button>top-start</z-button>
      </z-tooltip>
      <z-tooltip
        class="box-item"
        effect="light"
        content="Top Center prompts info"
        placement="top"
      >
        <z-button>top</z-button>
      </z-tooltip>
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <z-button>top-end</z-button>
      </z-tooltip>
    </div>
    <div class="row">
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <z-button>left-start</z-button>
      </z-tooltip>
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <z-button>right-start</z-button>
      </z-tooltip>
    </div>
    <div class="row">
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <z-button class="mt-3 mb-3">left</z-button>
      </z-tooltip>
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <z-button>right</z-button>
      </z-tooltip>
    </div>
    <div class="row">
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <z-button>left-end</z-button>
      </z-tooltip>
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <z-button>right-end</z-button>
      </z-tooltip>
    </div>
    <div class="row center">
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <z-button>bottom-start</z-button>
      </z-tooltip>
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <z-button>bottom</z-button>
      </z-tooltip>
      <z-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <template #content> multiple lines<br />second line </template>

        <z-button>bottom-end</z-button>
      </z-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 500px;
  margin: 40px auto;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
