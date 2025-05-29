import type { Ref } from "vue";
export type CollapseItemName = string | number;

export interface CollapseProps {
  modelValue: CollapseItemName[];
  accordion?: boolean;
}

export interface CollapseItemProps {
  name: CollapseItemName;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>;//有哪些折叠面板展开
  handleItemClick(name: CollapseItemName): void;
}

export interface CollapseEmits {
  (e: "update:modelValue", value: CollapseItemName[]): void;
  (e: "change", value: CollapseItemName[]): void;
}
