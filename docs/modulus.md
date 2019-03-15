# Modulus - Scoped Component Approach

Modulus is a framework capable of automatically load and use scoped component, adding logic to a DOM element.

- [How to](#how-to-create-a-component)
- [Lifecycle](#lifecycle)
- [API](#api)
- Base components:
  - [Accordion](modulus/components/accordion.md)
- Plugins:
  - [Viewport](modulus/plugins/viewport.md)
  - [Breakpoint](modulus/plugins/breakpoint.md)


## Folders and files

## Configuration and plugins

in `src/assets/js/`
```
main.js     -> modulus instance (register plugins and masters)
plugins/    -> plugins folder (add specific logic to all components)
  ...
masters/    -> masters folder (add global component attached to the body)
  page.js   -> default master component
  ...
```

## Components

Components are automatically loaded in Modulus, no action required.

in `src/views/components/`
```
header/         -> component folder
  header.html   -> template
  header.js     -> logic
  header.scss   -> styles
...
```

## How to create a component

Run `npm run create:component my-component` in your terminal, this will create 3 files:

- template: `src/views/my-component/my-component.html`
```html
<div class="my-component" data-mod="my-component">

</div>
```

- styles: `src/views/my-component/my-component.scss`
```css
.my-component {

}
```

- logic: `src/views/my-component/my-component.js`
```js
import Component from 'modulus/component'

export default class extends Component {

  onInit() {
    this.log('hello, this is [my-component] !')
  }

}
```

You can now include your fresh component in your page:
```hbs
{{> my-component}}
```


## Lifecycle

### Modulus

1. `Component`s are registered in the `Modulus` instance (`main.js`)
2. `Web Components` are registered in the customElements registry
3. `Modulus` parse the document looking for `[data-mod]` attributes
4. `Modulus` found a matching `Component` for the `[data-mod]` attribute:
    - the `Component` is instanciated
    - the `onInit()` method is called
5. DOM found a registered custom element:
    - the `Component` is instanciated
    - the `onInit()` method is called
6. once all `Component`s are loaded:
    - the `onReady()` method is called
7. when a `Component`'s DOM element is removed
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

#### `Component.onReady()`

Called when all Components are instanciated and ready to communicate, with the prupose of:
- triggering events

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