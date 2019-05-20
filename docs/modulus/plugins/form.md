# Form Plugin

Ce plugin permet d'ajouter des classes CSS dynamiquement en fonction de l'état d'un formulaire.

## Installation

Pour activer le plugin, l'instancier dans le `main.js`:

```js
import Modulus from 'modulus'
import Form from 'modulus/plugins/form'

export default new Modulus({
  plugins: {
    breakpoint: new Form()
  }
})
```

## Fonctionnement passif

### `.-touched`

Est ajouté à l'input et le `<form>` si l'utilisateur focus/blur l'élément.

### `.-changed`

Est ajouté à l'input et le `<form>` si la valeur de l'élément change.

### `.-invalid`

Est ajouté à l'input et le `<form>` si l'élément ne passe pas le contrôle de validité natif (`required`...).