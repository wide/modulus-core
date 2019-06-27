# Grid

Helper destiné à la gestion de la grille présente dans Modulus. 

Consulter le fichier : [grid.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/grid.scss).

## Configuration



## Utilisation

!> **Note importante :** L'utilisation de la grille est dépendante au helper [Widths](css/helpers/widths.md). Pour cela, vous devez vérifier que le helper `Widths` soit actif dans votre fichier `main.scss`.

À la différence de Bootstrap, cette grille ne nécessite pas de définir les lignes ou colonnes dans le DOM. Nous définissons uniquement des éléments de type `.grid_item` avec une largeur (idéalement sous forme de fraction ou en %).


## Grille basique

```html
<!--
  1# largeur de 3/4 soit: 75% (présent sur la ligne 1 dans la grille)
  2# largeur de 1/4 soit: 25% (présent sur la ligne 1 dans la grille)
  3# largeur de 3/4 soit: 75% (présent sur la ligne 2 dans la grille)
  4# largeur de 1/4 soit: 25% (présent sur la ligne 2 dans la grille)
-->
<div class="grid">
  <div class="grid_item w-3/4">1#</div>
  <div class="grid_item w-1/4">2#</div>
  <div class="grid_item w-3/4">3#</div>
  <div class="grid_item w-1/4">4#</div>
</div>
```

## Grille basique avec la gestion du responsive

Pour gérer le responsive, vous pouvez spécifier un breakpoint directement à partir d'une classe (exemple: `w-1/3@md`). 

Voir la doc référente: [Widths - Breakpoints](/css/helpers/widths?id=breakpoints)

```html
<!--
  (par défaut) Les éléments ont une largeur de 1/2 soit: 50%
  (à partir du breakpoint `md`) Les éléments ont une largeur de 1/3 soit: 33.33%
-->
<div class="grid">
  <div class="grid_item w-1/2 w-1/3@md"></div>
  <div class="grid_item w-1/2 w-1/3@md"></div>
  <div class="grid_item w-1/2 w-1/3@md"></div>
</div>
```

## Inversion de l'ordre des items

Pour inverser l'ordre d'apparition des items de la grille, vous devez utiliser le modifier `-reverse`:

```html
<div class="grid -reverse">
  <div class="grid_item w-1/2"></div>
  <div class="grid_item w-1/2"></div>
</div>
```

## Alignement horizontal

Pour un alignement horizontal au centre, il faut ajouter le modifier `-center`:
```html
<div class="grid -center">
  <div class="grid_item w-1/2"></div>
  <div class="grid_item w-1/2"></div>
</div>
```

Pour un alignement horizontal à droite, il faut ajouter le modifier `-right`: 
```html
<div class="grid -right">
  <div class="grid_item w-1/2"></div>
  <div class="grid_item w-1/2"></div>
</div>
```

## Ajouter une gouttière

Par défaut, il y a 2 gouttières de disponibles dans le système de grille: 
- `-gutter`: qui a pour valeur `$unit`
- `-gutter-small`: qui a pour valeur `$unit-small`

!> **Note importante :** Les valeurs `$unit` et `$unit-small` sont configurées dans le fichier de configuration [layout.scss](`https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/layout.scss`)

```html
<!-- Gutter qui a pour valeur $unit --> 
<div class="grid -gutter">
  <div class="grid_item w-1/2"></div>
  <div class="grid_item w-1/2"></div>
</div>
```

```html
<!-- Gutter qui a pour valeur $unit-small --> 
<div class="grid -gutter-small">
  <div class="grid_item w-1/2"></div>
  <div class="grid_item w-1/2"></div>
</div>
```

Pour ajouter une nouvelle gouttière, il faut surcharger cet helper. Pour cela, vous devez créer un fichier `grid.scss` dans le répertoire `src/assets/scss/helpers` de votre projet.

Exemple de surchage, pour l'ajout d'une nouvelle gouttière: 
```scss
.grid {
  &.-my-gutter {
    margin-left: -$unit;
  }

  &._item {
    .grid.-my-gutter > & {
      padding-left: $unit;
    }
  }
}
```

## Utilisation de Flexbox sur la grille 

Pour utiliser Flexbox avec la grille, il faut ajouter le modifier `-flex`:

```html
<div class="grid -flex">
  <div class="grid_item w-1/2"></div>
  <div class="grid_item w-1/2"></div>
</div>
```

Avec une grille en Flexbox, les modifiers `-top`, `-middle`, `-bottom` et `-stretch` sont présents. Cela permet de définir la propriété `align-items` qui doit être utilisée.

```html
<div class="grid -flex -middle">
  <div class="grid_item w-1/2"></div>
  <div class="grid_item w-1/2"></div>
</div>
```