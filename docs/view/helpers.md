# Helpers

Avec Panini il est possible de créer des helpers afin de faciliter votre intégration.

## Ajouter son propre helper dans le startkit

Pour ajouter un helper Panini à votre projet, vous devez ajouter votre fichier helper dans le répertoire `src/views/helpers`.

Voici un exemple de la structure d'un helper panini :

```javascript
module.exports = function(options) {
  // {{#bold}} Lorem Ipsum {{/bold}}
  return '<strong>' + options.fn(this) + '</strong>';
}
```

N'hésitez pas à proposer vos helpers Panini en merge request afin de les ajouter directement au sein de Modulus ;)

## Helpers embarquées avec Modulus

Voici la liste des helpers disponibles au sein de Modulus:

### Hash

- Générer un identifiant unique (hash) :

```panini
{{ hash }}
```

```output 
dicrbmcmjxs9voq2czlhhb
``` 

### Icon

- Générer le code HTML pour l'utilisation d'une icône présente dans le sprite SVG :

```panini
{{ icon name="beer" }}
```

```output 
<svg role="img"><use xlink:href="assets/icons/sprite-icons.svg#beer"></use></svg>
``` 

- Il est possible d'ajouter un label pour l'accessibilité :

```panini
{{ icon name="beer" label="I like my beer" }}
```

```output 
<svg role="img" aria-label="I like my beer"><use xlink:href="assets/icons/sprite-icons.svg#beer"></use></svg>
``` 

### Lorem Ipsum

- Générer un bloc de texte Lorem Ipsum :

```panini
{{ lorem }}
```

```output 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum, nisl at finibus laoreet, lacus ante egestas magna, nec venenatis ante diam eget ipsum. Proin sit amet est sed felis porta porttitor. Aliquam feugiat dapibus sollicitudin.
Praesent tristique odio at bibendum gravida. Morbi vulputate ultricies ligula non mattis. In sapien tortor, egestas non tempus eu, hendrerit ac magna. Mauris porttitor mollis leo venenatis eleifend. Orci varius natoque penatibus et magnis
dis parturient montes, nascetur ridiculus mus. Donec varius placerat ex ut egestas. Sed laoreet justo pharetra euismod consequat. Praesent accumsan lacus id sem hendrerit semper. Nunc mattis ultricies arcu sed maximus. Etiam eget vulputate
enim. Vestibulum suscipit nisi nec massa hendrerit condimentum.
``` 

- Générer du Lorem Ipsum avec seulement 5 mots :

```panini
{{ lorem w=5 }}
```

```output 
Lorem ipsum dolor sit amet
``` 
