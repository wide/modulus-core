# Component

Un composant est un élément central de Modulus, il permet d'ajouter de la logique JS à un élément HTML.


## Création d'un composant

Pour créer un nouveau composant, lancer la commande suivante :
```
npm run create:component my-component
```

Cela va créer trois fichiers dans `src/views/my-component/`:

- `src/views/my-component/my-component.html`
  ```html
  <div class="my-component" data-mod="my-component">

  </div>
  ```

  *Note: l'attribut `[data-mod]` permet de connecter automatiquement le template au composant JS*

- `src/views/my-component/my-component.scss`
  ```css
  .my-component {

  }
  ```

- `src/views/my-component/my-component.js`
  ```js
  import Component from 'modulus/component'

  export default class extends Component {

    onInit() {
      
    }

  }
  ```


## Propriétés

### this.el

L'élement HTML associé de type `HTMLELement`.

### this.attrs

Les attributs de l'élement HTML, par ex: 
```html
<div foo="bar"></div>
```
donnera :
```js
{
  foo: 'bar'
}
```

### this.dataset

Les attributs `[data-*]` de l'élement HTML, par ex:
```html
<div data-foo="bar"></div>
```
donnera :
```js
{
  foo: 'bar'
}
```

### this.refs

Les élements enfants automatiquement selectionnés avec l'attribut `[ref]`, par ex:
```html
<button ref="btn">go</button>
```
donnera :
```js
{
  btn: HTMLButtonElement
}
```

### this.$uid

L'identifiant unique du composant, concaténation du type de composant et de son ID ou de son numéro incrémental, par ex:
- `<div data-mod="my-component"></div>` donnera `my-component#1`
- `<div data-mod="my-component" id="plop"></div>` donnera `my-component#plop`


## Hooks

Les hooks sont des méthodes automatiquement appelées par Modulus au cours du cycle de vie du composant :

- `onInit()` est appelé dès que le composant est instancié et configuré
- `onDestroy()` est appelé dès que l'élement est supprimé du DOM (changement de page ou action manuelle)

**Note importante :** `onInit()` agit comme le constructeur, ne pas surcharger `constructor()` à la place !


## Méthodes

### this.log(...args)

Log un message dans la console avec l'`$uid` du composant pour une meilleure tracabilité.

Les niveaux de sévérité `debug`, `info`, `warn` ou `error` peuvent être utilisé de la sorte :
```js
this.log.warn('oops')
```

### this.$on(event, callback)

Permet d'écouter un évenement global à tous les plugins et composants :

```js
this.$on('hello', name => this.log(`received hello ${name}`))
```

### this.$emit(event, ...args)

Permet d'émettre un évenement global à tous les plugins et composants :

```js
this.$emit('hello', 'you')
```