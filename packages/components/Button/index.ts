import { withInstall, withNoopInstall } from "@zquare/utils";
import Button from "./src/button.vue";
import ButtonGroup from "./src/button-group.vue";

import type { SFCWithInstall } from "@zquare/utils";

export const ZButton: SFCWithInstall<typeof Button> & {
  ButtonGroup: typeof ButtonGroup;
} = withInstall(Button, {
  ButtonGroup,
});
export const ZButtonGroup: SFCWithInstall<typeof ButtonGroup> =
  withNoopInstall(ButtonGroup);
export default ZButton;

export * from "./src/button";
export * from "../button-group/style";
export * from "./src/constants";
export type { ButtonInstance, ButtonGroupInstance } from "./src/instance";
export * from "./style";
