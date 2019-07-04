# Form Plugin

Ce plugin permet d'ajouter des classes CSS dynamiquement en fonction de l'état d'un formulaire.

## Installation

Pour activer le plugin, l'instancier dans le `main.js` avec les classes css (optionnel):

```js
import Modulus from 'modulus'
import Form from 'modulus/plugins/form'

export default new Modulus({
  plugins: {
    breakpoint: new Form({
      parent: 'form-line',
      required: '-required',
      empty: '-empty',
      touched: '-touched',
      changed: '-changed',
      submitted: '-submitted',
      invalid: '-invalid'
    })
  }
})
```

## Fonctionnement passif

### `.-required`

Est ajouté à l'input et le parent au chargement si l'input a l'attribut `required`.

### `.-touched`

Est ajouté à l'input, le parent et le `<form>` après une interaction.

### `.-changed`

Est ajouté à l'input, le parent et le `<form>` si la valeur change après une interaction.

### `.-empty`

Est ajouté à l'input et le parent si la valeur est vide après une interaction.

### `.-invalid`

Est ajouté à l'input, le parent et le `<form>` si l'élément ne passe pas le contrôle de validité natif (`required`, `pattern`...).

### `.-submitted`

Est ajouté au `<form>` après soumission.