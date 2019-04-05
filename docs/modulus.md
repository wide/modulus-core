# Modulus - Scoped Component Approach

Modulus is a framework capable of automatically load and use scoped component, adding logic to a DOM element.

- [Files](#files)
- [Entry point](#entry-point)
- [Plugins](#plugins)
- [Masters](#masters)
- [Lifecycle](#lifecycle)
- [API](#api)
- Base components:
  - [Accordion](modulus/components/accordion.md)
- Plugins:
  - [Viewport](modulus/plugins/viewport.md)
  - [Breakpoint](modulus/plugins/breakpoint.md)


## Files

in `src/assets/js/`
```bash
plugins/          # utilities shared across all components such as Viewport, Breakpoint...
  viewport.js       # add functions to observe an element in the viewport and trigger animation when it appears
  breakpoint.js     # add functions to get the current breakpoint and dispatch global event on viewport resizing
masters/          # main logic ruling the page (not attached on a DOM element)
  page.js           # default master handling body scroll lock
utils/            # utilities for simple operation
  animations.js     # collection of enter/leave animations used by the viewport plugin
  string.js         # string transformation function
  dom.js            # dom manipulation such as slideUp/slideDown
vendors/          # local libraries that cannot be loaded using NPM (for ex: Modulus)
consts.js         # constant values such as BREAKPOINTS and ANIM_DURATION
main.js           # entry file where Modulus is instanciated with plugins and masters
polyfill.js       # polyfill for old browser
```

## Entry point

The main Modulus instance is set in `main.js` with the following parameters:
```js
import Modulus from 'modulus'
import Viewport from 'modulus/plugins/viewport'
import Breakpoint from 'modulus/plugins/breakpoint'

import Page from '~/masters/page'
import importComponents from '[ROOT]/build/import-components'

import animations from '~/utils/animations'
import { BREAKPOINTS } from '~/consts'

export default new Modulus({
  config: {
    debug: !process.env.PRODUCTION
  },
  plugins: {
    viewport: new Viewport({ animations }),
    breakpoint: new Breakpoint({ sizes: BREAKPOINTS })
  },
  masters: {
    Page
  },
  components: {
    ...importComponents
  }
})
```

## Plugins

Plugins are utilities shared across all components, in order to enhance their capabilities.

For exemple `Viewport` when instanciated:
- will watch for `data-anim` attributes and trigger animation when the element appears in viewport
- add `$viewport` property to all Component so they can access its methods like `this.$viewport.observe()`

### Create a plugin

Run the following command:
```
npm run create:plugin my-plugin
```

The file `plugins/my-plugin.js` will be created with the following content:
```js
import Plugin from 'modulus/plugin'

export default class MyPlugin extends Plugin {

  constructor() {

  }

  onInit() {
    
  }

}
```

Once created, you will need to register it in `main.js`:
```js
import Modulus from 'modulus'
import MyPlugin from '~/plugins/my-plugin'

export default new Modulus({
  plugins: {
    myPlugin: new MyPlugin()
  }
})
```

## Masters

Masters are top-level logic (often called "controller") loaded when the body is ready. They use the same `Component` class as regular components.


###  Create a master

Run the following command:
```
npm run create:master my-master
```

The file `masters/my-master.js` will be created with the following content:
```js
import Component from 'modulus/component'

export default class MyMaster extends Component {

  onInit() {

  }

}
```

Once created, you will need to register it in `main.js`:
```js
import Modulus from 'modulus'
import MyMaster from '~/masters/my-master'

export default new Modulus({
  masters: {
    MyMaster
  }
})
```

## Lifecycle

### Modulus

1. `Modulus` is instanciated
2. `Plugins` and `Masters` are loaded
3. `Modulus` parse the document looking for `[data-mod]` attributes
4. `Modulus` found a matching `Component` for the `[data-mod]` attribute:
    - the `Component` is instanciated
    - the `onInit()` method is called
5. when a `Component`'s DOM element is removed
    - the `onDestroy()` method is called


## API

### Modulus

#### `new Modulus({ config, plugins, masters, components, webComponents })`

todo

### Component

- `Component.el` : the binded DOM `HTMLElement`
- `Component.attrs` : DOM element's attributes
- `Component.dataset` : DOM element's `[data-*]` attributes
- `Component.refs` : DOM element's `[ref=*]` children
- `Component.$uid` : ID based on component class (ex: `Clickable-2`)

#### `Component.onInit()`

Called when the Component is instanciated and binded to the DOM element, with the prupose of:
- setting properties
- listening events

#### `Component.onDestroy()`

Called when the Component is removed from the DOM, with the prupose of:
- detach event lsitener

#### `Component.log(...args)`

Log a message with the `uid` of the component for better readability.

#### `Component.log.[debug|info|warn|error](...args)`

Log a severity message with the `uid` of the component for better readability.

#### `Component.on(event, callback)`

todo

#### `Component.emit(event, ...args)`

todo

#### `Component.$on(event, callback)`

todo

#### `Component.$emit(event, ...args)`

todo