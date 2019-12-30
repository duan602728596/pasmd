import { Props, VNode } from './types';

// 格式化props
export function formatProps(props: Props | null): Props | undefined {
  if (!props) {
    return undefined;
  }

  const p: Props = props ?? {};

  if (p.className) {
    p.class = p.className;
    delete p.className;
  }

  if (p.htmlFor) {
    p.for = p.htmlFor;
    delete p.htmlFor;
  }

  // 格式化props
  for (const key in p) {
    if (/^on[A-Z]/.test(key)) {
      p[key.toLocaleLowerCase()] = p[key];
      delete p[key];
    }
  }

  return p;
}

// 创建children
export function createChildren(children: Array<VNode | string>): Array<VNode | string> | undefined {
  let cChildren: any = undefined;

  if (children && children.length > 0) {
    cChildren = children.map((item: any, index: number, array: Array<any>): any => {
      if (typeof item === 'number') {
        return `${ item }`;
      }

      return item;
    });
  }

  return cChildren;
}