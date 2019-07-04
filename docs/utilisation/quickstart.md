# Quickstart

## Création d'une nouvelle page

Ajouter votre page dans `src/views/pages` en tant que fichier `.html`.

Ce référer à la doc de [Panini](https://foundation.zurb.com/sites/docs/panini.html) pour l'utilisation du template.

## Création d'un composant

Pour créer un nouveau composant, lancer la commande suivante :
```
npm run create:component my-component
```

Cela va créer trois fichiers dans `src/views/my-component/`:

**Le template:** `src/views/my-component/my-component.html`
```html
<div class="my-component" data-mod="my-component">

</div>
```

> *Note: l'attribut `[data-mod]` permet de connecter automatiquement le template au composant JS*

**Les styles:** `src/views/my-component/my-component.scss`
```css
.my-component {

}
```

**La logique:** `src/views/my-component/my-component.js`
```js
import Component from 'modulus/component'

export default class extends Component {

  onInit() {
    // your magic code starts here
  }

}
```

Voir la section [Component](modulus/component.md) pour l'utilisation de la class `Component`.


## Utilisation du composant

Ces trois fichiers sont automatiquement pris en compte par Modulus, aucune configuration n'est nécessaire.
Il est désormais possible d'inclure le composant dans une page :
```html
{{> my-component}}
```