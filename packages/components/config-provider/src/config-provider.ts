import { defineComponent, renderSlot, watch } from "vue";
import { provideGlobalConfig } from "./hooks/use-global-config";
import { configProviderProps } from "./config-provider-props";

const ConfigProvider = defineComponent({
  name: "zConfigProvider",
  props: configProviderProps,

  setup(props, { slots }) {
    const config = provideGlobalConfig(props);
    console.log(props);
    console.log(config);
    watch(
      () => 1,
      (val) => {
        // Object.assign(messageConfig, config?.value?.message ?? {}, val ?? {});
      },
      { immediate: true, deep: true }
    );
    return () => renderSlot(slots, "default", { config: config?.value });
  },
});
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider> &
  unknown;

export default ConfigProvider;
