# Display

Helper destiné à la gestion des différents états de type `display`.

Consulter le fichier: [display.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/display.scss).

## Liste des "Display" disponibles

- none
- inline
- inline-block
- block
- table
- table-cell
- table-row
- flex
- inline-flex

## Exemples d'utilisation

```html
<div class="d-none"></div>
<div class="d-inline"></div>
<div class="d-inline-block"></div>
<div class="d-block"></div>
<div class="d-table"></div>
<div class="d-table-cell"></div>
<div class="d-table-row"></div>
<div class="d-flex"></div>
<div class="d-inline-flex"></div>
```

---

Pour un support de type `screen`:
```html
<!-- uniquement si le support est de type @media screen -->
<div class="d-none@screen"></div>
```

---

Pour un support de type `print`:
```html
<!-- uniquement si le support est de type @media print -->
<div class="d-none@print"></div>
```

---

Pour appliquer à partir d'un breakpoint et résolution supérieur :
```html
<!-- uniquement à partir du breakpoint `md` -->
<div class="d-none@md"></div>
```

Pour les breakpoints, vous pouvez utiliser ceux définis dans votre configuration `$breakpoints`.

---

Pour appliquer uniquement sur le breakpoint en question :
```html
<!-- uniquement sur le breakpoint `md` -->
<div class="d-none@md-only"></div>
```