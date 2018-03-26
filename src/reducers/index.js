import { combineReducers } from 'redux';
import setDarkHeader from './theme'

const rootReducer = combineReducers({
  state: (state = {}) => state,
  isDarkHeader: setDarkHeader
});

export default rootReducer;