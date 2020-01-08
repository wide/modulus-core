# Visibility

Helper destiné à la gestion des différents états de type `visibility`.

Consulter le fichier: [visibility.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/visibility.scss).


## Contrôler la visibilité sans affecter le flux

Rendre un élément visible sans affecter le flux:
```html
<!--
  CSS appliqué:
  -  visibility: visible !important;
  -  opacity: 1 !important;
-->
<div class="h-visible"></div>
```

---

Rendre un élément invisible sans affecter le flux:
```html
<!--
  CSS appliqué:
  -  visibility: hidden !important;
  -  opacity: 0 !important;
-->
<div class="h-hidden"></div>
```

---

Pour un support de type `screen`:
```html
<!-- visible uniquement si le support est de type @media screen -->
<div class="h-visible@screen"></div>

<!-- invisible uniquement si le support est de type @media screen -->
<div class="h-hidden@screen"></div>
```

---

Pour un support de type `print`:
```html
<!-- visible uniquement si le support est de type @media print -->
<div class="h-visible@print"></div>

<!-- invisible uniquement si le support est de type @media print -->
<div class="h-hidden@print"></div>
```

---

Pour appliquer à partir d'un breakpoint et résolution supérieur :
```html
<!-- visible uniquement à partir du breakpoint `md` -->
<div class="h-visible@md"></div>

<!-- invisible uniquement à partir du breakpoint `md` -->
<div class="h-hidden@md"></div>
```

Pour les breakpoints, vous pouvez utiliser ceux définis dans votre configuration `$breakpoints`.

---

Pour appliquer uniquement sur le breakpoint en question :
```html
<!-- visible uniquement sur le breakpoint `md` -->
<div class="h-visible@md-only"></div>

<!-- invisible uniquement sur le breakpoint `md` -->
<div class="h-hidden@md-only"></div>
```
