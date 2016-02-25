import { combineReducers } from 'redux';
import counter from './counter';
import random from './random';

export default  combineReducers({
  counter,
  random
});
