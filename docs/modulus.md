# Modulus - Scoped Component Approach


## How to create a component

### 1. First, create the component logic

In `src/assets/js/components/my-clickable.js`, export a class extending the `Component` interface:
```js
import { Component } from 'modulus'

export default class MyClickable extends Component {
  onInit() {

    this.el.addEventListener('click', e => {
      this.el.innerText = 'clicked!'
    })

  }
}
```

### 2. Then, register it in the Modulus instance

In `src/assets/js/main.js`, import `MyClickable` and add it to the components list and/or web components list:
```js
import { Modulus } from 'modulus'
import MyClickable from '~/components/my-clickable'

export default new Modulus({
  components: {
    MyClickable
  },
  webComponents: {
    MyClickable // needs to be two-words camelcase, will be translated to 'my-clickable'
  }
})
```


### 3. Finally, bind the logic to the template

#### 3.1. As regular component loaded from template attribute parsing :

In `src/views/partials/clickable.html`, add `[data-mod="MyClickable"]` attribute with the component class name:
```html
<button data-mod="MyClickable">click here</button>
```

#### 3.2. As native custom element loaded from the dom :

In `src/views/partials/clickable.html`, add `<my-clickable></my-clickable>` tag:
```html
<my-clickable>click here</my-clickable>
```


## Lifecycle

### Modulus

1. `Component`s are registered in the `Modulus` instance (`main.js`)
2. `Web Components` are registered in the customElements registry
3. DOM is completely loaded, `DOMContentLoaded` event is triggered
4. `Modulus` parse the document looking for `[data-mod]` attributes
5. `Modulus` found a matching `Component` for the `[data-mod]` attribute:
    - the `Component` is instanciated
    - the `onInit()` method is called
6. DOM found a registered custom element:
    - the `Component` is instanciated
    - the `onInit()` method is called
7. once all `Component`s are loaded:
    - the `onReady()` method is called
8. when a `Component`'s DOM element is removed
    - the `onDestroy()` method is called


## API

### Modulus

#### `new Modulus({ config, plugins, components, webComponents })`

todo

### Component

- `Component.el` : the binded DOM `HTMLElement`
- `Component.attrs` : DOM element's attributes
- `Component.dataset` : DOM element's `[data-*]` attributes
- `Component.refs` : DOM element's `[ref=*]` children
- `Component.$uid` : ID based on component class (ex: `Clickable-2`)

#### `Component.onInit()`

todo

#### `Component.onReady()`

todo

#### `Component.onDestroy()`

todo

#### `Component.log(...args)`

todo

#### `Component.on(event, callback)`

todo

#### `Component.emit(event, ...args)`

todo

#### `Component.$on(event, callback)`

todo

#### `Component.$emit(event, ...args)`

todo

#### `Component.$viewport(callback, opts = {})`

todo


## Roadmap

- 