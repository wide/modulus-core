# Generic

Les fichiers Sass de la partie **Generic** doivent être placés dans le répertoire suivant: `src/assets/scss/generic`. 

Le répertoire `generic/` contient les « reboot css » pour rendre l'affichage homogène sur tous les navigateurs. Et également, différentes autres parties telles que: 

- Les styles communs du document (`html {}`, `body {}`, `main {}`, ...) avec le fichier `common.scss`.


- La déclaration des webfonts locales `@font-face {}` avec le fichier `fonts.scss`. Pour l'utilisation des webfonts avec Modulus vous pouvez [consulter la documentation du mixin « Fonts »](/css/mixins/fonts.md).


## Ajout de nouveaux fichiers

Vous pouvez créer de nouveaux fichiers dans le répertoire `src/assets/scss/generic/` dans les cas suivants:
- ajout de style de type « reboot css »
- ajout de style de type « reboot d'impression »
- ajout de style n'ayant aucun rapport avec un composant ou éléments
- modification de style d'un conteneur de page (ex: pour les transitions de page)

!> **Note importante :**  N'oubliez pas ensuite de déclarer vos fichiers dans le `main.scss`. 


## Reset d'impression

Vous pouvez prendre connaissance du fichier [print.scss](https://git.cross-systems.ch/wide-front/modulus/blob/develop/scss/generic/print.scss) afin de conntaitre le reset d'impression qui est appliqué sur la media query de type `@print {}`.

Dans certains cas, il peut être utile de surcharger le reset d'impression. Pour cela, vous devez créer un fichier `print.scss` dans le répertoire `src/assets/scss/generic` de votre projet.

Exemple de surchage avec le fichier `src/assets/scss/generic/print.scss` : 

```scss
// =============================================================================
// 4# Generic / Print mode
// =============================================================================
@media print {
  p { 
    color: red; // impression des paragraphes en rouge
  }   
} 
```