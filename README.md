<p>
  <a href="https://www.npmjs.com/package/svelte-component-double">
    <img src="https://img.shields.io/npm/v/svelte-component-double.svg" alt="npm version">
  </a>

  <a href="https://packagephobia.now.sh/result?p=svelte-component-double">
    <img src="https://packagephobia.now.sh/badge?p=svelte-component-double" alt="install size">
  </a>

  <a href="https://travis-ci.org/dirv/svelte-component-double">
    <img src="https://api.travis-ci.org/dirv/svelte-component-double.svg?branch=master"
         alt="build status">
  </a>

  <a href="https://github.com/dirv/svelte-component-double/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/svelte-component-double.svg" alt="license">
  </a>
</p>

# svelte-component-double

An (experimental) test double for Svelte 3 components. It's currently in active development. The package contains matchers for both Jest and Jasmine, but I’d love help to build matchers for Expect, Should and Chai.

*Support for two-way bindings is currently broken as of Svelte 3.16.*

## Installation

First install the package:

```bash
npm install --save-dev svelte-component-double
```

### Jasmine

Add the following helper in `spec/support/jasmine.json`.

```json
"helpers": [
  "../node_modules/svelte-component-double/lib/matchers/jasmine.js"
]
```

## Usage

You need to use a mocking tool like [babel-plugin-rewire-exports](https://github.com/asapach/babel-plugin-rewire-exports).

In the example below, `Parent` is the component under test, and `Child` is being spied on.

```javascript
import Child, { rewire as rewire$Child, restore } from '../src/Child.svelte';
import Parent from '../src/Parent.svelte';

import { componentDouble } from 'svelte-component-double';

describe('Parent component', () => {
  it('renders a Child', () => {
    // ensure JSDOM is set up and ready to go

    rewire$Child(componentDouble(Child));

    const el = document.createElement('div');
    new Parent({ target: el });

    expect(Child).toHaveBeenCalled();
    expect(el.querySelector(spySelector(Child))).not.toBeNull();
  });
});

```

## List of matchers

The `expect(component)` function has the following matchers available.

`toBeRendered()` - passes if there was at least one instance of the component instantiated in the current document.
`toBeRenderedIn(container)` - same but with a specific DOM container instead of `document.body`.
`toBeRenderedWithProps(props)` - passes if there was at least one instance of the component instantiated with these exact props.
`toBeRenderedWithPropsIn(props, container)` - same as above but with a specic DOM container instead of `document.body`.

## Identifying stubbed DOM elements

A spied/stubbed component will be rendered into the DOM like this:

```html
<div class="spy-ComponentName" />
```

You can use the `spySelector` function to return a selector that will match these elements. So for the example above, calling `spySelector(Child)` will return `"div[class=spy-Child]"`.

This allows a spy to be rendered multiple times into the DOM. If you expect the child to be rendered only once, you can use the DOM `querySelector` API to return it, as shown in the example above. If you're expecting multiple instances, you can use `querySelectorAll` to return the collection of all rendered instances. You can then assert on these as normal.

## Contributing

All contributions are welcome. Please feel free to create issues or raise PRs.
