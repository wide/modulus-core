# Generic

Les fichiers Sass de la partie **Generic** doivent être placés dans le répertoire suivant: `src/assets/scss/generic`. 

---

Le répertoire `generic/` contient les « reboot css » pour rendre l'affichage homogène sur tous les navigateurs. Et également, différentes autres parties telles que: 

- Les styles communs du document (`html {}`, `body {}`, `main {}`, ...) avec le fichier `common.scss`.


- La déclaration des webfonts locales `@font-face {}` avec le fichier `fonts.scss`. Pour l'utilisation des webfonts avec Modulus vous pouvez [consulter la documentation du mixin « Fonts »](/css/mixins/fonts.md).

---

Vous pouvez créer de nouveaux fichiers dans le répertoire `src/assets/scss/generic/` dans les cas suivants:
- ajout de style de type « reboot css »
- ajout de style n'ayant aucun rapport avec un composant ou éléments
- modification de style d'un conteneur de page (ex: pour les transitions de page)

!> **Note importante :**  N'oubliez pas ensuite de déclarer vos fichiers dans le `main.scss`. 
