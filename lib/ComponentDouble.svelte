<script>
  const { _spyName: name, _spyInstance: instance } = $$props;

  export function getNonSpyProps() {
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
