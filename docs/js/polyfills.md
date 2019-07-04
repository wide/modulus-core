# Polyfills

Modulus gère le chargement des polyfills sur demande en fonction de la version du navigateur.
Cela permet de ne pas pénaliser les navigateurs modernes avec des polyfills inutiles.

## Configuration

Dans le fichier `src/assets/js/polyfills.js`:
```js
import polyfiller from 'modulus/polyfiller'

const polyfills = [{
  files: [
    'babel',
    'intersection-observer'
  ],
  satisfies: {
    'Internet Explorer': '<=11'
  }
}, {
  files: ['object-fit'],
  satisfies: {
    'Chrome': '<=30',
    'Firefox': '<=35',
    'Internet Explorer': '<=11',
    'Microsoft Edge': '<=18',
    'Opera': '<=18',
    'Safari': '<=10'
  }
}, {
  files: ['picturefill'],
  satisfies: {
    'Chrome': '<=37',
    'Firefox': '<=37',
    'Internet Explorer': '<=11',
    'Microsoft Edge': '<=12',
    'Opera': '<=24',
    'Safari': '<=9'
  }
}]

polyfiller({
  root: `${window.$config.root}assets/js/polyfills/`,
  polyfills
})
```

La variable `polyfills` accepte une collection de condition, chacun déterminé par 2 propriétés:
- `files` le noms des fichiers situés dans `src/assets/js/polyfills`
- `satisfies` les conditions de chargement des fichiers