import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import cooks from './cooks';
import fruits from './fruits';
import juices from './juices';
import recipes from './recipes';

export default combineReducers({
  routing: routerReducer,
  app,
  cooks,
  fruits,
  juices,
  recipes,
});
