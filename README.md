# Wide Boilerplate Integration

## Installation
```
npm install
```

## Usage
```
# build project for development
npm start

# build project for production
npm run build
```

## Modulus System

Attach scoped JS classes to specific DOM elements :

```html
<!-- src/views/partials/header.html -->
<header data-mod="Header" data-foo="bar">
  <nav>...</nav>
</header>
```

```js
// src/assets/js/modules/header.js
import { Module } from 'modulus'

export default class Header extends Module {

  // method called when the module is attached to the DOM element
  onInit() {
    this.el // DOM element <header>
    this.data // { foo: 'bar' }
    this.nav = this.el.querySelector('nav') // inner DOM element <nav>
    this.$log('hello!') // console.log('Modulus@Header_0: hello!')
    this.$on('event', () => this.doSomething()) // listen global event
    this.$emit('event') // dispatch global event
  }

}
```

```js
// src/assets/js/main.js
import { Modulus } from 'modulus'
import Header from './modules/header'

Modulus.boot({
  config: {
    debug: true
  },
  modules: {
    Header
  }
})
```