# (ROADMAP) Boilerplate intégration frontend - Wide

## Javascript

- Ne plus utiliser jQuery (sauf si contrainte client). Nous devons cibler nos besoins actuels pour déterminer leurs remplacements en Vanilla (ou grâce à l’utilisation de librairies). http://youmightnotneedjquery.com/

- Utilisation de ES2015 (vérifier l'utilité de Babel à l'heure actuelle...)

- Mise en place d'ESLint (nous pouvons utiliser la configuration de Yohann basée sur la syntaxe Airbnb).

- Développer un système de module JS scopé et avec la possibilité de passation de paramètres
    ```html
    <div data-module="MyModuleJavascript" data-args="{}">
      <!-- MyModuleJavascript is scoped here -->
    </div>
    ```

    ```js
    import { APP_NAME } from '../utils/environment';
    import AbstractModule from './AbstractModule';

    const MODULE_NAME = 'MyModuleJavascript';
    const EVENT_NAMESPACE = `${APP_NAME}.${MODULE_NAME}`;

    export default class extends AbstractModule {
      constructor(options) {
        super(options);

        // Declaration of properties
      }

      init() {
        // Set events and such
      }

      destroy() {
        super.destroy();
        this.$el.off(`.${EVENT_NAMESPACE}`);
      }
    }
    ```

- Développer gestionnaire de transition de page. Le but n'est pas de l'utiliser sur toutes les prods, mais qu'il soit présent directement sur le projet au besoin (il doit être désactivé par défaut et ne pas impliquer le back-end).

- Développer un gestionnaire de scroll (prévention d'Aymeric: « DOIT ÊTRE ULTRA OPTIMISÉ ») :
  - pouvoir connaitre le sens
  - pouvoir connaitre la position
  - pouvoir animer facilement des éléments si présent dans le inView avec une classe `.is-animate` (gestion du top, center, bottom et offset).
  - pouvoir gérer un élément en position sticky


- Intégrer les packages suivants:
  - [`debug`](https://www.npmjs.com/package/debug) : le but n'est de plus utiliser les `console.log` et d'éviter de les oublier une fois le site livré en production. Également utiliser le système de « channels » de `debug` au sein de nos moduleJS.

  - [`joi`](https://www.npmjs.com/package/joi): afin de vérifier les `Object`, `Array`, `String` et etc... le but est d'éviter les regex « fait maison » et lourde à maintenir.

  - [`Body scroll lock`](https://www.npmjs.com/package/body-scroll-lock): afin de gérer le « Scroll Locking » sur l'ensemble des plateformes plus facilement (pas mal de contraintes sans cette libraire sur iOS...)

  - [`bowser`](https://www.npmjs.com/package/bowser): utile pour détecter le navigateur client et pouvoir gérer des exceptions ou cas CSS/JS.

  - [`pjax`](https://www.npmjs.com/package/pjax): nécessaire pour la réalisation d'un gestionnaire de transition de pages (pour pouvoir réaliser des animations). 


## SCSS

- Mise en place d'un linter SCSS

- Mise en place de [`ITCSS: Scalable and Maintainable CSS Architecture`](https://www.npmjs.com/package/pjax) et utiliser la même structure de dossiers pour l'organisation de nos styles.
  - `Settings` – used with preprocessors and contain font, colors definitions, etc.
  - `Tools` – globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.
  - `Generic` – reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.
  - `Elements` – styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.
  - `Objects` – class-based selectors which define undecorated design patterns, for example media object known from OOCSS
  - `Components` – specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components
  - `Utilities` – utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class



- Préviligier dans la mesure du possible l'utilisation du `@supports`

- Préviligier l'utilisation du `em` plutôt que le `rem`, `px`... 

- Ajouter un système de debug permettant le calage des éléments à partir de la maquette.

- Utilisation de la syntaxe CSS `Minimal BEM` (voir exemple ci-dessous):
```html
  <!-- BEM -->
  <div class="block__element block__element--modifier"></div>
  <!-- Minimal BEM -->
  <div class="block_element -modifier"></div>
```
  

- Définir nos besoins: grilles, custom select, accessibilité, utils... et les intégrer au boilerplate

- Définir une configuration initiale: `breakpoints`, `easings`, `colors`, `fonts`... 


## Views

- Mise en place de [`Panini`](https://www.npmjs.com/package/panini) (rajouter les helpers manquants pour se rapprocher du système de vue [`Pug`](https://www.npmjs.com/package/pug))

- Utilisation de la balise `data-js-*` pour cibler un élément via javascript (ne plus utiliser les classes CSS).

- Création des composants `favicons`, `metas` (social cards, meta config...) et les appeler par défaut dans le `Layout`.   


## Général

- Gérer les cas d'environnement (`.env` ou via le lancement de la commande `npm`) pour déterminer si le projet est executé en `DEV` ou `PROD`.

- Utiliser le `.editorconfig` ci-dessous et installer le plugin sur tous les éditeurs utilisés sur le pôle front : https://editorconfig.org/#download
```ini
# editorconfig.org
root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = false
``` 

_/!\ Dans le cas d'un projet existant, merci de vérifier la structure du code avant d'ajouter ce type de fichier_

- Génération du `.gitignore`

- Mise en place de [`Webpack`](https://webpack.js.org/)




