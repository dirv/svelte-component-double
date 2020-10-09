<script>
  const { _spyName: name, _spyInstance: instance, otherProps } = $$props;

  export function getNonSpyProps() {
    const allProps = this.$$.ctx[3];
    return Object.keys($$props).reduce((acc, key) => {
      if (!key.startsWith("_spy")) {
        acc[key] = $$props[key];
      }
      return acc;
    }, {});
  }
</script>

<script context="module">
  export const spySelector = (name) => `div[class=spy-${name}]`;
  export const instanceSelector = (name, instance) => `div[id=spy-${name}-${instance}]`;
</script>

<div class=spy-{name} id=spy-{name}-{instance}>
  <slot />
</div>
