# Installation


## Pré-requis

- [NodeJS](https://nodejs.org) version `10.13.0 LTS` minimum
- NPM `5.6.0` (livré avec Node)


## Dépendances

Pour récupérer les dépendances nécessaire à l'execution et à la compilation, lancer la commande suivante :
```
npm install
```


## Mode développement et production

Pour observer, compiler et rafraichir automatiquement pendant le développement, lancer la commande (ouvre une page dans le navigateur) :
```
npm start
```

Pour compiler pour la production, avec minification des assets et sans les logs, lancer la commande :
```
npm run build
```
Le livrable sera alors disponibles dans le dossier `/dist`


## Commandes

Plusieurs commandes annexes sont disponibles pour des tâches précises :
- `npm run clean` : supprime le dossier `/dist`
- `npm run build:html` : compile les pages HTML dans `/dist`
- `npm run build:css` : compile le CSS dans `/dist`
- `npm run build:js` : compile le JS dans `/dist`
- `npm run create:plugin` : génère un plugin Modulus vide dans `/src`
- `npm run create:controller` : génère un contrôleur Modulus vide dans `/src`
- `npm run create:component` : génère un composant Modulus vide dans `/src`
- `npm run docs` : ouvre la documentation dans le navigateur