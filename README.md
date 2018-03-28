# Mise en place de l'Authentification au niveau d'un client utilisant React/Redux

- [Mise en place de l'Authentification au niveau d'un client utilisant React/Redux](#mise-en-place-de-lauthentification-au-niveau-dun-client-utilisant-reactredux)
  - [Présentation de l'application client](#pr%C3%A9sentation-de-lapplication-client)
    - [Les 3As](#les-3as)
    - [Contenu de l'application](#contenu-de-lapplication)
  - [Préparation du serveur](#pr%C3%A9paration-du-serveur)
  - [Mise en place de Redux + implémentation simple](#mise-en-place-de-redux-impl%C3%A9mentation-simple)
    - [Flux](#flux)
    - [Redux](#redux)
    - [Terminologie](#terminologie)
      - [Actions  actions creators](#actions-actions-creators)
      - [Reducers](#reducers)
      - [Store](#store)
        - [Reselect](#reselect)
      - [MiddleWare](#middleware)
      - [Redux-thunk](#redux-thunk)
      - [Redux-promise](#redux-promise)
    - [Provider et store](#provider-et-store)
    - [Préparation des actions et reducers](#pr%C3%A9paration-des-actions-et-reducers)
    - [React-redux et connect](#react-redux-et-connect)
    - [Imaginons un cas d'utilisation des redux.](#imaginons-un-cas-dutilisation-des-redux)
    - [HandleClick et preventDefault](#handleclick-et-preventdefault)
    - [Etat de l'authentification (State)](#etat-de-lauthentification-state)
  - [Mise en place des routes](#mise-en-place-des-routes)
    - [React-router (RR4)](#react-router-rr4)
    - [Différence avec React-router-dom, React-router-native, React-router-redux](#diff%C3%A9rence-avec-react-router-dom-react-router-native-react-router-redux)
    - [Implémentation](#impl%C3%A9mentation)
    - [Header en tant que menu principal](#header-en-tant-que-menu-principal)

## Présentation de l'application client

Nous allons nous connecter à un serveur distant dont l'auttorisation est gérée par JWT. Le code et tuto de mise en place du serveur sont ici: [https://github.com/Benfarhat/Tuto-Server-Auth-Passport-JWT](https://github.com/Benfarhat/Tuto-Server-Auth-Passport-JWT)

### Les 3As

Attention a bien faire la différence entre les 3 fonctions de sécurité appelé 3A:
* Authentification: Permet de vérifier qu'une personne est bien celle qu'elle prétend via une preuve de son identité sous la forme d'un nom d'utilisateur et d'un mot de passe (il existe d'autre preuve comme l'OTP)
* Autorisation: Permet de vérifier si une personne à le droit d'accèder à une ressource donnée, on peut être authentifié sans pour autant être autorisé à accéder a certaines partie d'un site, les autorisations sont principalement par personnes ou par groupe, un groupe aura un rôle particulier
* Accounting (ou tracabilité), c'est un suivi des objets, des actions et des individus, cela vous permet de savoir quand une personne s'est connectée et ce qu'il a fait, ou encore de savoir si un message a bien été recu par son destinataire, etc ...

### Contenu de l'application

Le site comprendra les pages suivantes:

| Page        | Accès           | Lien  |
| ------------- |:-------------:| -----:|
| Accueil      | public | / |
| Connexion (login)      | public | /signin |
| Inscription (register)      | public | /signup |
| Ressources      | privé | /private |


## Préparation du serveur

Pour l'installation du serveur nous utiliserons simplement l'utilitaire [Create React App](https://github.com/facebookincubator/create-react-app).

```
create-react-app client
cd client
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

> Notez que la contenu de App.js est ce qu'on peut faire de plus dégueulasse. Dans la réalité, la partie header sera un autre composant, peut être que les élements aussi, la partie Main pourrait en être une autre, bref plus vous divisez et mieux c'est à condition que la division soit utile, pas la peine de nous faire un coposant si c'est juste pour mettre une balise <hr />


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

## Mise en place de Redux + implémentation simple

Installons les modules redux et react-redux et react-router
`yarn add redux react-redux react-router`

A présent dans le fichier index.js, nous allons entourer notre App avec un Provider dans lequel se trouve notre store

### Flux

Redux n'est pas une librairie mais une implémentation de `Flux`. 
Qu'est ce que Flux? Flux redéfini les patterns (Modèles de conception) MVC (Model Vue Contrôleur) et MVVM (Model Vue Vue-Model) ainsi que le Two-Way Data Binding. L'implémentation proposée par Flux  est "l'`Unidirectional data flow`".
Notez par la même occasion que dans React, les composants sont généralement classés en deux types, les composants dit de `présentation` et les composants dit `conteneur`. Chaque composant peut avoir un état, qui contiendra des valeurs aussi diverses que variées comme par exemple le menu active, la langue choisie, le nombre de clique de l'utilisateur sur un élement etc...

* Les composants de présentations: ils gèrent leur affichage en fonction des valeurs du store reçues dans props
* Les composant conteneurs: ils contribuent à la modification du store en émettant des actions et en s'abonnant au store, ils contiennent également des composants de présentation.

Les composants d'une implémentation Flux utilisent le `store` qui contient l'état de l'application, les `actions` qui décrivent les changements suite à un évènement, et enfin les `dispatchers` qui en se basant sur l'action et le seul a pouvoir gérer les états du store.


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
Si l'application est complexe, un reducer pourrait contenir la gestion de dizaine d'actions et le fichier deviendrait vite volumineux et difficile à gérer. Redux offre la possibilité de combiner des reducers via la fonction `combineReducers` et donc de faire un reducer par composant ou domaine. Par exemple un reducer pour la gestion des objets model, et un reducer pour la gestion de l'interface graphique.

ATTENTION: `Les reducers sont des fonctions pures`. Nous ne modifions jamais le state, conformément au principes de la programmation fonctionnel et notamment des fonctions pures, un reducer rend le nouvel état (ou une nouvelle copie contenant les modifications), il ne modifie pas le state.
En résumé un reducer permet d'avoir ceci: `(etat, action) => nouvel_etat`

Pour poursuivre avec l'exemple ci dessus, nous obtenons le code suivant:

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

Sous React, le store est crée avec la fonction createStore

Notez qu'un store peut être créer avec un état initial, il fournit les fonctions suivantes:

* getState: pour obtenir l'état actuel 
* dispatch: pour déclencher une action qui mettra à jour le state
* subscribe: pour s'abonner au store (et donc notifier les listeners lors d'une modification du state) 

##### Reselect

Notez que si vous désirez réduire le nombre de mise à jour dans votre application React, la librairie Reselect peut répondre à cette logique.
Imaginez que dans votre store, vous avez un objet qui s'occupe des couleurs du thème, est ce qu'il est utile de mettre à jour le thème à chaque fois que dans le store nous rajoutions un article ou modifions la langue? Reselect 

#### MiddleWare

Les middlewares interceptent les actions envoyées vers le store, ils ont accès à la fonction dispatch et peuvent modifier l'action en cours, créer de nouvelles actions, les supprimer, ou faire toutes sortes de choses comme par exemple créer une journalisation des actions envoyées:

```
// Si nous avons besoin de store.dispatch() ou store.getState()
const logMiddleware = ({ getState, dispatch}) => next => action => {
  console.log(`Action: ${ action.type }`)
  dispatch({ type: 'LOG_ACTION' })
  next(action)
}
// sinon pas besoin de la destructuration (es6)
const logMiddleware = store => next => action => {
  console.log(`Action: ${ action.type }`)
  store.dispatch({ type: 'LOG_ACTION' })
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

#### Redux-thunk 

Bon à savoir: Le middleware le plus populaire est [thunk](https://github.com/gaearon/redux-thunk), il offre un ensemble de nouvelle fonctionalité, il vous permet d'avoir une fonction de création d'actions qui retourneront une promesse et donc de répondre aux problèmes des actions asynchrones (comme les appels à la fonction fetch)

Tout comme pour notre logMiddleware, il suffit d'ajouter thunkMiddleware de `redux-thunk`

```
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducers from 'reducers/root';
import logMiddleware from 'middleware/log';

const initialState = { 
  //... 
  };

const store = createStore(
  rootReducers,
  initialState,
  applyMiddleware(
    logMiddleware, 
    thunkMiddleware
  )
);

```

Puis définir l'action creator suivant:

```
function fetchStuff(lol) {
  return function (dispatch) {
    dispatch(requestStuff(lol))
    return fetch(`https://www.example.com/${lol}`)
      .then(response => response.json())
      .then(json => dispatch(receiveStuff(lol, json))
      ).catch(err => dispatch(cancelStuff(err)));
  }
}

```
Notez que le concurrent (si l'on peut dire) de redux-thunk est [redux-saga](https://github.com/redux-saga/redux-saga), il propose une documentation assez complète a consulter [ici](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)

#### Redux-promise

Tout comme redux-thunk, redux-promise offre une solution au besoin unique d'envoyer une seule promesse, sans trop de complexité, redux-promise-middleware et redux-promise-reducer permettent d'offrir une solution aux promesses


### Provider et store

Le composant Provider permet de faire passer le store vers tous les composants à travers le context (comme le Router permet de faire passer l'objet location). Pour que cet accèes soit effectif, il faut connecter le composant au store

Soit donc le contenu du fichier "index.js":

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
, document.getElementById('root'));


registerServiceWorker();
```

Un message d'erreur vous avertira que l'application ne trouve pas les reducers, corrigeons ceci dans la partie qui suit.


### Préparation des actions et reducers

Pour les actions nous allons juste créer un fichier vide appelé index.js sous le repertoire `src/actions`. Pour ce qui est des reducers nous allons utiliser combineReducers (qui permet de combiner plusieurs reducers) et créer un fichier index.js sous `src/reducers` dans lequel nous mettrons ceci

```
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  state: (state = {}) => state
});

export default rootReducer;
```

### React-redux et connect

Sous React, c'est le module React-redux qui fournit la fonction connect qui grace à deux fonctions suivantes permet d'avoir au store, donc mise à part la possibilité d'avoir accès à store.getState et store.dispatch, il permet en option de prendre l'etat et les dispatcher et de les faire passer via les props au composant connecté

* mapStateToProps: Prend l'Etat en entrée et renvoi un objet contenant la parti utile à un composant
* mapDispatchToProps: Prend les dispatcheurs et va" binder" au composant les actions qui lui sont utiles

### Imaginons un cas d'utilisation des redux.

Supposons que nous voulions qu'en cliquant sur le titre, nous modifions la barre supérieur en passant d'un fond gris (bg-dark) à un fond bleu (bg-info)
Mettons notre header dans un composant que nous appelerons Header, ainsi App.js devient:

```
import React, { Component } from 'react';
import Header from './Header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="mt-3 container">
          <h1 className="pt-5">Header</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla interdum mauris eget pulvinar.</p>
        </main>
      </div>
    );
  }
}
```

et notre nouveau fichier `components/Header.js`:

```
import React, { Component } from 'react'

export default class Header extends Component {
    render () {
        return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <a className="navbar-brand" href="/">Title</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </header>
        )
    }
}
```
Créeons notre actions avec tout d'abord (comme bonne pratique) la déclaration du type qui se fera sous `src/actions/types.js`

```
const SET_DARK_HEADER = 'SET_DARK_HEADER'

export { SET_DARK_HEADER }
```

Puis sous `src/actions/index.js` déclarons notre action creator

```
import { SET_DARK_HEADER } from './types'


export const setDarkHeader = isDark => {
    return {
        type: SET_DARK_HEADER,
        payload: isDark
    }
} 
```

A présent ajoutons un reducer dans le fichier `reducers/theme.js` dans lequel nous mettrons juste:

```
import { SET_DARK_HEADER } from '../actions/types'


export default function(state = true, action){
    switch(action.type){
        case SET_DARK_HEADER:
        return action.payload
    }
    return state
}
```

Puis modifions notre fichier `reducers/index.js` pour qu'il puisse combiner ce nouveau reducers

```
import { combineReducers } from 'redux';
import setDarkHeaer from './theme'

const rootReducer = combineReducers({
  state: (state = {}) => state,
  setDarkHeaer
});

export default rootReducer;
```

A présent connectons notre header au store, ayant accàs au store, une fonction nous permettra de dire si le fond est gris ou bleu, et une seconde de préparer le bouton (le titre) qui permettra d'un clique d'activer le reducer correspondant

```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Header extends Component {

    setBgHeaderMenu = () => {
        if(this.props.isDarkHeader){
            return <a className="navbar-brand" href="/" onClick={() => this.props.setDarkHeader(false)}>Title</a>
          } else {
            return <a className="navbar-brand" href="/" onClick={() => this.props.setDarkHeader(true)}>Title</a>
        }  
    }

    getBgHeader = () => {
        if(this.props.isDarkHeader){
            return "navbar navbar-expand-md navbar-dark fixed-top bg-info"
          } else {
            return "navbar navbar-expand-md navbar-dark fixed-top bg-dark"
        }  
    }  
     
    render () {
        console.log(this.props) // Vous affiche:
        /*
        isDarkHeader: true
        setDarkHeader: function bindActionCreator()
        */
        return (
        <header>
            <nav className={this.getBgHeader()}>
              { this.setBgHeaderMenu() }
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDarkHeader: state.isDarkHeader
    }
}


export default connect(mapStateToProps, actions)(Header)
```

### HandleClick et preventDefault

Notre problème ici c'est qu'en cliquant sur le titre nous rechargeons la page, nous allons changer notre composant Header pour qu'au clique il appelle une fonction à l'intérieur de laquelle nous appelerons la fonction preventDefault() permettant d'ignorer le fonctionnement pas défaut d'un lien lors d'un click. De même pour le titre il sera changer en utilisant la condition ternaire dans le code JSX, toujours en nous basant par la propriété (prop) setDarkHeader extraite à partir du store:

```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Header extends Component {

    setBgHeaderMenu = (e) => {
        e.preventDefault()
        this.props.setDarkHeader(!this.props.isDarkHeader)
    }

    render () {
        return (
        <header>
            <nav className={ this.props.isDarkHeader ? 'navbar navbar-expand-md navbar-dark fixed-top bg-info' : 'navbar navbar-expand-md navbar-dark fixed-top bg-dark'}>
              <a className="navbar-brand" href="/" onClick={this.setBgHeaderMenu}>Turn to {this.props.isDarkHeader ? 'Grey' : 'Blue'}</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDarkHeader: state.isDarkHeader
    }
}

export default connect(mapStateToProps, actions.setDarkHeader)(Header)

```

### Etat de l'authentification (State)

L'etat de l'authenfication sera un objet `auth` avec comme propriété un booléen `authenticated` qui indique si on est connecté ou pas et une chaine de caractère (String) `error` qui change lorsqu'une erreur d'authentification survient. Vous constaterez que nous n'avons pas pris en compte la possibilité d'y insérer un token (qui sera fait d'une autre façon)

## Mise en place des routes

### React-router (RR4)

React-router est une librairie qui va nous permettre d'associer un composant à une URL et d'utiliser notamment la puissance de l'API HTML 5 `history` qui d'un coté va gérer l'historique, d'un autre de manipuler l'URL via l'objet `location` et tout cela sans que votre page soit rechargée (Rappelez vous que c'est du SPA, et que nous allons juste donner l'illusion que le site est que tout les autres bon vieux sites, constitué de plusieurs pages et dont chaque clique nécessitait pour afficher une page son chargement à partir niveau du serveur) ainsi un clique en sur le bouton retour arrière vous amène à l'affichage précédent.

Les deux principaux composants de React-router sont `Router` et `Route`, le premier permet de dire "Attention c'est le sommaine/menu du site et le second de définir les chapitres/parties du site.

* Router va nous permettre d'intégrer dans le contexte de l'application l'objet history (comme Le Provider de Redux fait avec le store)
* Route permet de faire correspondre une URL ou location dite `path` (plus ou moins exacte avec le mot clé `exact` qui doit valider jusqu'a location.pathname, ou encore le booléen `strict` qui valide jusqu'au "slash" final et avec éventuellement l'obligation d'être "case-sensitive" via le booléen `sensitive`) à un rendu particulier avec un `component`. Route fera passer les props suivant: `match`, `location` et `history`

### Différence avec React-router-dom, React-router-native, React-router-redux

React-router-dom est une sous partie de react router puisque c'est celle que nous utilisons lorsque notre application sera sur du Web (ou plus précisément sur un navigateur). Pour ceux qui utilise React-Native permettant de faire fonctionner son application sur du mobile, une autre sous partie de React-router et React-router-native

Pour ce qui est de React-router-redux, c'est une intégration entre react-redux et react-router vous permettant de controler la navigation via le store (et donc de modifier votre navigation via store.dispatch())

### Implémentation

Nous allons d'abord importer les méthodes suivantes
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';



Notez que vous avez également la directive Redirect qui permet de faire ceci:

```
<Redirect from="/login" to="/signin"/>
<Redirect from="/register" to="/signup"/>
```

Notre rendu dans index.js devient: 

```
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ createBrowserHistory() }>
        <Route path="/" component={App} />
    </Router>
  </Provider>
, document.getElementById('root'));
```

### Header en tant que menu principal

A présent dirigeons vers notre Header qui est (si l'on peut dire) la pierre angulaire autour de laquelle l'application fonctionne, c'est la que nous aurons nos menus, mais c'est également la que nos menus changerons (par exemple si on est connecté le signin devient signout)