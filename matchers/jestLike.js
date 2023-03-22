export const toBeRenderedIn = (componentDouble, container) => {
  const pass =
    container.querySelectorAll(componentDouble.selector()).length > 0;
  if (pass) {
    return {
      pass: true,
      message: (id) =>
        `Expected ${componentDouble} not to be rendered but it was`,
    };
  } else {
    return {
      pass: false,
      message: () =>
        `Expected ${componentDouble} to be rendered but it was not`,
    };
  }
};

export function toBeRenderedWithPropsIn(componentDouble, props, container) {
  const allRenderedProps = componentDouble.instances
    .map((instance, index) => {
      if (instance.$$.fragment) {
        return [index, instance.getNonSpyProps()];
      } else {
        return null;
      }
    })
    .filter((instance) => instance);

  const allMatching = allRenderedProps.filter(([_, instanceProps]) =>
    this.equals(instanceProps, props)
  );
  if (allMatching.length === 1) {
    const pass = container.querySelector(
      componentDouble.instanceSelector(allMatching[0][0])
    );
    if (pass) {
      return {
        pass: true,
        message: () =>
          `Expected ${componentDouble} not be rendered with props but it was` +
          "\n\n" +
          `Props: ${this.utils.printReceived(props)}`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          `An instance of ${componentDouble} was correctly constructed with ${props} but it was not found in the rendered DOM tree`,
      };
    }
  } else if (allMatching.length > 1) {
    return {
      pass: false, // TODO: fix depending on not
      message: () =>
        `Expected ${componentDouble} to be rendered once with props ${this.utils.printExpected(
          props
        )} but it was rendered multiple times.` +
        "  If this is correct, use the toBeRenderedManyTimesWithProps matcher instead.",
    };
  } else {
    return {
      pass: false,
      message: () =>
        `Expected ${componentDouble} to have been rendered once with props but it was not` +
        "\n\n" +
        `Expected: ${this.utils.printExpected(props)}\n` +
        `Received: ${allRenderedProps
          .map(this.utils.printReceived)
          .join(", ")}`,
    };
  }
}
