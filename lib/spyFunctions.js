const svelte = require('svelte/compiler');
const { matchers } = require('./matchers.js');

const buildSpyComponent = function(original) {
  let spyComponent = {
    [original.name]: function (...args) {
      return new (this.constructor.spy || original)(...args);
    }
  }[original.name];
  if(!spyComponent.hasOwnProperty('original')) {
    Object.defineProperty(spyComponent, 'original', { value: original });
  }
  return spyComponent;
};

const componentSpy = (component) => {
  const calls = [];
  function SpyFunction(...args) {
    calls.push(args);
    return componentStub(component);
  }
  Object.defineProperty(SpyFunction, 'calls', { value: calls });
  return SpyFunction;
};

const spyClassName = component => `spy-${component.name}`;

const spySelector = spy => `div[class=${spyClassName(spy.original)}]`;

const componentStub = component => {
  const stub = eval(svelte.compile(`<div class=${spyClassName(component)} />`, { format: 'cjs' }).js.code);
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
exports.spySelector = spySelector;
