# Breakpoint Plugin

@todo : à retravailler en français


## Installation

In `main.js`
```js
import Breakpoint from 'modulus/plugins/breakpoint'

const sizes = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export default new Modulus({
  plugins: {
    breakpoint: new Breakpoint({ sizes })
  }
})
```


## Usage

By default, the plugin will emit a `breakpoint` event each time the window width change.

```js
import Component from 'modulus/component'

export default class extends Component {
  onInit() {

    this.$on('breakpoint', bp => {
      // @todo
    })

  }
}
```


### `Breakpoint.up()`

Check if the current window width matches a specific breakpoint.

```js
import Component from 'modulus/component'

export default class extends Component {
  onInit() {

    if(this.$breakpoint.up('lg')) {
      // @todo
    }

  }
}
```