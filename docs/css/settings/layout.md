# Layout

Fichier de configuration destiné à la définition des variables qui ont un impact sur le layout (ex: système de grille).

Consulter le fichier: [layout.scss](https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/layout.scss).


## Unités d'espacement

Les unités d'espacement permettent de définir des valeurs en `px` afin d'être utilisés pour des largeurs, hauteurs, margins, systène de grille et etc...
Vous êtes libre d'ajouter de nouvelles d'unités si cela est nécessaire à votre projet.

- `$unit`: Unité de grille pour desktop. *Valeur par défaut: `60px`* 

- `$unit-small`: Unité de grille pour mobile. *Valeur par défaut: `30px`* 


## Système de grille / largeur

- `$widths-fractions`: Permet de définir les fractions disponibles dans le système de grille. Par défaut, Moudlus fourni les fractions d'un tout, de moitiés, de tiers, quarts et cinquièmes *Valeur par défaut: `1 2 3 4 5`*.

- `$widths-offsets`: Si défini sur `true`, cela permet d'utiliser les classes pour décaler les éléments sur une certaine largeur (ex: `.w-pull-1/5`, `.w-push-1/2`,...). *Valeur par défaut: `false`*.

- `$fractions-delimiter`: Par défaut, Modulus gère des fractions du type `w-1/4`. Il est possible de changer le delimiter `/` par un autre caractère.

- `$breakpoint-delimiter`: Par défaut Modulus, gère les suffixes responsive pour les classes avec un symbole `@` (ex: `w-1/4@md`). Il est possible de changer le delimiter `@` par un autre caractère.