# Layout

Helper destiné à la gestion du layout.

Consulter le fichier : [layout.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/layout.scss).


## Clearfix

Pour empecher les éléments flottants de dépasser de leur conteneur, vous devez utiliser la classe `.clearfix`. 

```html
<!-- Empecher les éléments flottants de dépasser de leur conteneur -->
<div class="clearfix">
  <div class="float-left">element de type float</div>
  <div class="float-right">element de type float</div>
</div>
``` 

## Tronquer une zone de texte

Pour tronquer du texte et l'empêcher d'être placé sur plusieurs lignes, vous devez utiliser la classe `.truncate`.

```css
.my-element { width: 250px; }
```

```html
<!-- tronquer une zone de texte -->
<div class="my-element">
  <p class="truncate">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
</div>
```