# Relay Starter Kit

Cette version d'example comprend le mapping de People, de films et les liens entre ces deux éléments.
Cette version démontre l'importance du cache et ou le placer via un example naif utilisant une fonction de memoization.

Pour bien indentifier les gains de performences executer la requete suivante sur l'example 2 et celui-ci

{
  people (id:1){
    name,
    films {
      title,
      characters {
        name,
        films {
          title
        }
      }
    }
  }
}
## Installation

```
npm install
```

## Running

Start a local server:

```
npm start
```

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.json`, and restart the server:

```
npm run update-schema
npm start
```

## License

Relay Starter Kit is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).
