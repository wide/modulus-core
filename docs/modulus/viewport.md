# Modulus - Viewport plugin

## Usage

```js
import viewport from 'modulus/plugins/viewport'

viewport.observe({
  target: document.querySelector('img[data-lazysrc]'),
  callback(el) {
    el.src = el.dataset.lazysrc
  }
})
```

The `callback` function will be called when the target appears in the viewport.

You can also specify more options :
```js
{
  scope // parent to limit observation, default: viewport
  target // element to observe
  once // triggered only once
  callback // function to call
}
```