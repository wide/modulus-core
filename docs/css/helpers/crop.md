# Crop

Helper destiné à la gestion du crop. Il permet de pouvoir cropper facilement un élément de type block.

Consulter le fichier: [crop.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/crop.scss).


## Configuration

Voici la liste des ratios disponibles par défaut avec Modulus :
- `1:1`: Square. Used in some social networks, and in few devices
- `2:1`: Univisium
- `3:2`: Classic 35 mm still photographic film
- `4:3`: Traditional television & computer monitor standard
- `5:3`: A common European widescreen standard
- `5:4`: Early television & large-format computer monitors
- `6:5`: Fox Movietone aspect ratio
- `7:3`: Widescreen computer monitors
- `11:8`: Academy standard film aspect ratio
- `16:9`: HD video standard
- `16:10`: A common computer screen ratio

Si vous utilisez un ratio qui n'est pas disponible par défaut, vous pouvez le définir dans le fichier de configuration : [ratios.scss](https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/ratios.scss).


## Utilisation

Voici différents cas d'utilisation possibles sur le crop : 

```html
<!-- 
  Crop au format 4:3
  Positionne l'élément enfant en haut à droite (top / right)
-->
<div class="crop crop-4:3">
  <div class="crop_content -right"></div>
</div>
```

```html
<!-- 
  Crop au format 1:1
  Positionne l'élément enfant en center (center)
-->
<div class="crop crop-1:1">
  <div class="crop_content -center"></div>
</div>
```

```html
<!-- 
  Crop au format 16:10
  Positionne l'élément enfant en bas à gauche (bottom / left)
-->
<div class="crop crop-16:10">
  <div class="crop_content -bottom"></div>
</div>
```

```html
<!-- 
  Crop au format 16:9
  Positionne l'élément enfant en bas à droite (bottom / right)
-->
<div class="crop crop-16:9">
  <div class="crop_content -bottom -right"></div>
</div>
```

!> **Note importante :** Pour ne pas définir le crop sur la taille du conteneur de page, vous devez définir une largeur sur l'élément à cropper.

Voici un exemple :

```css
.my-element { width: 200px; }
```

```html
<!-- 
  Élément défini avec une largeur de 200px
  Crop au format 4:3 (dans notre cas : width 200px / height 150px)
  Positionne l'élément enfant en haut à gauche (top / left)
-->
<div class="my-element">
  <div class="crop crop-4:3">
    <div class="crop_content"></div>
  </div>
</div>
```

