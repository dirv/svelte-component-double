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

**One problem:** There’s currently no way to tell between multiple instances rendered in the rendered output vs. a single instance that has been rendered multiple times due to a prop update.

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

## Matchers

The `expect(component)` function has the following matchers available.

| Matcher | Description |
| -------- | ----------- |
| `toBeRendered()` | Passes if there was at least one instance of the component instantiated in the current document. |
| `toBeRenderedIn(container)` | Same but with a specific DOM container instead of | `document.body`. |
| `toBeRenderedWithProps(props)` | Passes if there was at least one instance of the component instantiated with these exact props. |
| `toBeRenderedWithPropsIn(props, container)` | Same as above but with a specic DOM container instead of `document.body`. |

## Identifying stubbed DOM elements

A spied/stubbed component will be rendered into the DOM like this:

```html
<div class="spy-ComponentName" id="spy-ComponentName-instanceNumber" />
```

You can use the `selector` function to return a selector that will match *all* instances of a rendered double. So for the example above, calling `spySelector(Child)` will return `"div[class=spy-Child]"`.

You can use the `instanceSelector(n)` to return a selector that matches a specific instance of the component.

## Triggering two-way bindings

If your stubbed component uses a two-way binding you can trigger that binding to update using the `updateBoundValue` function.

For example, say you have the component `TagList` which can be used like this:

```html
<TagList bind:tags={tags} />
```

Then you can test how your component responds to updates to `tags` like this:

```javascript
rewire$TagList(componentDouble(TagList));
mount(<your component that uses TagList>);

TagList.firstInstance().updateBoundValue(
  component, "tags", ["a", "b", "c"]);
```

**Warning:** `updateBoundValue` depends on the internal Svelte `$$` object which is likely to break. The current version works with 3.16+, but is incompatible with 3.15 and below.

### Component property reference

All of these functions are available on your component double type.

| Property/function | Type | Description |
| ----------------- | ---- | ----------- |
| `instances` | Array of instances | Each instance of the component that has been rendered. |
| `selector()` | Function | Selector for _all_ instances of this double. |
| `instanceSelector(n)` | Function | Selector for a single instances of this double. |
| `findMatching(matchFn)` | Function | Find the call whose props match the `matchFn` predicate |
| `firstInstance()` | Function | Returns the first instance of a component, which you an then manipulate using functions such as `updateBoundValue` (see note above). |

## Contributing

All contributions are welcome. Please feel free to create issues or raise PRs.
