# Plugin

Liste des plugins natifs :
- [Router](modulus/plugins/router.md)
- [Scroll](modulus/plugins/scroll.md)
- [Viewport](modulus/plugins/viewport.md)
- [Breakpoint](modulus/plugins/breakpoint.md)

### Créer un plugin

Lancer la commande suivante :
```
npm run create:plugin my-plugin
```

Le fichier `plugins/my-plugin.js` est généré:
```js
import Plugin from 'modulus/plugin'

export default class MyPlugin extends Plugin {

  constructor() {

  }

  onInit() {
    
  }

}
```

Une fois créée, vous devez l'enregistrer dans l'instance de Modulus dans le `main.js`:
```js
import Modulus from 'modulus'
import MyPlugin from '~/plugins/my-plugin'

export default new Modulus({
  plugins: {
    myPlugin: new MyPlugin()
  }
})
```

De cette manière, tous les composants ont désormais accès à `this.$myPlugin`.