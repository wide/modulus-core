# Fonts

Modulus propose un mixin pour charger dynamiquement les webfonts qui sont situées dans le répertoire `src/assets/fonts` de votre projet.


## Définition

Pour la définition d'une `font-face` en utilisant le mixin:

```scss
@include font-face($font-family, $file-path, $file-formats);
```

- `$font-family`: nom à appliquer sur la propriété `font-family` pour la webfont.
- `$file-path`: chemin relatif du fichier webfont à partir du répertoire `assets/` et sans les extensions.
- `$file-formats`: *(paramètre optionnel)* permet de définir les formats utilisables pour le chargement de la webfont.

!> **Note importante :** La valeur par défaut de `$file-formats` est configurable dans le fichier `src/assets/scss/settings/fonts.scss`.


## Utilisation

L'ajout de déclaration d'une `font-face` au sein de votre projet, s'effectue dans le fichier `src/assets/scss/generic/fonts.scss`.

Voici un exemple d'utilisation du mixin:

```scss
@include font-face(
  "source-sans-pro",                // nom de la webfont
  "fonts/source-sans-pro-regular",  // chemin relatif de la webfont (avec le répertoire `assets/` pour racine)
  ("woff2", "woff")                 // format disponible [paramètre optionnel]
) {
  font-style: normal;
  font-weight: 400;
}
```