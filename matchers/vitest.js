import { toBeRenderedIn, toBeRenderedWithPropsIn } from "./jestLike.js";

export { toBeRenderedIn, toBeRenderedWithPropsIn } from "./jestLike.js";

export function toBeRendered(componentDouble) {
  return toBeRenderedIn(componentDouble, globalThis.document);
}

export function toBeRenderedWithProps(componentDouble, props) {
  return toBeRenderedWithPropsIn.bind(this)(
    componentDouble,
    props,
    globalThis.document
  );
}
