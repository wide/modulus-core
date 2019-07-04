# Embed

Helper destiné à la gestion du responsive des contenus externes embarqués.

Consulter le fichier: [embed.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/embed.scss).


## Utilisation 

Pour rendre un élément de type `embed`, `iframe`, `object` ou `video` reponsive, vous pouvez utiliser l'une des structures suivantes : 

```html
<!-- contenu externe responsive défini à partir d'une classe -->
<div class="embed-responsive">
  <div class="embed-responsive-item"></div>
</div>
``` 

```html
<!-- contenu externe de type <iframe> -->
<div class="embed-responsive">
  <iframe></iframe>
</div>
``` 

```html
<!-- contenu externe de type <embed> -->
<div class="embed-responsive">
  <embed src="#">
</div>
``` 

```html
<!-- contenu externe de type <object> -->
<div class="embed-responsive">
  <object></object>
</div>
``` 

```html
<!-- contenu externe de type <video> -->
<div class="embed-responsive">
  <video></video>
</div>
``` 