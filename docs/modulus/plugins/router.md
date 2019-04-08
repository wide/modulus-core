# Router Plugin

Ce plugin permet de gérer les transitions entre les pages au moyen de la librairie [PJax](https://github.com/MoOx/pjax), une fois activé tout changement d'url entrainera :
1. un chargement asynchrone
2. une transition de chargement
3. un remplacement du DOM
4. une transition d'apparition

## Installation

Pour activer le plugin, l'instancier dans le `main.js`:

```js
import Modulus from 'modulus'

import Router from 'modulus/plugins/router'
import transitions from '~/utils/transitions'

export default new Modulus({
  plugins: {
    router: new Router({ transitions, fallback: 'fade' }),
  }
})
```

### router.config

Permet de configurer les variables de fonctionnement suivantes :

| variable | par défaut | description |
| --- | --- | --- |
| `transitionAttr` | `data-transition` | Appliqué aux balises `<a>`, défini le nom de sla transition à executer |

### router.transitions

La liste des transitions possibles, sous la forme suivante :

```js
{
  name: {
    loading: el => new Promise(),
    loaded: el => new Promise(),
  }
}
```

La transition de chargement `loading` est appliquée lorsque le l'url change, `loaded` est appliquée lorsque le contenu est remplacé et prêt à être affiché.

Le paramètre `el` est le conteneur de la page (par défaut `<main>`).

**Note importante :** les méthodes `loading` et `loaded` doivent retourner une `Promise` !

### router.fallback

Le nom de la transition par défaut à appliquer lorsque rien n'est spécifié, par défaut `noop` (ne fait rien).

### router.container

Le sélecteur CSS du conteneur à remplacer, par défaut `<main>`.


## Utilisation

### Dans le template

Pour spécifier une transition lors du click sur un lien, ou du submit d'un formulaire, ajouter l'attribut `data-transition`:

```js
<a href="foo.html" data-transition="fade">go to foo</a>
```

Les transitions `fade.loading` et `fade.loaded` seront alors appliquées.


### Dans la logique

Il est possible de déclencher une navigation dans un composant avec la méthode `go()`:

```js
  import Component from 'modulus/component'

  export default class extends Component {

    onInit() {
      this.$router.go('foo.html', { transition: 'fade' })
    }

  }
```


## Evenements

Le router emet des évenement pour chaque requête avec en paramètre l'élement conteneur (`<main>`), à savoir :
- `route.change` au début de la requête asynchrone, avant la transition de chargement
- `route.destroy` à la fin de la requête asynchrone, avant le remplacement du contenu
- `route.loaded` après le remplacement de contenu, avant la transition d'apparition

Ces events sont utiles pour détruire les écouteurs et les recréer à partir du nouveau DOM, ex:

```js
import Plugin from 'modulus/plugin'

export default class extends Plugin {
  
  onInit() {

    this.observeSomething()

    this.$on('route.destroy', root => {
      this.clearObservers(root)
    })

    this.$on('route.loaded', root => {
      this.observeSomething(root)
    })
  }

}
```