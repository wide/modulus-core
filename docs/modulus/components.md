# Components

## API

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