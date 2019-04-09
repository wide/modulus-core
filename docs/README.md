# Introduction

Le boilerplate est un ensemble d'outils, de templates et des processus de compilation pour accélérer et simplifier l'intégration.

![Oh Yeah!](https://media.giphy.com/media/dWEk3w1Uo97qw/giphy.gif)


## Structure des dossiers

```bash
dist/             # livrable de production
src/              # source de développement
  assets/
    fonts/            # polices (woff, ttf, svg)
    icons/            # icône SVG
    img/              # photos, images, logo...
    scss/             # style SCSSs
      settings/         # variables
      tools/            # mixins et functions
      generic/          # style de base (reset, normalize, grid, layout...)
      elements/         # élements natifs (headings, buttons, forms...)
      utilities/        # helpers (.text-right, .sr-only...)
      main.scss         # point d'entrée des @import
    js/               # logique JS utilisant la librairie Modulus
      plugins/          # plugin utilitaire partagé entre tous les composantns
      controllers/      # logique principale de la page, attaché au body
      utils/            # fonctions utilitaires
      vendors/          # librairies locales
      main.js           # points d'entrées de import
  views/    
    data/             # fausses données injectées dans les templates
    helpers/          # fonctions handlebars
    layouts/          # layout des pages
    pages/            # pages du site
    components/       # composants regroupant HTML, SCSS et JS
```


## Syntaxes et librairies

Les librairies utilisées pour compiler les différents assets sont :
- [Panini](https://foundation.zurb.com/sites/docs/panini.html) pour les pages `HTML`
- [SCSS](https://github.com/sass/node-sass) pour les styles `CSS` (avec le paradigme [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/))
- [Webpack](https://webpack.js.org) et [Babel](https://babeljs.io) pour la logique `JS` 

Afin de garantir la cohérence entre les projets utilisant le boilerplate, nous encourageont l'utilisation de :
- Minimal BEM pour l'`HTML` et le `SCSS` (résumé par `.block_element -modifier`)
- ES6 / Module pour le `JS` (`import / export / const / let / () => {}`)


## Quickstart

### Création d'un composant

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

  Voir la section [Component](modulus/component.md) pour l'utilisation de la class `Component`.


### Utilisation du composant

Ces trois fichiers sont automatiquement pris en compte par Modulus, aucune configuration n'est nécessaire.
Il est désormais possible d'inclure le composant dans une page :
```html
{{> my-component}}
```
