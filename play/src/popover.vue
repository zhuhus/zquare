<template>
  <div class="popover-base-box">
    <div class="row center">
      <z-popover
        title="Title"
        content="Top Left prompts info"
        placement="top-start"
      >
        <template #reference>
          <z-button>top-start</z-button>
        </template>
      </z-popover>
      <z-popover
        title="Title"
        content="Top Center prompts info"
        placement="top"
      >
        <template #reference>
          <z-button>top</z-button>
        </template>
      </z-popover>
      <z-popover
        title="Title"
        content="Top Right prompts info"
        placement="top-end"
      >
        <template #reference>
          <z-button>top-end</z-button>
        </template>
      </z-popover>
    </div>
    <div class="row">
      <z-popover
        title="Title"
        content="Left Top prompts info"
        placement="left-start"
      >
        <template #reference>
          <z-button>left-start</z-button>
        </template>
      </z-popover>
      <z-popover
        title="Title"
        content="Right Top prompts info"
        placement="right-start"
      >
        <template #reference>
          <z-button>right-start</z-button>
        </template>
      </z-popover>
    </div>
    <div class="row">
      <z-popover
        title="Title"
        content="Left Center prompts info"
        placement="left"
      >
        <template #reference>
          <z-button class="mt-3 mb-3">left</z-button>
        </template>
      </z-popover>
      <z-popover
        title="Title"
        content="Right Center prompts info"
        placement="right"
      >
        <template #reference>
          <z-button>right</z-button>
        </template>
      </z-popover>
    </div>
    <div class="row">
      <z-popover
        title="Title"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <template #reference>
          <z-button>left-end</z-button>
        </template>
      </z-popover>
      <z-popover
        title="Title"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <template #reference>
          <z-button>right-end</z-button>
        </template>
      </z-popover>
    </div>
    <div class="row center">
      <z-popover
        title="Title"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <template #reference> <z-button>bottom-start</z-button></template>
      </z-popover>
      <z-popover
        title="Title"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <template #reference> <z-button>bottom</z-button></template>
      </z-popover>
      <z-popover
        title="Title"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <template #reference>
          <z-button>bottom-end</z-button>
        </template>
      </z-popover>
    </div>
  </div>
</template>

<style>
.popover-base-box {
  width: 500px;
  margin: 150px auto;
}

.popover-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.popover-base-box .center {
  justify-content: center;
}
</style>
