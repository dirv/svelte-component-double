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

    getNonSpyProps() {
      const allProps = this.$$.ctx[3];
      return Object.keys(allProps).reduce((acc, key) => {
        if (!key.startsWith("_spy")) {
          acc[key] = allProps[key];
        }
        return acc;
      }, {});
    }
  }

  TestComponent.toString = () => (
    (original instanceof Function) ? `${name} component double` : `"${name}" component double`
  );
  TestComponent.instances = instances;
  TestComponent.selector = () => spySelector(name);
  TestComponent.instanceSelector = (instance) => instanceSelector(name, instance);
  TestComponent.findMatching = matchFn => instances.find(instance => matchFn(instance.getNonSpyProps()));
  TestComponent.firstInstance = () => instances[0];
  return TestComponent;
};
