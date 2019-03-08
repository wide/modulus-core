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

## Modulus: quickstart

See [Modulus docs](docs/modulus.md) for more.

Attach scoped JS classes to specific DOM elements :

`src/views/partials/header.html`
```html
<header data-mod="Header">
  <nav>...</nav>
</header>
```

`src/assets/js/modules/header.js`
```js
import Component from 'modulus/component'

export default class Header extends Component {

  // method called when the module is attached to the DOM element
  onInit() {

    this.el // DOM element <header>
    this.dataset // { foo: 'bar' }

    this.nav = this.el.querySelector('nav') // inner DOM element <nav>
    this.$log('hello!') // console.log('Header_0: hello!')
    this.$on('event', () => this.doSomething()) // listen global event
    this.$emit('event') // dispatch global event
  }

}
```

`src/assets/js/main.js`
```js
import Modulus from 'modulus'
import Header from './components/header'

export default new Modulus({
  components: {
    Header
  }
})
```