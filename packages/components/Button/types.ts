import type { Component, Ref } from "vue";

export type ButtonType = "primary" |"success" |"warning" |"danger"|"info";
export type NativeType = "button" |" reset"|"submit" ;
export type ButtonSize = "large" |"default" |"small";


export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  autofocus?: boolean;
  loadingIcon?:string;
  useThrottle?:boolean;
  throttleDuration?:number;
  zhu?:string

}

export interface ButtonEmits{
  (e:"click",val:MouseEvent):void
}
export interface buttonInstance{
  ref:Ref<HTMLButtonElement | void>
}
export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}
