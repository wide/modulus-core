# Viewport Plugin

Ce plugin permet d'observer un élement et d'executer des callbacks lorsqu'il entre ou sort du viewport.


## Installation

Pour activer le plugin, l'instancier dans le `main.js`:

```js
import Modulus from 'modulus'

import Viewport from 'modulus/plugins/viewport'
import animations from '~/utils/animations'

export default new Modulus({
  plugins: {
    viewport: new Viewport({ animations }),
  }
})
```

### viewport.config

Permet de configurer les variables de fonctionnement suivantes :

| variable | par défaut | description |
| --- | --- | --- |
| `animOffset` | `-120px` | La marge appliquée pour déclencher les animations |


### viewport.animations

La liste des animations JS possibles, sous la forme suivante :

```js
{
  name: {
    enter: el => doSomething(),
    leave: el => doSomethingElse()
  }
}
```

L'animation d'entrée `enter` est appliquée lorsque l'élement apparait dans le viewport, à l'inverse `leave` est appliquée lorsqu'il sort.


## Fonctionnement passif

### [data-anim]

Permet de spécifier une animation sur un élement :

```html
<div data-anim="name">

</div>
```

La valeur de l'attribut peut prendre 2 formes:
- `name` appliquera les classes CSS `name-enter` et `name-leave`
- `@name` appliquera les fonctions JS `name.enter()` et `name.leave()`

Les attributs optionnels suivants sont disponibles:
- `[data-anim.when]` avec les valeurs possibles `enter`, `leave` ou `enter|leave` permet de spécifier quand l'animation se déclenche (par défaut `enter` seulement)
- `[data-anim.offset]` spécifie le décalage pour le déclenchement du callback sous la forme `{valuer}px` (par défaut `-120px`)

### [data-src]

Permet de retarder le chargement d'une image à son entrée dans le viewport :

```html
<img data-src="image.jpg" />
```


## Fonctionnement actif

### $viewport.observe()

Permet d'observer un élement plus finement et d'appliquer un callback custom:

```js
import Component from 'modulus/component'

export default class extends Component {

  onInit() {
    this.$viewport.observe({
      target: document.querySelectorAll('.target') // le ou les élements à observer
      enter: true, // déclencher le callback à l'entrée du viewport
      leave: false, // déclencher le callback à la sortie du viewport
      once: true, // détruit l'écouteur après une éxecution du callback
      offset: '-120px', // la marge de déclenchement
      callback() {} // la fonction à executer
    })
  }

}
```