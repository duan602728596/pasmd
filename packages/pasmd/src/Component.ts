import { AsmDom } from './types';

class Component {
  props: { [key: string]: any };
  state: { [key: string]: any };
  vnode: any;
  h: Function;
  patch: Function;
  asmDom: AsmDom;
  render: Function;
}

export default Component;