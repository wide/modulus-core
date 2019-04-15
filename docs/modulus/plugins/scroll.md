# Scroll Plugin

Ce plugin permet d'intéragir avec le scroll de la page, de calculer la progression ou encore de fixer un élement.

## Installation

Pour activer le plugin, l'instancier dans le `main.js`:

```js
import Modulus from 'modulus'
import Scroll from 'modulus/plugins/scroll'

export default new Modulus({
  plugins: {
    scroll: new Scroll()
  }
})
```

## Fonctionnement passif

### [data-scroll-to]

Permet de déclencher un smooth-scroll vers un élement en particulier :

```html
<button data-scroll-to=".top">go back to top</button>
```

### [data-parallax]

Permet d'ajouter un calcul de parallax sur l'élement (la valeur optionnelle est le coefficent de déplacement, par défaut `0.4` = `40%`) :

```html
<section>
  <div class="bg-img" data-parallax></div>
</section>
```

!> **Notes importantes :** le déplacement est géré en CSS avec la propriété `translateX` ou `translateY`

L'attribut optionnel `[data-parallax.axis]` est disponible, avec en valeur:
- `y` déplacement vertical, vers le bas (par défaut)
- `-y` déplacement vertical, vers le haut
- `x` déplacement horizontal, vers la droite
- `-x` déplacement horizontal, vers la gauche

### [data-sticky]

Permet de fixer un élement en `position: sticky`:

```html
<header data-sticky>...</header>
```

## Fonctionnement actif

### $scroll.to()

Permet de smooth-scroller vers un élement en paramètre (basé sur la lib [jump.js](http://callmecavs.com/jump.js/)) :

```js
import Component from 'modulus/component'

export default class extends Component {
  
  onInit() {
    this.$scroll.to('.top', { duration: 400 })
  }

}
```

Le 1e paramètre est l'élement vers lequel on scroll, peut être un `HTMLElement` ou un sélécteur CSS.

Le 2e paramètre sont les options possibles, voir le détails [dans la lib officielle](https://github.com/callmecavs/jump.js#options).


### $scroll.lock()

Permet de bloquer le scroll de la page (basé sur la lib [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)) :

```js
import Component from 'modulus/component'

export default class extends Component {
  
  onInit() {
    const dontBlockThisElement = this.el.querySelector('.that')
    this.$scroll.lock(dontBlockThisElement)
  }

}
```

Un paramètre optionel accepte un élément HTML pour autoriser le scroll dans celui-ci.

### $scroll.unlock()

Permet de débloquer le scroll de la page :

```js
import Component from 'modulus/component'

export default class extends Component {
  
  onInit() {
    this.$scroll.unlock()
  }

}
```

### $scroll.progress()

Permet de calculer la progression au scroll entre un point de départ et un point d'arrivé, la valeur du callback est le pourcentage de progression (basé sur la lib [uos](https://github.com/vaneenige/uos)) :

```js
import Component from 'modulus/component'

export default class extends Component {
  
  onInit() {

    // progress between 500px and 1500px in the page
    this.$scroll.progress(500, 1500, val => {
      this.log(val) // 0.6
    })
  }

}
```

### $scroll.sticky()

Permet de fixer un élement en position sticky (basé sur la lib [stickybits](https://github.com/dollarshaveclub/stickybits))

```js
import Component from 'modulus/component'

export default class extends Component {
  
  onInit() {
    const that = this.el.querySelector('.that')
    this.$scroll.sticky(that)
  }

}
```

## Evenements

Un évenement global `scroll` est déclenché à chaque tick avec les valeurs suivantes:
- `up` si le scroll remonte
- `down` si le scroll descend
- `value` la valeur du scroll en pixel
- `progress` la valeur du scroll en pourcentage

Ex:
```js
import Component from 'modulus/component'

export default class extends Component {
  
  onInit() {

    this.$on('scroll', e => {
      this.log(
        e.up,
        e.down,
        e.value,
        e.progress
      )
    })
  }

}
```