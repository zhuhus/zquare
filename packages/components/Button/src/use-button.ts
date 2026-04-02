import { Text, computed, inject, ref, useSlots } from "vue";
// import {
//   useFormDisabled,
//   useFormItem,
//   useFormSize,
// } from "@zquare/components/form";
import { useGlobalConfig } from "@zquare/components/config-provider";
import { useDeprecated } from "@zquare/hooks";
import { buttonGroupContextKey } from "./constants";

import type { SetupContext } from "vue";
import type { ButtonEmits, ButtonProps } from "./button";

export const useButton = (
  props: ButtonProps,
  emit: SetupContext<ButtonEmits>["emit"]
) => {
  useDeprecated(
    {
      from: "type.text",
      replacement: "link",
      version: "3.0.0",
      scope: "props",
      ref: "https://element-plus.org/en-US/component/button.html#button-attributes",
    },
    computed(() => props.type === "text")
  );

  const buttonGroupContext = inject(buttonGroupContextKey, undefined);
  const globalConfig = useGlobalConfig("button");
  const _size = "small";
  const _disabled = false;
  const _ref = ref<HTMLButtonElement>();
  const slots = useSlots();

  const _type = computed(() => props.type);
  const autoInsertSpace = computed(() => props.autoInsertSpace);
  const _plain = computed(() => props.plain);
  const _round = computed(() => props.round);
  const _text = computed(() => props.text);

  const _props = computed(() => {
    if (props.tag === "button") {
      return {
        ariaDisabled: _disabled || props.loading,
        disabled: _disabled || props.loading,
        autofocus: props.autofocus,
        type: props.nativeType,
      };
    }
    return {};
  });

  // add space between two characters in Chinese
  const shouldAddSpace = computed(() => {
    const defaultSlot = slots.default?.();
    if (autoInsertSpace.value && defaultSlot?.length === 1) {
      const slot = defaultSlot[0];
      if (slot?.type === Text) {
        const text = slot.children as string;
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
      }
    }
    return false;
  });

  const handleClick = (evt: MouseEvent) => {
    if (_disabled || props.loading) {
      evt.stopPropagation();
      return;
    }
    if (props.nativeType === "reset") {
      // form?.resetFields();
    }
    emit("click", evt);
  };

  return {
    _disabled,
    _size,
    _type,
    _ref,
    _props,
    _plain,
    _round,
    _text,
    shouldAddSpace,
    handleClick,
  };
};
