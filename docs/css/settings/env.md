# Env

Fichier de configuration destiné à la définition des variables d'environnement.

Consulter le fichier : [env.scss](https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/env.scss).


## Variables

- `$assets-path`: Chemin relatif du répertoire contenant les assets du projet *(valeur par défaut: `../`)*.

Cette variable permet de modifier le chemin relatif du répertoire `assets/` sur l'ensemble des propriétés qui l'utilisent dans nos fichiers sass. L'utlisation de cette variable, permet de faciliter la maintenance du projet en cas de déplacement du répertoire `assets/` par la suite. 

Voici un exemple d'utilisation:

```
// utilisation en scss
.foo {
  background: url('#{$assets-path}img/beer.png');
}

// sortie du css compilé (avec la valeur par défaut)
.foo {
  background: url('../img/beer.png');
}
```