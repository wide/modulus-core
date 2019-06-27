# Settings

Pour initialiser rapidement votre projet, Modulus possède un certains nombre de variables Sass par défaut. Elles permettent de configurer les `composants`, `helpers` et `mixins` mis à disposition par Modulus.

!> **Note importante :** Afin d'assurer le bon fonctionnement de Modulus, vous ne devez pas supprimer les variables Sass présentent par défaut. Cependant, les valeurs de celles-ci restent modifiables à votre convenance.


La structure présente par défaut, permet de conserver une cohérence entre nos différents projets. Mais si cela est nécessaire, vous pouvez ajouter d'autres fichiers dans le répertoire `src/assets/scss/settings` pour vos variables Sass.

Les fichiers sont importés au sein du `main.scss`.

```scss
// modulus "Settings"
@import 'settings/animations';
@import 'settings/breakpoints';
@import 'settings/colors';
@import 'settings/env';
@import 'settings/fonts';
@import 'settings/layout';
@import 'settings/ratios';
``` 


**Fichiers settings présents dans Modulus :**

- [Animations](css/settings/animations.md)
- [Breakpoints](css/settings/breakpoints.md)
- [Colors](css/settings/colors.md)
- [Env](css/settings/env.md)
- [Fonts](css/settings/fonts.md)
- [Layout](css/settings/layout.md)
- [Ratios](css/settings/ratios.md)
