# Mise en place de l'Authentification au niveau d'un client utilisant React/Redux

## Préparation du serveur

Pour l'installation du serveur nous utiliserons simplement l'utilitaire [Create React App](https://github.com/facebookincubator/create-react-app).

```
create-react-app Tuto-Client-Side-React-Redux-Auth
cd Tuto-Client-Side-React-Redux-Auth
code .
```

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
Dans le repertoire **public**, nous crérons pour nos assets les repertoires `css`, `images` et `js` (nous ne les utiliserons pas pour l'instant). 

Ensuite déplaçons App.js et App.css vers le repertoire components.

Modifions index.js pour qu'il pointe vers la nouvelle destination de App.js.
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

Voici la nouvelle arboresence resultante:

```
client/
  README.md
  node_modules/
  package.json
  public/
    css/
    images/
    js/
    favicon.ico
    index.html
  src/
    action/
    components/
      App.css
      App.js
      App.test.js
    /reducers/
    index.css
    index.js
```

## Mise en place de React-Router et Redux

Installons les modules redux et react-redux et react-router
`yarn add redux react-redux react-router`

A présent dans le fichier index.js, nous allons entourer notre App avec un Provider dans lequel se trouve notre store

Dans React, les composants sont généralement classés en deux types, les composants dit de `présentation` et les composants dit `conteneur`. Chaque composant peut avoir un état, qui contiendra des valeurs aussi diverses que variées comme par exemple le menu active, la langue choisie, le nombre de clique de l'utilisateur sur un élement etc, etc,
Pour faire passer des valeurs ou des fonctions on utilise les props. Voila c'est aussi simple que ca! Seulement lorsque le nombre de composants augmente vous verrez que la gestions des etats et des props se complique, elle n'est pas impossible, mais plus dure à suivre et il faudra principalement toujours faire une double vérification de ce qu'on écrit. 
Imaginer qu'on vous dise qu'il est possible de rassembler en un seul point appelé store tout vos états, et que de facto l'accès à ce store est bien plus simple que devoir jongler entre les transferts d'etats via les props entre composants. C'est ce que permet Redux, il est inutile de l'implémenter pour une petite application, mais allons donc! Qui sait ce que deviendra cette petite application, les besoins évoluent vite alors pourquoi ne pas prendre les devant et se préparer.
Redux est composé donc d'un store qui gère les etats et utilisent des actions permettant de dire comment faire et des reducers permettant de dire quand faire via des déclencheurs qu'on appel dispatcher. Dans votre poste radio il existe desnmécanismes qui permettent de recevoir une fréquence et de convertir le signal recu en un son dont on supprimera au maximum le bruit pour le faire écouteéaudibleSur v






e





