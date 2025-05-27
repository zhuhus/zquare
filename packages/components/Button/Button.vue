<script setup lang="ts">
import type { ButtonProps, ButtonEmits, buttonInstance } from "./types";
import { computed, inject, ref } from "vue";
import { throttle } from "lodash-es";
import { BUTTON_GROUP_CTX_KEY } from "./constants.ts";
import ZIcon from '../Icon/Icon.vue'
defineOptions({
  name: "ZButton",
});
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500,
  zhu: "menqi",
});

const emits = defineEmits<ButtonEmits>();

const slots = defineSlots();
const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0);
const size = computed(() => buttonGroupCtx?.size ?? props.size ?? "");
const type = computed(() => buttonGroupCtx?.type ?? props.type ?? "");
const disabled = computed(
  () => props.disabled || buttonGroupCtx?.disabled || false
);
const _ref = ref<HTMLButtonElement>();
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));


const handleBtnClick = (e: MouseEvent) => emits("click", e);

const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);
defineExpose<buttonInstance>({
  ref: _ref,
});
</script>

 <template>
  <component
    :is="tag"
    ref="_ref"
    class="z-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :autofocus="autofocus"
    :class="{
      [`z-button--${type}`]: type,
      [`z-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="(e:MouseEvent)=>useThrottle?handleBtnClickThrottle(e):handleBtnClick(e)"
  >
   <template v-if="loading">
      <slot name="loading">
        <z-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
     <z-icon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />
    <slot></slot>
  </component>
</template>
 <style scoped>
@import url("./style.css");
</style>