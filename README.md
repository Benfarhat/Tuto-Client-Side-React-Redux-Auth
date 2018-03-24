# Mise en place de l'Authentification au niveau d'un client utilisant React/Redux

## Préparation du serveur

Pour l'installation du serveur nous utiliserons simplement l'utilitaire [Create React App](https://github.com/facebookincubator/create-react-app).

Suite à cette installation nous nous retrouverons avec l'arboresence suivante: 

```
client/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

Nous allons sous le répertoire `src`, ajouter le répertoire `components` pour nos composants **react** ainsi que `actions` et `reducers` pour **redux**. 
Dans le repertoire **public**, nous mettrons pour nos assets les repertoires `css`, `images` et `js` (nous ne les utiliserons pas pour l'instant). 

Ensuite déplaçons App.js et App.css vers le repertoire components et modifions index.js pour qu'il pointe vers la nouvelle destination.
Changer la ligne: `import App from './App';` en `import App from './components/App';`. et dans le fichier index.html ajoutons un lien vers le lien [CDN](https://www.bootstrapcdn.com/) de bootstrap pour que le fichier devienne comme suit:

`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>React App</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
  </body>
</html>

`

Modifions le fichier App.js comme suit:

```
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a className="navbar-brand" href="/">Title</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
        </header>
        <main className="mt-3 container">
          <h1 className="pt-5">Header</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla interdum mauris eget pulvinar.</p>
        </main>
      </div>
    );
  }
}
```
Nous pouvons ensuite supprimer le fichier `logo.svg`


## Mise en place de Redux