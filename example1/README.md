# Relay Starter Kit

Contient un mapping graphql sur une seule source de donnée (la SWAPI et sur un seul objet (People) sans lien avec d'autres)
Le mapping est incomplet et peut être complété pour test.
L'application relay n'est pas disponible dans cet example.

Le schema graphql peut être testé via le requeteur GraphiQL a l'adresse http://localhost:8080 après avoir executé la commande npm run start dans ce répertoire
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
