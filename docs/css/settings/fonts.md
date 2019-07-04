# Fonts

Fichier de configuration destiné à la définition des variables liées à la typographie (`font-family`, `font-weight`, `line-height`...)

Consulter le fichier: [fonts.scss](https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/fonts.scss).


## Variables

**Variables de type `font-family`**:

- `$font-family-system`: Fonts de type système (permet d'afficher la font par défaut de l'OS de l'utilisateur)
- `$font-family-headings`: Fonts appliquées sur les titres  
- `$font-family-monospace`: Fonts appliquées pour les contenus de type « mono » 

- `$font-formats-default`: Définition des formats par défauts qui doivent être chargés lors de l'import d'un font-face.
- `$font-family-default:`: Définition de la font qui est appliqué par défaut.

Vous devez utiliser ce fichier pour définir les appels des autres fonts de votre projet. Comme par exemple:

```scss
$font-futura: 'Futura', $font-family-system;
```

!> **Note importante :** Dans le cas de l'ajout d'une nouvelle font-face, vous devez utiliser le fichier `src/assets/scss/generic/fonts.scss` pour l'importer. 

---

**Variables de type `font-weight`**: 

- `$weight-light`: Font weight 200
- `$weight-book`: Font weight 300
- `$weight-regular`: Font weight 400
- `$weight-medium`: Font weight 500
- `$weight-bold`: Font weight 700

---

- `$body-context`: Permet de définir le contexte du document (font-size par défaut). La configuration du contexte est nécessaire pour le bon fonctionnement du mixin `em()`. 
