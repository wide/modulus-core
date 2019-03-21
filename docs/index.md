# Documentation

The boilerplate is a ready-to-use framework of `HTML`, `CSS` and `JS` files packed with build processes in order to speed up integration.
Do not compare it with a JS framework such as Angular or Vue as it does not include runtime rendering but instead build and serve static files only.


## File structure

```bash
dist/             # where static files will be generated
src/              # whre magic happens
  assets/
    fonts/            # font files such as woff, ttf, svg
    icons/            # svg icons
    img/              # pictures, logo...
    scss/             # global scss styles, use ITCSS structure (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
      settings/         # variables
      tools/            # mixins and functions
      generic/          # base style such as reset, normalize, grid, layout...
      elements/         # native elements such as headings, buttons, forms...
      objects/          # ignore, to be removed soon
      utilities/        # helper classes such as .text-right, .sr-only...
      main.scss         # entry file where all @import are done
    js/               # global js logic, use Modulus system (see "Component" part)
      plugins/          # utilities shared across all components such as Viewport, Breakpoint...
        viewport.js       # add functions to observe an element in the viewport and trigger animation when it appears
        breakpoint.js     # add functions to get the current breakpoint and dispatch global event on viewport resizing
      masters/          # main logic ruling the page (not attached on a DOM element)
        page.js           # default master handling body scroll lock
      utils/            # utilities for simple operation
        animations.js     # collection of enter/leave animations used by the viewport plugin
        string.js         # string transformation function
        dom.js            # dom manipulation such as slideUp/slideDown
      vendors/          # local libraries that cannot be loaded using NPM (for ex: Modulus)
      consts.js         # constant values such as BREAKPOINTS and ANIM_DURATION
      main.js           # entry file where Modulus is instanciated with plugins and masters
      polyfill.js       # polyfill for old browser
  views/    
    data/             # dummy data to inject in your templates
      env.js            # env.PROD and env.DEV
      site.yml          # basic info for <head> (title, description, socials)
    helpers/          # handlebars helper functions
    layouts/          # main template wrapping your pages
      default.html      # default layout with all needed <meta>, includes header and footer
    pages/            # pages of your site
      index.html        # empty homepage
    components/       # independant component, most of your work happens here
      header/           # a component folder, contains html, scss and js, automatically built
        header.html       # html template
        header.scss       # styles
        header.js         # modulus component
```


## Languages and libraries

The boilerplate includes a set of libraries to speed up and simplified the development process:
- `HTML` files are compiled using [Panini](https://foundation.zurb.com/sites/docs/panini.html)
- `CSS` files are compiled using [SCSS](https://github.com/sass/node-sass)
- `JS` files are transpiled using [Webpack](https://webpack.js.org) and [Babel](https://babeljs.io)

To keep a certain consistency across all projects using this boilerplate, we encourage to use:
- Minimal BEM for both `HTML` and `SCSS` (summarized as `.block_element -modifier`)
- ES6 / Module for `JS` (`import / export / const / let / () => {}`)


## Getting started

### Start development mode with hot reloading

To automatically build and refresh your pages on change, run the following command:
```
npm start
```

### Create a component

To create the component's file (html, scss and js), run the following command:
```
npm run create:component my-component
```

#### Template: `src/views/my-component/my-component.html`

```html
<div class="my-component" data-mod="my-component">

</div>
```

*Note: the `[data-mod]` attribute connect the JS class logic to the DOM element*

#### Styles: `src/views/my-component/my-component.scss`

```css
.my-component {

}
```

#### Logic: `src/views/my-component/my-component.js`

```js
import Component from 'modulus/component'

export default class extends Component {

  onInit() {
    this.log('hello, this is [my-component] !')
  }

}
```

See [Modulus](modulus.md) docs on how to use the `Component` class.


#### Usage

Theses 3 files are automatically registered during the build process, no need to add them somewhere.
You can now include your fresh component in your page:
```html
{{> my-component}}
```

### Build for production

Run the NPM command `npm run build` to build all static files needed for production.