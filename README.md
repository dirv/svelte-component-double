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

A test double for Svelte 3 components. It's currently in active development, with support for both Mocha and Jasmine.

The package contains a `spyOnComponent` function that you can use to stub out a child component. It also contains an `expectSpy` function that you can use to assert on how the child was called by the component under test.

*There are a few things still to figure out, and help/input would be appreciated.* For example: bound props, slots, component bindings, and dispatching messages.

## Installation

First install the package:

```bash
npm install --save-dev svelte-component-double
```

Then you'll need to configure Node to apply this package's compiler for Svelte files. In addition to calling thte Svelte compiler, it installs a proxy so that test doubles can be attached.

### Jasmine

In `spec/support/jasmine.json`, add the following helper.

```json
"helpers": [
  "../node_modules/svelte-component-double/lib/register.js"
]
```

### Mocha

In `package.json`, update the Mocha script entry to require `svelte-component-double`:

```json
"scripts": {
  "mocha": "mocha --require svelte-test-register/lib/register.js"
}
```

## Usage

In the example below, `Parent` is the component under test, and `Child` is being spied on.

```javascript
import Child from '../src/Child.svelte';
import Parent from '../src/Parent.svelte';

import { JSDOM } from 'jsdom';
import { spyOnComponent, expectSpy } from 'svelte-component-double';

const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

describe('Parent component', () => {
  it('renders a Child', () => {
    spyOnComponent(Child);

    const el = document.createElement('div')
    new Parent({ target: el })

    expectSpy(Child).toHaveBeenCalled();
  });
});

```

## Contributing

All contributions are welcome. Please feel free to create issues or raise PRs.
