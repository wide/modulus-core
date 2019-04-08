# Viewport Plugin

@todo : à retravailler en français


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

## Enter / Leave animation

The viewport plugin will automatically attach an observer to the `data-anim` using the value as the transition name.

### CSS Animation

For the following, `fade` is the animation name used to apply css classes depending on the modifiers 
```html
<div data-anim="fade">
  ...
</div>
```

You can specific some options:
- `data-anim.when="enter|leave"` add `.fade-enter` (and remove `fade-leave`) when entering the viewport and/or add `.fade-leave` (and remove `fade-enter`) when leaving the viewport
- `data-anim.offset="-100px"` wait until the element is `100px` away from the border to trigger the transition

When no modifiers are set, defaults are `enter: true, leave: false, offset: '-120px'`

### JS Animation

For the following:
```html
<div data-anim="@fade">
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

The same modifiers as CSS animation apply.


## Lazy load

The viewport plugin will automatically attach an observer to the `data-src` attribute and load the value as `src` when the element appears
.

## API in Component

### `Viewport.observe()`

Observe an element in a specific scope and trigger the callback when it appears.

```js
import Component from 'modulus/component'

export default class extends Component {
  onInit() {

    this.$viewport.observe({
      target: document.querySelector('.foo'),
      callback: el => this.log('.foo is in the place!')
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
  once, // trigger only once and destroy the listener
  offset, // margin to defer the trigger (ex: '-100px')
  callback // function to call
}
```