# Modulus - Accordion plugin

Must use the following template :
```html
<div data-mod="accordion">
  <button id="trigger-1" aria-expanded="false" aria-controls="body-1">
    Trigger 1
  </button>
  <div id="body-1" role="region" aria-labelledby="trigger-1" hidden>
    <div class="content">
      Body 1
    </div>
  </div>
</div>
```


## Usage

### Direct

In `main.js`
```js
import Modulus from 'modulus'
import Accordion from 'modulus/components/accordion'

export default new Modulus({
  components: {
    Accordion
  }
})
```

### Extending the base class

@todo