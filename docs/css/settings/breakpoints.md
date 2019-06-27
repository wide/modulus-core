# Breakpoints

Fichier de configuration destiné à la définition des [points de rupture (breakpoint)](/css/mixins/breakpoints.md) et des [conteneurs](/css/helpers/container.md).

Consulter le fichier: [breakpoints.scss](https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/breakpoints.scss).


## Points de rupture (breakpoint)

- `$breakpoints`: Contient les clés et valeurs des différents points de rupture. Vous pouvez modifier la valeur ou ajouter un point de rupture si cela est nécessaire.

Liste des points de rupture par défaut de Modulus:

| Identifiant  | Valeur |
| -----------: | :----- |
| xs           | 326px  |
| sm           | 576px  |
| md           | 768px  |
| lg           | 1024px |
| xl           | 1200px |
| xxl          | 1600px |

---

La variable `$breakpoints` est généralement *toujours* utilisée à l'aide du mixin [Breakpoints](/css/mixins/breakpoints.md). Dans le cas ou vous avez besoin de récupérer une valeur sans passer par le mixin, voici comment faire:

```scss
.foo {
  width: map-get($breakpoints, 'md');
}
```

## Conteneurs

- `$containers`: Permet de configurer le comportement du helper [Container](/css/helpers/container.md).

---

Exemple d'une configuration possible:
```scss
$containers: (
  default: (
    padding: 20px,  // padding left/right
    max-width: 100% // largeur max du conteneur
  ),
  lg: (
    padding: 40px,
    max-width: 100%
  ),
  xxl: (
    padding: 0,
    max-width: 1440px
  ),
);
```
!> **Note importante :** Pour la gestion des breakpoints, seul `default` et les identifiants définis dans la variable `$breakpoints (xs, md, lg, xl...)` sont autorisés. L'utilisation d'une valeur non autorisé entrainera une erreur de compilation.

Deux paramétres de configuration sont possibles: `padding` et `max-width`. 

!> **Note importante :** La configuration est basée sur du mobile first. 

Dans notre exemple:
- `default = lg (max-width 1023px)`: max-width 100% ET padding gauche/droite de 20px
- `lg (min-width 1024px)`: max-width 100% ET padding gauche/droite de 40px
- `xxl (min-width 1600px)`: max-width 1440px ET padding gauche/droite de 0px
