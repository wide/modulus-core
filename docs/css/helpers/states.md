# States

Helper destiné à la gestion des différents états.

Consulter le fichier : [states.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/states.scss).


## Contrôler la visibilité sans affecter le flux

Rendre un élément visible sans affecter le flux:
```html
<!--
  CSS appliqué:
  -  visibility: visible !important;
  -  opacity: 1 !important;
-->
<div class="is-visible"></div>
```

Rendre un élément invisible sans affecter le flux:
```html
<!--
  CSS appliqué:
  -  visibility: hidden !important;
  -  opacity: 0 !important;
-->
<div class="is-invisible"></div>
```


## Supprimer un élément du flux et des lecteurs d'écrans

Supprimer un élément sur tous les types de supports
```html
<!-- 
  CSS appliqué:
  - display: none !important;
  - visibility: hidden !important;
-->
<div class="is-hidden"></div>
```

Pour supprimer un élément uniquement sur un support de type `screen`:
```html
<!-- Supression uniquement si le support est de type @media screen -->
<div class="is-hidden@screen"></div>
```

Pour supprimer un élément uniquement sur un support de type `print`:
```html
<!-- Supression uniquement si le support est de type @media print -->
<div class="is-hidden@print"></div>
```


## Afficher un élément masqué par défaut

```html
<!-- 
  CSS appliqué: 
  - display: block !important;
  - visibility: visible !important;
-->
<div class="is-shown"></div>
```

```html
<!-- 
  CSS appliqué: display: table !important;
-->
<table class="is-shown"></table>
```

```html
<!-- 
  CSS appliqué: display: table-row !important;
-->
<tr class="is-shown"></tr>
```

```html
<!-- 
  CSS appliqué: display: table-cell !important;
-->
<th class="is-shown"></th>
<td class="is-shown"></td>
```
