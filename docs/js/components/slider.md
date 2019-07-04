# Slider

Slider accessible AA, basé sur `Swiper`.

## Usage

Votre composant doit hériter la class `Slider` pour activer les fonctionnalités sur votre élément :

```js
import Slider from 'modulus/components/slider'

export default class extends Slider {

  onInit() {
    super.onInit({  // activate slider with swiper config
      loop: true,
      autoplay: true,
      spaceBetween: 40,
      slidesPerView: 3
    })
  }

}
```

@todo