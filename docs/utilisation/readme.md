# Utilisation

- [Installation](/utilisation/installation.md)
- [Quickstart](/utilisation/quickstart.md)


## Structure des dossiers

```bash
build/            # tâches gulp pour compiler le livrable
dist/             # livrable de production
src/              # source de développement
  assets/
    fonts/            # polices (woff, ttf, svg)
    icons/            # icône SVG
    img/              # photos, images, logo...
    scss/             # styles SCSS
      settings/         # variables
      elements/         # élements natifs (headings, buttons, forms...)
      utilities/        # helpers (.text-right, .sr-only...)
      main.scss         # point d'entrée des @import
    js/               # logique JS
      utils/            # fonctions utilitaires (animations, transitions de page...)
      main.js           # points d'entrées de l'import
      consts.js         # enums et constantes
      polyfills.js      # permet de charger les polyfills sur demande
  views/    
    data/             # données injectées dans les templates
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