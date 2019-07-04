# Widths

Helper destiné à la gestion des largeurs dynamiques sous forme de fraction.

Consulter le fichier: [widths.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/widths.scss).

Ce helper, utilise le mixin: [widths.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/tools/widths.scss).

## Configuration

Par défaut, les fractions d’un entier, de moitiés, de tiers, de quarts et de cinquièmes sont disponibles. Pour en ajouter d'autres, vous devez modifier la variable `$widths-fractions` dans le fichier de configuration: [layout.scss](https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/layout.scss).

```scss
///
/// Which fractions would you like in your grid system(s)?
/// By default, the boilerplate provides fractions of one whole, halves, thirds,
/// quarters, and fifths, e.g.:
///
/// @example css
///   .w-1/2
///   .w-2/5
///   .w-3/4
///   .w-2/3
///
$widths-fractions: 1 2 3 4 5 !default;
```


## Définir une largeur

Modulus gère le fait de pouvoir définir une largeur sous forme de fraction. Pour cela, il suffit d'utiliser la classe `.w-X/Y` (remplacer `X` et `Y` par les valeurs de la fraction souhaitée). 

Voici quelques exemples :

```html
<!-- largeur de 1/3, soit: 33.33% -->
<div class="w-1/3"></div>
```

```html
<!-- largeur de 1/2, soit: 50% -->
<div class="w-1/2"></div>
```

```html
<!-- largeur de 1/3, soit: 66.66% -->
<div class="w-2/3"></div>
```


## Définir un décalage

La classe `.w-push-*` permet d'effectuer un décalage d'un élément sur la gauche.

```html
<!-- décalage de 1/4 d'un élément par sa gauche -->
<div class="w-push-1/4"></div>
```

La classe `.w-pull-*` permet d'effectuer un décalage d'un élément sur la droite.

```html
<!-- décalage de 3/4 d'un élément par sa droite -->
<div class="w-pull-3/4"></div>
```

La combinaison d'une largeur et d'un décalage est possible.

```html
<!--
  décalage de 1/4 d'un élément par sa gauche
  taille de l'élément de 1/2, soit 50%
-->
<div class="w-push-1/4 w-1/2"></div>
```


## Breakpoints

Il est également possible de spécifier une largeur à partir d'une certaine résolution *(mobile first)*. 

Les breakpoints disponibles, sont ceux définies dans la variable `$breakpoints` du fichier de configuration [breakpoints.scss](https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/breakpoints.scss). Soit par défaut: `xs`, `sm`, `md`, `lg`, `xl`, et `xxl`.

```html
<!--
(par défaut) largeur de 1/2, soit: 50% 
(à partir de "lg") largeur de 1/3, soit: 33.33% 
(à partir de "xxl") largeur de 1/4, soit: 25% 
-->
<div class="w-1/2 w-1/3@lg w-1/4@xxl"></div>
```

Les breakpoints fonctionnent également avec le décalage des éléments `.w-push-*` et `.w-pull-*`. 

```html
<!--
(par défaut) élément décalé de 1/4 par la gauche, soit: 25% 
(à partir de "xxl") élément décalé de 1/2 par la gauche, soit: 25% 
-->
<div class="w-push-1/4 w-push-1/2@xxl"></div>
```

```html
<!--
(par défaut) élément décalé de 1/4 par la droite, soit: 25% 
(à partir de "xxl") élément décalé de 1/2 par la droite, soit: 25% 
-->
<div class="w-pull-1/4 w-pull-1/2@xxl"></div>
```