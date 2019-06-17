# Container

Helper destiné à la gestion du conteneur.

Consulter le fichier : [container.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/container.scss).


## Configuration

L'utilisation d'un conteneur peut nécessiter sa configuration au préalable. Pour cela, il faut éditer le fichier: `src/assets/scss/settings/breakpoints.scss`.

Exemple d'une configuration possible:
```scss
$containers: (
  default: (
    padding: 20px,  // padding left/right
    max-width: 100% // largeur max du conteneur
  ),
  lg: (
    padding: 40px,
    max-width: 100%
  ),
  xxl: (
    padding: 0,
    max-width: 1440px
  ),
);
```
!> **Note importante :** Pour la gestion des breakpoints, seul `default` et les identifiants définis dans la variable `$breakpoints (xs, md, lg, xl...)` sont autorisés. L'utilisation d'une valeur non autorisé entrainera une erreur de compilation.

Deux paramétres de configuration sont possibles: `padding` et `max-width`. 

!> **Note importante :** La configuration est basée sur du mobile first. 

Dans notre exemple:
- `default = lg (max-width 1023px)`: max-width 100% ET padding gauche/droite de 20px
- `lg (min-width 1024px)`: max-width 100% ET padding gauche/droite de 40px
- `xxl (min-width 1600px)`: max-width 1440px ET padding gauche/droite de 0px

## Utilisation

Pour utiliser un conteneur, il suffit d'appeler la classe `.container`. 

```html
<!-- utilisation d'un conteneur -->
<div class="container"></div>
```