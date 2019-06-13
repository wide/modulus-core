# Feuilles de style en cascade

Pour la génération des feuilles de style en cascade, le préprocesseur CSS `SASS` est utilisé.
Nous préconisons l'utilisation de la syntaxe `SCSS (Sassy CSS)` afin de conserver une certaine uniformité avec les projets.

!> **Notes importantes :** l'utilisation de la syntaxe `Sass` reste disponible au besoin.

Plus d'informations sur les syntaxes [ici](https://sass-lang.com/documentation/file.INDENTED_SYNTAX.html).


## Structure utilisée

```
scss/
|-- core/
|   |-- generic/ 
|   |   |-- code.scss
|   |   |-- document.scss
|   |   |-- forms.scss
|   |   |-- index.scss
|   |   |-- links.scss
|   |   |-- media.scss
|   |   |-- tables.scss
|   |   `-- typography.scss
|   |-- objects/  
|   |   |-- cover.scss  
|   |   |-- crop.scss  
|   |   |-- index.scss    
|   |   |-- pjax.scss       
|   |   |-- ratio.scss        
|   |   `-- table.scss    
|   |-- tools/   
|   |   |-- fonts.scss  
|   |   |-- functions.scss  
|   |   |-- index.scss    
|   |   |-- layout.scss       
|   |   |-- mixins.scss      
|   |   `-- widths.scss         
|   |-- utilities/  
|   |   |-- alignment.scss  
|   |   |-- helpers.scss  
|   |   |-- index.scss    
|   |   |-- print.scss     
|   |   `-- states.scss    
|   `-- vendors/
|        `-- bootstrap-grid.scss        
|-- elements/   
|   `-- table.scss   
|-- settings/         
|   |-- animations.scss
|   |-- breakpoints.scss
|   |-- colors.scss
|   |-- env.scss
|   |-- fonts.scss
|   |-- layout.scss
|   `-- ratios.scss
|-- vendors/ 
|   `-- [ ... ]        
`-- main.scss        
```


### Core

