# Mise en place de l'Authentification au niveau d'un client utilisant React/Redux

- [Mise en place de l'Authentification au niveau d'un client utilisant React/Redux](#mise-en-place-de-lauthentification-au-niveau-dun-client-utilisant-reactredux)
  - [Préparation du serveur](#pr%C3%A9paration-du-serveur)
  - [Mise en place de React-Router et Redux](#mise-en-place-de-react-router-et-redux)
    - [Flux](#flux)
    - [Redux](#redux)
    - [Terminologie](#terminologie)
      - [Actions  actions creators](#actions-actions-creators)
      - [Reducers](#reducers)
      - [Store](#store)
      - [MiddleWare](#middleware)
    - [React-reduc et connect](#react-reduc-et-connect)
    - [Préparation des actions et reducers](#pr%C3%A9paration-des-actions-et-reducers)
    - [Provider et store](#provider-et-store)

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

### Flux

Redux n'est pas une librairie mais une implémentation de `Flux`. 
Qu'est ce que Flux? Flux redéfini les patterns (Modèles de conception) MVC (Model Vue Contrôleur) et MVVM (Model Vue Vue-Model) ainsi que le Two-Way Data Binding. L'implémentation proposée par Flux  est "l'`Unidirectional data flow`".
Notez par la même occasion que dans React, les composants sont généralement classés en deux types, les composants dit de `présentation` et les composants dit `conteneur`. Chaque composant peut avoir un état, qui contiendra des valeurs aussi diverses que variées comme par exemple le menu active, la langue choisie, le nombre de clique de l'utilisateur sur un élement etc...

Les composants d'une implémentation Flux sont le `store` qui contient l'état de l'application, les `actions` qui décrivent les changements suite à un évènement, et enfin les `dispatchers` qui en se basant sur l'action et le seul a pouvoir gérer les états du store.


**Fonctionnement de Flux

* Un évènement dans l'interface utilisateur appel une action
* L'action est envoyée à un dispatcher
* Le dispatcher notifie le store de l'action
* Le store est modifié et une notification du changement est envoyée à l'interface utilisateur

### Redux

Par rapport à Flux, Redux n'a qu'un unique store qui n'a aucune logique interne. Le fonctionnement n'est pas très différents de celui de Flux, il n'y a pas de Dispatchers mais des `Reducers`.

### Terminologie

#### Actions  actions creators

Une `action` n'est rien d'autre qu'un `objet javascript` envoyé au store et contenant toutes les informations necessaires pour modifier l'état par exemple

```
{
  type: 'CHANGE_LANGUE',
  payload: 'fr'
}
```

Ces objets (ou actions) sont dans des fonctions qui permettent de rajouter une certaine logique, on parle alors d'`Action creators`

```
function setLanguageAction(lang){
  return {
    type: 'CHANGE_LANGUE',
    payload: lang
  }
}
```

Les actions sont envoyées au store via la fonction `store.dispatch()`

#### Reducers

Une fois que l'actions est envoyé au store, le store a besoin de savoir comment utiliser ce payload pour modifier l'etat actuel de l'application, ce sont les reducers, dans une application réel, Redux a besoin d'un unique Reducer (rootReducer) qui contiendra pour chaque action (ou plutot type d'action), comment modifier l'etat.
Si l'application est complexe, un reducer pourrait contenir la gestion de dizaine d'actions et le fichier deviendrait vite volumineux et difficile à gérer. Redux offre la possibilité de combiner des reducers et donc de faire un reducer par composant ou domaine, etc...

ATTENTION: `Les reducers sont des fonctions pures`. Nous ne modifions jamais le state, conformément au principes de la programmation fonctionnel et notamment des fonctions pures, un reducer rend le nouvel état (ou une nouvelle copie contenant les modifications), il ne modifie pas le state.


```
const initialState = {
  defaultLanguage: 'ar',
  defaultColor: '#c0392b' // red
  posts: []
}

function rootReducer(state = initialState, action) {
  switch(action.type){
    case 'CHANGE_LANGUE':
      return {...state, defaultLanguage: action.payload }
    case 'CHANGE_COLOR':
      return {...state, defaultColor: action.payload }
    default:
      return state; // important
  }
}
```
Notez ici l'utilisation du `spread operator` qui permet de recopier tout le contenu de state et de ne modifier que la branche voulu à savoir ici defaultLanguage et defaultColor

#### Store

Le store au niveau de Redux est unique (même chose pour Kea qui a été construit au dessus de redux), par contre pour mobX l'autre grande initiative de gestion des états, il peut y en avoir plusieurs.
Le Store n'a pas de logique, il recoit les actions, les fait passer à travers les middleware enregistré, utilise les reducers pour calculer le nouvel état et le sauver. Ensuite il notifie tous les `listeners` qu'une modification de l'état a eu lieu, plusieurs parties de l'application dont l'UI pourront automatiquement se mettre à jour conformément au nouvel état.

Notez qu'un store peut être créer avec un état initial, il fournit les fonctions suivantes:

* getState: pour obtenir l'état actuel 
* dispatch: pour déclencher une action qui mettra à jour le state
* subscribe: pour s'abonner au store (et donc notifier les listeners lors d'une modification du state) 

#### MiddleWare

Les middlewares interceptent les actions envoyées vers le store, ils ont accès à la fonction dispatch et peuvent modifier l'action en cours, créer de nouvelles actions, les supprimer, ou faire toutes sortes de choses comme par exemple créer une journalisation des actions envoyées:

```
// Si nous avons besoin de store.dispatch() ou store.getState()
const logMiddleware = ({ getState, dispatch}) => next => action => {
  console.log(`Action: ${ action.type }`)
  next(action)
}
// sinon pas besoin de la destructuration (es6)
const logMiddleware = store => next => action => {
  console.log(`Action: ${ action.type }`)
  next(action)
}

export defaut logMiddleware
```

L'utilisation du middleware se fera comme suit:

```
import { createStore, applyMiddleware } from 'redux';
import rootReducers from 'reducers/root';
import logMiddleware from 'middleware/log';
const initialState = { 
  //... 
  };

export default createStore(
  rootReducers,
  initialState,
  applyMiddleware(logMiddleware)
);
```

Bon à savoir: Le middleware le plus populaire est [thunk](https://github.com/gaearon/redux-thunk), il offre un ensemble de nouvelle fonctionalité

### React-reduc et connect

Sous React, la gestion des stores est encore plus simple grace au module React-redux qui fournit la fonction connect qui grace à deux fonctions suivantes permet d'avoir l'etat et les dispatcher et de les faire passer via les props
* mapStateToProps: Prend l'Etat en entrée et renvoi un objet contenant la parti utile à un composant
* mapDispatchToProps: Prend les dispatcheur et donne accès au composant aux actions qui lui sont utiles

### Préparation des actions et reducers

Pour les actions nous allons juste créer un fichier vide appelé index.js sous le repertoire `src/actions`. Pour ce qui est des reducers nous allons utiliser combineReducers (qui permet de combiner plusieurs reducers) et créer un fichier index.js sous `src/reducers` dans lequel nous mettrons ceci

```
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  state: (state = {}) => state
});

export default rootReducer;
```
### Provider et store

Le Provider permet de faire passer le store vers tous les composants à travers le context (comme le Router permet de faire passer l'objet location)