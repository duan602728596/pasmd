import Pasmd, { Component as $Component, Fragment as $Fragment } from '@pasmd/pasmd';

export const pasmd = new Pasmd({
  useWasm: true,
  unsafePatch: true
});
export const Component = $Component;
export const Fragment = $Fragment;

export default pasmd;