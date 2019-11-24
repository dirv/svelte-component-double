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

A test double for Svelte 3 components. It's very light touch and does not require any complicated set up (see the example below.) It's currently in active development.

Right now, this package contains a stub that you can use with your test framework's spy functionality (e.g. `spyOn` in Jest and Jasmine).

The plan is to then build a more specific spy with its own expectations, and with a couple of helper methods for dispatching events from the stub to the component under test.

## Usage

The major point to note is that you must use a named module import for the component you wish to spy on. Doing so gives you direct access to the export so that you can then replace it a standard spy.


In the example below, `Parent` is the component under test, and `Child` is being spied on.

```javascript
import * as childExports from '../src/Child.svelte';
import Parent from '../src/Parent.svelte';

import { JSDOM } from 'jsdom';
import { componentStub } from 'svelte-component-double';

const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

describe('Parent component', () => {
  it('renders a Child', () => {
    const childSpy =
      spyOn(childExports, 'default')
        .and.returnValue(componentStub(childExports.default));

    const el = document.createElement('div')
    new Parent({ target: el })

    expect(childSpy).toHaveBeenCalled();
  });
});

```


## Installation

```bash
npm install --save-dev svelte-component-double
```

You'll need to ensure that your test environment can compile `.svelte` files. See [svelte-test-register](https://github.com/dirv/svelte-test-register) for one package that can do this.

## Contributing

All contributions are welcome. Please feel free to create issues or raise PRs.
