const svelte = require('svelte/compiler');

export function componentStub(component) {
  const stub = eval(svelte.compile(`<div id=${component ? component.name : 'spy'} />`, { format: 'cjs' }).js.code);
  return new stub({});
}
