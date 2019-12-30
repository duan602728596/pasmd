import init from 'asm-dom';
import $Component from './Component';
import $Fragment from './Fragment';
import { formatProps, createChildren } from './utils';
import { AsmDom, Props, VNode } from './types';

export class Pasmd {
  private options: object;

  h: Function;
  patch: Function;
  asmDom: AsmDom;
  querySelectStr: string;
  vnode: VNode | string;
  oldVnode: VNode | string;
  Component: Function = $Component;
  Fragment: string = $Fragment;

  constructor(options: object) {
    this.options = options;
  }

  createVNode(Type: string | Function, props: Props | null, ...children: Array<any>): VNode {
    const componentProps: Props | undefined = formatProps(props),
      cChildren: Array<VNode | string> | undefined = createChildren(children);

    const treeItem: VNode = {
      $$typeof: Symbol('vnode'),
      type: Type,
      key: componentProps?.key ?? null,
      ref: componentProps?.ref ?? null
    };

    if (componentProps) {
      treeItem.props = componentProps;
    }

    if (cChildren) {
      if (!treeItem.props) {
        treeItem.props = {};
      }

      treeItem.props.children = cChildren;
      treeItem.children = cChildren;
    }

    return treeItem;
  }

  arrayVNode(vnode: VNode | Array<VNode | string>): VNode {
    let v: VNode;

    if (Array.isArray(vnode)) {
      v = this.createVNode('', {}, vnode);
    } else {
      v = vnode;
    }

    return v;
  }

  renderVNode(vnode: VNode | string): any {
    const _this: this = this;

    if (typeof vnode === 'string' || !vnode) {
      return vnode;
    }

    const { $$typeof, type: Type, props, children, component }: VNode = vnode;

    if (typeof Type === 'function') {
      if (component) {
        return this.renderVNode(component.vnode);
      } else {
        // @ts-ignore
        const component: Component = new Type();

        vnode.component = component;

        component.props = props;
        component.h = this.h;
        component.patch = this.patch;
        component.asmDom = this.asmDom;
        component.vnode = this.arrayVNode(component.render());

        // stateState方法
        component.setState = function(newState: { [key: string]: any }): void {
          Object.assign(this.state, newState);
          // TODO: 父组件render时会丢失子组件的状态
          component.vnode = _this.arrayVNode(component.render());
          _this.render(_this.vnode, _this.querySelectStr);
        };

        return this.renderVNode(component.vnode);
      }
    } else {
      let renderChildren: Array<VNode | string> | undefined = undefined;

      if (children && children.length > 0) {
        renderChildren = children.map((item: VNode | string, index: number): any => {
          return this.renderVNode(item);
        });
      }

      if (props?.children) {
        delete props.children;
      }

      return this.h(Type, props ?? {}, renderChildren);
    }
  }

  render(vnode: VNode | string | Array<VNode | string>, querySelectStr: string): void {
    this.querySelectStr = querySelectStr;

    if (!this.vnode) {
      this.vnode = Array.isArray(vnode) ? this.arrayVNode(vnode) : vnode;
    }

    const element: HTMLElement | null = document.querySelector(querySelectStr);

    if (element) {
      this.oldVnode = this.renderVNode(this.vnode);
      this.patch(element, this.oldVnode);
    }
  }

  // 初始化
  async init(): Promise<void> {
    const asmDom: AsmDom = await init(this.options);
    const { h, patch }: AsmDom = asmDom;

    this.h = h;
    this.patch = patch;
    this.asmDom = asmDom;
  }
}

export const Component: Function = $Component;
export const Fragment: string = $Fragment;

export default Pasmd;