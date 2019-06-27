# Animations

Fichier de configuration destiné à la définition des variables relativent à l'animation, tel que les easings et les keyframes.

Consulter le fichier: [animations.scss](https://git.cross-systems.ch/wide-front/modulus-starterkit/blob/develop/src/assets/scss/settings/animations.scss).


## Variables

- `$anim-speed`: Configuration d'un délai "standard" pour les animations *(valeur par défaut: `400ms`)*.
- `$anim-speed-fast`: Configuration d'un délai "rapide" pour les animations *(valeur par défaut: `200ms`)*.
- `$anim-speed-slow`: Configuration d'un délai "lent" pour les animations *(valeur par défaut: `600ms`)*.

---

- `$transition-default`: Définition de la transition utilisé par défaut au sein du projet.

*Valeur par défaut: `all $anim-speed $Power2EaseInOut`*


## Easings

Tableau récapitulatif contenant l'ensemble des variables easings présentent au sein de Modulus:

| Easing         | In                                                    | Out                                                     | In / Out                                                    |
| :------------: | :---------------------------------------------------: | :-----------------------------------------------------: | :---------------------------------------------------------: |
| Back           | [`$BackEaseIn`](https://easings.net/en#easeInBack)    | [`$BackEaseOut`](https://easings.net/en#easeOutBack)    | [`$BackEaseInOut`](https://easings.net/en#easeInOutBack)    |
| Circ           | [`$CircEaseIn`](https://easings.net/en#easeInCirc)    | [`$CircEaseOut`](https://easings.net/en#easeOutCirc)    | [`$CircEaseInOut`](https://easings.net/en#easeInOutCirc)    |
| Expo           | [`$ExpoEaseIn`](https://easings.net/en#easeInExpo)    | [`$ExpoEaseOut`](https://easings.net/en#easeOutExpo)    | [`$ExpoEaseInOut`](https://easings.net/en#easeInOutExpo)    |
| Sine           | [`$SineEaseIn`](https://easings.net/en#easeInSine)    | [`$SineEaseOut`](https://easings.net/en#easeOutSine)    | [`$SineEaseInOut`](https://easings.net/en#easeInOutSine)    |
| Power1 (Quad)  | [`$Power1EaseIn`](https://easings.net/en#easeInQuad)  | [`$Power1EaseOut`](https://easings.net/en#easeOutQuad)  | [`$Power1EaseInOut`](https://easings.net/en#easeInOutQuad)  |
| Power2 (Cubic) | [`$Power2EaseIn`](https://easings.net/en#easeInCubic) | [`$Power2EaseOut`](https://easings.net/en#easeOutCubic) | [`$Power2EaseInOut`](https://easings.net/en#easeInOutCubic) |
| Power3 (Quart) | [`$Power3EaseIn`](https://easings.net/en#easeInQuart) | [`$Power3EaseOut`](https://easings.net/en#easeOutQuart) | [`$Power3EaseInOut`](https://easings.net/en#easeInOutQuart) |
| Power4 (Quint) | [`$Power4EaseIn`](https://easings.net/en#easeInQuint) | [`$Power4EaseOut`](https://easings.net/en#easeOutQuint) | [`$Power4EaseInOut`](https://easings.net/en#easeInOutQuint) |
