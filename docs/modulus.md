# Modulus - Scoped Component Approach


## How to create a component

### First, create the component logic

In `src/assets/js/components/clickable.js`, export a class extending the `Component` interface:
```js
import { Component } from 'modulus'

export default class Clickable extends Component {
  onInit() {

    this.el.addEventListener('click', e => {
      this.el.innerText = 'clicked!'
    })

  }
}
```

### Then, register it in the Modulus instance

In `src/assets/js/main.js`, import `Clickable` and add it the components list:
```js
import { Modulus } from 'modulus'
import Clickable from '~/components/clickable'

export default new Modulus({
  components: {
    Clickable
  }
})
```

### Finally, bind the logic to the template

In `src/views/partials/clickable.html`, add `[data-mod]` attribute with the component class name:
```html
<button data-mod="Clickable">click here</button>
```


## Lifecycle

- `Component`s are registered in the `Modulus` instance (`main.js`)
- DOM is completely loaded, `DOMContentLoaded` event is triggered
- `Modulus` parse the document looking for `[data-mod]` attributes
- a `Component` match the `[data-mod]` attribute:
  - the `Component` is instanciated
  - the `onInit()` method is called
- once all `Component`s are loaded:
  - the `onReady()` method is called
- when a Component's DOM element is removed
  - the `onDestroy()` method is called


## API

### `new Modulus({ config, plugins, components })`

todo

### `Component.onInit()`

todo

### `Component.onReady()`

todo

### `Component.onDestroy()`

todo

### `Component.log(...args)`

todo

### `Component.$on(event, callback)`

todo

### `Component.$emit(event, ...args)`

todo

### `Component.$viewport(callback, opts = {})`

todo
