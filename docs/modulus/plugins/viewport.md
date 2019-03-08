# Modulus - Viewport plugin


## Installation

In `main.js`
```js
import Viewport from 'modulus/plugins/viewport'
import animations from '~/utils/animations'

export default new Modulus({
  plugins: {
    viewport: new Viewport({ animations })
  }
})
```

## Usage in template

The viewport plugin will automatically attach an observer to the `data-viewport-anim` attribute with the following value: `{name}:{modifiers}`.

### CSS Animation

For the following:
```html
<div class="to-animate" data-viewport-anim="fade:enter,once">
  ...
</div>
```

- `fade` is the animation name used to apply css classes depending on the modifiers
- `modifiers` can have up to three values (if none -> `enter` by default):
  - `enter`: add `fade-enter` css class (and remove `fade-leave`) when the element enters the viewport
  - `leave`: add `fade-leave` css class (and remove `fade-enter`) when the element leaves the viewport
  - `once`: destroy the observer once the first animation has been played

### JS Animation

For the following:
```html
<div class="to-animate" data-viewport-anim="@fade:enter,once">
  ...
</div>
```

and in `~/utils/animations`:
```js
export default {
  fade: {
    enter: el => fadeIn(el),
    leave: el => fadeOut(el)
  }
}
```

- `name` must be prefixed with `@`, see example below
- `modifiers` has the same values:
  - `enter`: call the `fade.enter()` animation function when the element enters the viewport
  - `leave`: call the `fade.leave()` animation function when the element leaves the viewport
  - `once`: destroy the observer once the first animation has been triggered


## Usage in Component

### `Viewport.observe()`

Observe an element in a specific scope and trigger the callback when it appears.

```js
import Component from 'modulus/component'

export default class extends Component {
  onInit() {

    this.$viewport.observe({
      target: document.querySelector('img[data-lazysrc]'),
      callback(el) {
        el.src = el.dataset.lazysrc
      }
    })

  }
}
```

You can also specify more options :
```js
{
  scope, // parent to limit observation, default: viewport
  target, // element to observe
  enter, // trigger when entering the scope
  leave, // trigger when leaving the scope
  once, // trigger only once
  callback // function to call
}
```

### `Viewport.affix()`

@todo

### `Viewport.scroll()`

@todo