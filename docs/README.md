# Introduction

Hey toi ! Bienvenue dans la docs de **The Boiler** !

Ici tu vas apprendre à dompter et maitriser cet outil qui accélére et simplifie grandement l'intégration.
**The Boiler** est un framework *prêt-à-coder* qui embarque des librairies pré-configurées, des templates `HTML`, `SCSS` et `JS`, des tâches de compilations et des plugins de toute sorte, le tout optimisé et performant. Ne te reste qu'à te faire un bon café et à relever les manches.

![Oh Yeah!](https://media.giphy.com/media/dWEk3w1Uo97qw/giphy.gif)


## Feedback

> "On va conquérir le monde !" - Aymeric

> "Franchement, ça dépote pas mal." - Julien

> "Mouai..." - Antho

> "Moi tu sais, tant qu'il n'y a pas JQuery..." - Kevin

> "On peut taper les chefs de projet avec ?" - Anna

> "C'est quoi querySelectorAll ?" - Séb

> "On va au billard ?" - Adrien


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
