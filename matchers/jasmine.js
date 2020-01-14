const toBeRenderedInCompare = (componentDouble, container) => {
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

const toBeRenderedWithPropsInCompare = (utils, componentDouble, props, container) => {
  const allMatching = componentDouble.calls.filter(callProps => utils.equals(callProps, props));
  if (allMatching.length === 1) {
    const instance = componentDouble.calls.findIndex(callProps => utils.equals(callProps, props));
    const pass = container.querySelector(componentDouble.instanceSelector(instance));
    if (pass) {
      return {
        pass: true,
        message: () => `Expected ${componentDouble} not be rendered with props but it was` +
          '\n\n' +
          `Props: ${props}` // TODO: pretty print props. Jasmine has j$.pp
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
      message: () => `Expected ${componentDouble} to be rendered once with props ${props} but it was rendered multiple times.` +
        '  If this is correct, use the toBeRenderedManyTimesWithProps matcher instead.'
      // TODO ^: pretty print props
    }
  } else {
    return {
      pass: false,
      message: () => `Expected ${componentDouble} to have been rendered once with props but it was not` +
        '\n\n' +
        `Expected: ${props}\n` +
        `Received: ${componentDouble.calls.join(', ')}`  // TODO: pretty printing
    }
  }
};

const toBeRenderedIn = () => ({
  compare: toBeRenderedInCompare });
const toBeRendered = () => ({
  compare: (componentDouble) =>
    toBeRenderedInCompare(componentDouble, global.container) });
const toBeRenderedWithPropsIn = (utils) => ({
  compare: (componentDouble, props, container) =>
    toBeRenderedWithPropsInCompare(utils, componentDouble, props, container) });
const toBeRenderedWithProps = (utils) => ({
  compare: (componentDouble, props) =>
    toBeRenderedWithPropsInCompare(utils, componentDouble, props, global.container) });

const registerDoubleMatchers = () => {
  jasmine.addMatchers({
    toBeRenderedIn,
    toBeRendered,
    toBeRenderedWithPropsIn,
    toBeRenderedWithProps
  });
};

exports.registerDoubleMatchers = registerDoubleMatchers;
