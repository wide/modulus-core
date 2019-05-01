# Storages Plugin

## Installation

Voici comment instancier dans le `main.js`, les plugins de type storages:

```js
import Modulus from 'modulus'

import Cookie from 'modulus/plugins/storage/cookie'
import WebStorage from 'modulus/plugins/storage/web-storage'

export default new Modulus({
  plugins: {
    cookie: new Cookie(),
    local: new WebStorage('local'),
    session: new WebStorage('session')
  }
})
```


## Différents storages disponibles

Différents plugins, pour différents storage !

- `this.$cookie` pour l'utilisation des cookies
- `this.$local` pour l'utilisation du localStorage
- `this.$session` pour l'utilisation du sessionStorage


## Cas d'utilisations

!> **Notes importantes :** pour les exemples ci-dessous, vous devez remplacer `this.$storage` par le plugin que vous souhaitez utiliser (`this.$cookie`, `this.$local` ou `this.$session`)


### this.$storage.init()

Permet de configurer les paramètres d'un coookie, tel que son chemin et sa durée de vie en jour. 

Par défaut, les valeurs suivantes sont appliquées: 
```js
{
  path: "/",
  expires: 365 // 365 days
}
```

!> **Notes importantes :** Cette méthode est disponible uniquement pour le storage de type `cookie`.

Exemples:

```js
// définir le chemin et conserver la date d'expiration par défaut
this.$cookie.init({ path: '/foo' })

// définir une nouvelle date d'expiration et conserver le chemin par défaut
this.$cookie.init({ expires: 30 })

// définir un nouveau chemin et une nouvelle date d'expiration
this.$cookie.init({ path: '/bar', expires: 60 })
```


### this.$storage.all()

Retourne l'objet d'un storage (`cookie`, `localStorage` ou `sessionStorage`)

Exemples:

```js
// cookie
this.$cookie.all()

// localStorage
this.$local.all()

// sessionStorage
this.$session.all()
```


### this.$storage.clear()

Supprime toutes les données présentes dans un storage (`cookie`, `localStorage` ou `sessionStorage`)

Exemples:

```js
// vider l'ensemble des cookies
this.$cookie.clear()

// vider tous les items présent dans le localStorage
this.$local.clear()

// vider tous les items présent dans le sessionStorage
this.$session.clear()
```


### this.$storage.get(key)

Retourne la valeur d'un item en fonction de sa clé

Exemples:

```js
// retourne la valeur du cookie qui a la clé "foo"
this.$cookie.get('foo')

// retourne la valeur du localStorage qui a la clé"foo"
this.$local.get('foo')

// retourne la valeur du sessionStorage qui a la clé "foo"
this.$session.get('foo')
```


### this.$storage.json()

Retourne l'ensemble des clés / valeurs présents dans le storage (`cookie`, `localStorage` ou `sessionStorage`) au format JSON

Exemples:

```js
// cookie
this.$cookie.json()

// localStorage
this.$local.json()

// sessionStorage
this.$session.json()
```


### this.$storage.set(key, object)

Ajoute une entrée dans le (`cookie`, `localStorage` ou `sessionStorage`) en définissant un couple clé / valeur

Exemples:

```js
// ajoute l'entrée qui a la clé "foo" dans cookie
this.$cookie.set('foo', 'bar')

// ajoute l'entrée qui a la clé "foo" dans localStorage
this.$local.set('foo', { type: 'bar', time: new Date() })

// ajoute l'entrée qui a la clé "foo" dans sessionStorage
this.$session.set('foo', ['foo', 'bar'])
```


### this.$storage.unset(key)

Supprime une entrée dans le storage (`cookie`, `localStorage` ou `sessionStorage`) en fonction de sa clé

Exemples:

```js
// supprime l'entrée qui a la clé "foo" dans cookie
this.$cookie.unset('foo')

// supprime l'entrée qui a la clé "foo" dans localStorage
this.$local.unset('foo')

// supprime l'entrée qui a la clé "foo" dans sessionStorage
this.$session.unset('foo')
```


### this.$storage.create(key)

Alias de `this.$storage.set(key, object)` 


### this.$storage.remove(key)

Alias de `this.$storage.unset(key)` 