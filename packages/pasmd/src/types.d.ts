import Component from './Component';

export interface Props {
  [key: string]: any;
}

export interface VNode {
  $$typeof: Symbol;
  type: string | Function;
  key: string | null;
  ref: Function | null;
  props?: Props;
  children?: Array<VNode | string>;
  component?: Component;
}

export interface AsmDom {
  h: Function;
  patch: Function;
}