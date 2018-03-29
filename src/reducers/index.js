import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

// Pour la demo du tuto
import setDarkHeader from './theme'

const rootReducer = combineReducers({
  // reduce was rename form in import stmt
  form,
  // Pour la demo du tuto
  isDarkHeader: setDarkHeader
});

export default rootReducer;