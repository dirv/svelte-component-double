<script>
  //export let _spyName, _spyInstance;
  const { _spyName: name, _spyInstance: instance, otherProps } = $$props;
</script>

<script context="module">
  export const spySelector = (name) => `div[class=spy-${name}]`;
  export const instanceSelector = (name, instance) => `div[id=spy-${name}-${instance}]`;
</script>

<div class=spy-{name} id=spy-{name}-{instance}>
  <slot />
</div>
