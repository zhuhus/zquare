import { withInstall } from "@zquare/utils";
import Input from "./src/input.vue";
import type { SFCWithInstall } from "@zquare/utils";

export const ZInput: SFCWithInstall<typeof Input> = withInstall(Input);
export default ZInput;

export * from "./src/input";
export * from "./style";
export type { InputInstance } from "./src/instance";
