import { computed, inject, unref } from "vue";
import { buildProp } from "@zquare/utils";
import { componentSizes } from "@zquare/constants";

import type { InjectionKey, Ref } from "vue";
import type { ComponentSize } from "@zquare/constants";

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const);

export const useSizeProps = {
  size: useSizeProp,
};

export interface SizeContext {
  size: Ref<ComponentSize>;
}

export const SIZE_INJECTION_KEY: InjectionKey<SizeContext> = Symbol("size");

export const useGlobalSize = () => {
  const injectedSize = inject(SIZE_INJECTION_KEY, {} as SizeContext);

  return computed<ComponentSize>(() => {
    return unref(injectedSize.size) || "";
  });
};
