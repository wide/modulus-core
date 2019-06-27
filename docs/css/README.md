# Feuilles de style en cascade

Pour la génération des feuilles de style en cascade, le préprocesseur CSS `SASS` est utilisé.
Nous préconisons l'utilisation de la syntaxe `SCSS (Sassy CSS)` afin de conserver une certaine uniformité avec les projets.

!> **Notes importantes :** l'utilisation de la syntaxe `Sass` reste disponible au besoin.

Plus d'informations sur ces 2 syntaxes [ici](https://sass-lang.com/documentation/file.INDENTED_SYNTAX.html).


## Structure utilisée

La structure Scss fournie par défaut au sein de Modulus Starterkit est la suivante :

```
scss/
|-- elements/
|   |-- buttons.scss
|   |-- forms.scss
|   |-- section.scss
|   `-- table.scss
|-- generic/
|   |-- common.scss
|   `-- fonts.scss
|-- helpers/
|   `-- animations.scss
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

Celle-ci sera amenée à évoluer pendant toute la phase de développement de votre projet. Vous pouvez prendre connaisance de l'utilité des différents répertoires grâce à la documentation ci-dessous.

## Documentation 

Afin de faciliter la lecture, la documentation a été découpée en plusieurs parties :
- [Settings](css/settings.md)
- [Generic](css/generic.md)
- [Elements](css/elements.md)
- [Components](css/components.md)
- [Mixins](css/mixins.md)
- [Helpers](css/helpers.md)
- [Vendors](css/vendors.md)
