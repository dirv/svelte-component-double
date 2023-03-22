const expect = require("expect");

expect.extend({
  toBeRenderedIn(componentDouble, container) {
    return toBeRenderedIn(componentDouble, container);
  },
  toBeRendered(componentDouble) {
    return toBeRenderedIn(componentDouble, global.container);
  },
  toBeRenderedWithPropsIn(componentDouble, props, container) {
    return toBeRenderedWithPropsIn.bind(this)(
      componentDouble,
      props,
      container
    );
  },
  toBeRenderedWithProps(componentDouble, props) {
    return toBeRenderedWithPropsIn.bind(this)(
      componentDouble,
      props,
      global.container
    );
  },
});
