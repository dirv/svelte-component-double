import ComponentDouble, {
  instanceSelector,
  spySelector
} from "./lib/ComponentDouble.svelte";

export const componentDouble = original => {
  const instances = [];

  const name = original instanceof Function ? original.name : original;
  class TestComponent extends ComponentDouble {
    constructor(options) {
      const { props } = options;
      super({ ...options, props: {
        ...props,
        _spyName: name,
        _spyInstance: instances.length
      }})
      instances.push(this);
    }

    updateBoundValue(component, prop, value) {
      const fnName = `${name.toLowerCase()}_${prop}_binding`;
      const updateFn = component.$$.ctx.find(
        value => (value instanceof Function) && value.name === fnName);
      updateFn(value);
    }
  }

  TestComponent.toString = () => (
    (original instanceof Function) ? `${name} component double` : `"${name}" component double`
  );
  TestComponent.instances = instances;
  TestComponent.selector = () => spySelector(name);
  TestComponent.instanceSelector = (instance) => instanceSelector(name, instance);
  TestComponent.findMatching = matchFn =>
    instances.map(instance => instance.getNonSpyProps()).find(props => matchFn(props));
  TestComponent.firstInstance = () => instances[0];
  TestComponent.getInstanceFromElement = (domElement) => {
    for (let i = 0; i < instances.length; ++i) {
      if (domElement.matches(TestComponent.instanceSelector(i))) {
        return instances[i];
      }
    }
    throw new Error(`${domElement.outerHTML} does not correspond to a ${name} component instance`);
  }
  return TestComponent;
};
