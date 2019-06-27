# Vendors

## Ajouter une librairie css locale

Pour ajouter une librairie css locale, vous devez créer le répertoire suivant `src/assets/scss/vendors/` dans votre projet.

Vous pouvez ensuite ajouter vos librairies css dans ce répertoire.

!> **Notes importantes :** pour importer automatiquement les librairies css du répertoire `vendors/`, vous devez décommenter la ligne suivante `@import 'vendors/**/*';` dans le fichier `main.scss`.


## Importer une librairie css depuis npm

Pour importer une librairie css depuis npm, il suffit d'éditer simplement le fichier `main.scss` dans la partie **3# Vendors External libraries**.

Vous devez consulter la documentation de votre librairie pour déterminer comment l'import css doit être effectué.

---

Exemple pour importer la grille bootstrap:

```
// 3# Vendors
// External libraries
// ==========================================================================

// bootstrap grid: https://getbootstrap.com/docs/4.0/layout/grid/
// @import 'bootstrap/bootstrap-grid';
```

!> **Notes importantes :** lors de l'ajout de votre librairie dans le `package.json`, merci de fixer la version utilisée (sans le `^` ou `~`). Cela permet d'éviter des différences de versions entre nos environnements...