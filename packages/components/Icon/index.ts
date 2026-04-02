import { withInstall } from "@zquare/utils";
import Icon from "./src/icon.vue";

import type { SFCWithInstall } from "@zquare/utils";

export const ZIcon: SFCWithInstall<typeof Icon> = withInstall(Icon);
export default ZIcon;
export * from "./style";
export * from "./src/icon";
