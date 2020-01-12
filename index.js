import ComponentDouble, {
  instanceSelector,
  spySelector
} from "./lib/ComponentDouble.svelte";

export const componentDouble = original => {
  const calls = [];
  const instances = [];

  const name = original instanceof Function ? original.name : original;
  class TestComponent extends ComponentDouble {
    constructor(options) {
      const { props } = options;
      super({ ...options, props: {
        ...props,
        _spyName: name,
        _spyInstance: calls.length
      }})
      calls.push(props);
      instances.push(this);
    }

    updateBoundValue(component, prop, value) {
      const fnName = `${name.toLowerCase()}_${prop}_binding`;
      component.$$.ctx[fnName](value);
    }
  }
  TestComponent.toString = () => (
    (original instanceof Function) ? `${name} component double` : `"${name}" component double`
  );
  TestComponent.calls = calls;
  TestComponent.lastCall = () => calls[calls.length - 1];
  TestComponent.selector = () => spySelector(name);
  TestComponent.instanceSelector = (instance) => instanceSelector(name, instance);
  TestComponent.findMatching = matchFn => calls.find(call => matchFn(call));
  TestComponent.firstInstance = () => instances[0];
  return TestComponent;
};
