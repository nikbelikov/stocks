import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import stocks from './stocks';

export default combineReducers({
  router: routerReducer,
  stocks,
});
