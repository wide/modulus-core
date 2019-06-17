# Print

Helper destiné à la gestion de l'impression.

Consulter le fichier : [print.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/print.scss).


## Utilisation

Ce helper est automatique car il défini un « reset d'impression » pour la media query de type `@print {}`. Il est recommandé de prendre connaissance du fichier [print.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/helpers/print.scss) afin de connaitre le reset qui est appliqué.


!> **Note importante :** Afin d'utiliser cet helper de manière automatique, vous devez vérifier qu'il n'a pas été commenté dans le fichier `main.scss` de votre projet.


## Surcharge

Dans certains cas, il peut être utile de surcharger cet helper afin d'adapter certaines composantes d'impression. Pour cela, vous devez créer un fichier `print.scss` dans le répertoire `src/assets/scss/helpers` de votre projet.

Exemple de surchage avec le fichier `src/assets/scss/helpers/print.scss` : 

```scss
// =============================================================================
// 7# Helpers / Print mode
// =============================================================================
@media print {
  p { 
    color: red; // impression des paragraphes en rouge
  }   
} 
```