Le répetoire [`core/`](https://git.cross-systems.ch/wide-front/boilerplate-integration/tree/develop/src/assets/scss/core) contient tous les fichiers nécessaires au bon fonctionnement du boilerplate. 

Il contient les éléments suivants : 
- un « reboot » pour rendre l'affichage homogène sur tous les navigateurs
- un « reboot d'impression » pour gérer les cas basiques d'impression
- des « mixins » et « fonctions » 
- des « clasees d'objets » (ex: `<div class"ratio ratio-16/9">`)  
- des utilitaires de type « helpers » (`.text-right`, `.screen-reader-text`, `.clearfix`...) 
- les ajouts de « vendors » de type core (ex: `bootstrap-grid`)

!> **Notes importantes :** le répertoire `core/` n'est pas censé être modifié pendant le développement d'un projet. Si vous effectuez une amélioration ou une correction, merci de faire un merge request sur le projet [The Boiler™](https://git.cross-systems.ch/wide-front/boilerplate-integration).


### Elements

Le répertoire [`elements/`](https://git.cross-systems.ch/wide-front/boilerplate-integration/tree/develop/src/assets/scss/elements) contient les styles globaux des éléments html natifs (ex: `h1, h2, h3, button, input, p, a...`). 

Les styles des éléments globaux s'appliquent de la même manière qu'un fichier « reboot css ». La seule différence et qu'ils sont définies pour le design relatif au projet.  


### Settings

Le répertoire [`settings/`](https://git.cross-systems.ch/wide-front/boilerplate-integration/tree/develop/src/assets/scss/settings) contient toutes les variables pour le preprocesseur CSS. Afin de faciliter la lecture, nous avons découpés les configurations en plusieurs fichiers:


- [`animations`](https://git.cross-systems.ch/wide-front/boilerplate-integration/blob/develop/src/assets/scss/settings/animations.scss) contient les variables relativent à l'animation, tel que les easings et les keyframes.

| Easing         | In                                                  | Out                                                   | In / Out                                                  |
| :------------- | :-------------------------------------------------: | :---------------------------------------------------: | :-------------------------------------------------------: |
| Back           | [$BackEaseIn](https://easings.net/en#easeInBack)    | [$BackEaseOut](https://easings.net/en#easeOutBack)    | [$BackEaseInOut](https://easings.net/en#easeInOutBack)    |
| Circ           | [$CircEaseIn](https://easings.net/en#easeInCirc)    | [$CircEaseOut](https://easings.net/en#easeOutCirc)    | [$CircEaseInOut](https://easings.net/en#easeInOutCirc)    |
| Expo           | [$ExpoEaseIn](https://easings.net/en#easeInExpo)    | [$ExpoEaseOut](https://easings.net/en#easeOutExpo)    | [$ExpoEaseInOut](https://easings.net/en#easeInOutExpo)    |
| Sine           | [$SineEaseIn](https://easings.net/en#easeInSine)    | [$SineEaseOut](https://easings.net/en#easeOutSine)    | [$SineEaseInOut](https://easings.net/en#easeInOutSine)    |
| Power1 (Quad)  | [$Power1EaseIn](https://easings.net/en#easeInQuad)  | [$Power1EaseOut](https://easings.net/en#easeOutQuad)  | [$Power1EaseInOut](https://easings.net/en#easeInOutQuad)  |
| Power2 (Cubic) | [$Power2EaseIn](https://easings.net/en#easeInCubic) | [$Power2EaseOut](https://easings.net/en#easeOutCubic) | [$Power2EaseInOut](https://easings.net/en#easeInOutCubic) |
| Power3 (Quart) | [$Power3EaseIn](https://easings.net/en#easeInQuart) | [$Power3EaseOut](https://easings.net/en#easeOutQuart) | [$Power3EaseInOut](https://easings.net/en#easeInOutQuart) |
| Power4 (Quint) | [$Power4EaseIn](https://easings.net/en#easeInQuint) | [$Power4EaseOut](https://easings.net/en#easeOutQuint) | [$Power4EaseInOut](https://easings.net/en#easeInOutQuint) |

- [`breakpoints`](https://git.cross-systems.ch/wide-front/boilerplate-integration/blob/develop/src/assets/scss/settings/breakpoints.scss) : contient les variables de type brakpoints

| Variable     | Valeur                                            |
| :----------- | :------------------------------------------------ |
| $context     | Contexte du projet (par défaut `frontend`)        |
| $assets-path | Chemin relatif du répertoire contenant les assets |

- [`colors`](https://git.cross-systems.ch/wide-front/boilerplate-integration/blob/develop/src/assets/scss/settings/colors.scss): contient les variables des différentes couleurs



- [`env`](https://git.cross-systems.ch/wide-front/boilerplate-integration/blob/develop/src/assets/scss/settings/env.scss): définitions des variables d'environnement

| Variable     | Définition                                        |
| :----------- | :------------------------------------------------ |
| $context     | Contexte du projet (par défaut `frontend`)        |
| $assets-path | Chemin relatif du répertoire contenant les assets |

- [`fonts`](https://git.cross-systems.ch/wide-front/boilerplate-integration/blob/develop/src/assets/scss/settings/fonts.scss): contient les variables liées à la typographie (`font-family`, `font-weight`, `line-height`...)

| Variable               | Définition                                                                            |
| :--------------------- | :------------------------------------------------------------------------------------ |
| $font-family-system    | Fonts de type système (permet d'afficher la font par défaut de l'OS de l'utilisateur) |
| $font-family-headings  | Fonts appliquées sur les titres                                                       |
| $font-family-monospace | Fonts appliquées pour les contenus de type « mono »                                   |

| Variable        | Définition      |
| :-------------- | :-------------- |
| $weight-ligh    | Font weight 200 |
| $weight-book    | Font weight 300 |
| $weight-regular | Font weight 400 |
| $weight-medium  | Font weight 500 |
| $weight-bold    | Font weight 700 |

- [`ratios`](https://git.cross-systems.ch/wide-front/boilerplate-integration/blob/develop/src/assets/scss/settings/ratios.scss): définitions des différents ratios

| Type de ratio                                            | Format         |
| :------------------------------------------------------- | :------------: |
| Square. Used in some social networks, and in few devices | 1:1            |
| Univisium                                                | 2:1            |
| Classic 35 mm still photographic film                    | 3:2            |
| Traditional television & computer monitor standard       | 4:3            |
| A common European widescreen standard                    | 5:3            |
| Early television & large-format computer monitors        | 5:4            |
| Fox Movietone aspect ratio                               | 6:5            |
| Widescreen computer monitors                             | 7:3            |
| Academy standard film aspect ratio                       | 11:8           |
| HD video standard                                        | 16:9           |
| A common computer screen ratio                           | 16:10          |

### Vendors

Dans le répertoire [`vendors/`](https://git.cross-systems.ch/wide-front/boilerplate-integration/tree/develop/src/assets/scss/vendors), l'ensemble des librairies css locales peuvent y être ajoutées. 

!> **Notes importantes :** si la librairie est disponible via un package npm, vous devez privilégier les `@import`.
