const expect = require("expect");

const toBeRenderedIn = (componentDouble, container) => {
  const pass = container.querySelectorAll(componentDouble.selector()).length > 0;
  if (pass) {
    return {
      pass: true,
      message: id => `Expected ${componentDouble} not to be rendered but it was`
    }
  } else {
    return {
      pass: false,
      message: () => `Expected ${componentDouble} to be rendered but it was not`
    }
  }
};

const getNonSpyProps = instance =>
  Object.keys(instance.$$.ctx[3]).reduce((acc, key) => {
    if (!key.startsWith("_spy")) {
      acc[key] = instance.$$.ctx[3][key];
    }
    return acc;
  }, {});

function toBeRenderedWithPropsIn(componentDouble, props, container) {
  const allProps = componentDouble.instances.map(getNonSpyProps);
  const allMatching = allProps.filter(callProps => this.equals(callProps, props));
  if (allMatching.length === 1) {
    const instance = allProps.findIndex(callProps => this.equals(callProps, props));
    const pass = container.querySelector(componentDouble.instanceSelector(instance));
    if (pass) {
      return {
        pass: true,
        message: () => `Expected ${componentDouble} not be rendered with props but it was` +
          '\n\n' +
          `Props: ${this.utils.printReceived(props)}`
      }
    } else {
      return {
        pass: false,
        message: () => `An instance of ${componentDouble} was correctly constructed with ${props} but it was not found in the rendered DOM tree`
      }

    }
  } else if (allMatching.length > 1) {
    return {
      pass: false, // TODO: fix depending on not
      message: () => `Expected ${componentDouble} to be rendered once with props ${this.utils.printExpected(props)} but it was rendered multiple times.` +
        '  If this is correct, use the toBeRenderedManyTimesWithProps matcher instead.'
    }
  } else {
    return {
      pass: false,
      message: () => `Expected ${componentDouble} to have been rendered once with props but it was not` +
        '\n\n' +
        `Expected: ${this.utils.printExpected(props)}\n` +
        `Received: ${componentDouble.calls.map(this.utils.printReceived).join(', ')}`
    }
  }
};

expect.extend({
  toBeRenderedIn(componentDouble, container) {
    return toBeRenderedIn(componentDouble, container);
  },
  toBeRendered(componentDouble) {
    return toBeRenderedIn(componentDouble, global.container);
  },
  toBeRenderedWithPropsIn(componentDouble, props, container) {
    return toBeRenderedWithPropsIn.bind(this)(componentDouble, props, container);
  },
  toBeRenderedWithProps(componentDouble, props) {
    return toBeRenderedWithPropsIn.bind(this)(componentDouble, props, global.container);
  }
});
