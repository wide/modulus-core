# Accessibility

Helper destiné à l'accessibilité et aux lecteurs d'écran.

Consulter le fichier : [accessibility.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/accessibility.scss).


## Lecteurs d'écrans

L'utilisation de la clase CSS `.a11y-sr-only` masque l'ensemble des éléments par défaut. Mais, ils restent conservés et visible sur un lecteur d'écran.

```html
<!-- 
  Non visible sur écran.
  Visible sur un lecteur d'écran.
-->
<div class="a11y-sr-only"></div>
```

---

L'utilisation de la clase CSS `.a11y-sr-only` avec le modifier `-focus` rend les éléments visibles uniquement lors d'un focus à partir du clavier. Bien évidement, l'élément reste toujours visible sur un lecteur d'écran.

```html
<!-- 
  Non visible sur écran par défaut.
  Visible lors du focus au clavier.
  Visible sur un lecteur d'écran.
 -->
<div class="a11y-sr-only -focus"></div>
```

## Curseurs visuels

Les rôles ARIA affichent des indicateurs de curseur visuels en fonction de leurs définitions. 

Voici les définitions de rôles ARIA géré par Modulus: 

```css
[aria-busy='true'] {
  cursor: progress;
}
```

```css
[aria-controls] {
  cursor: pointer;
}
```

```css
[aria-disabled] {
  cursor: default;
}
```