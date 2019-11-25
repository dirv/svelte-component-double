const svelte = require('svelte/compiler');
const { matchers } = require('./matchers.js');

const buildSpyComponent = function(original) {
  const spyComponent = function SpyComponent(...args) {
    return new (this.constructor.spy || original)(...args);
  }
  if(!spyComponent.hasOwnProperty('original')) {
    Object.defineProperty(spyComponent, 'original', { value: original });
  }
  return spyComponent;
};

const componentSpy = (component) => {
  const calls = [];
  function SpyFunction(...args) {
    calls.push(args);
    return componentStub(this.original, calls.length);
  }
  Object.defineProperty(SpyFunction, 'calls', { value: calls });
  return SpyFunction;
};

const componentStub = (component, instanceNumber) => {
  const stub = eval(svelte.compile(`<div id=${component ? component.name : 'spy'}-${instanceNumber} />`, { format: 'cjs' }).js.code);
  return new stub({});
};

const spyOnComponent = (component) =>
  Object.defineProperty(component, 'spy', {
    value: componentSpy(component),
    configurable: true,
    writable: true });

const expectSpy = (spy) => {
  const matchersForSpy = {};
  matchers.forEach(matcher => {
    matchersForSpy[matcher.name] = (...args) => matcher(spy.spy.calls, ...args);
  })
  return matchersForSpy;
};

exports.expectSpy = expectSpy;
exports.buildSpyComponent = buildSpyComponent;
exports.spyOnComponent = spyOnComponent;
exports.componentStub = componentStub;
exports.componentSpy = componentSpy;
