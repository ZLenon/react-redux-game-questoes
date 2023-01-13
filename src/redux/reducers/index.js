import { combineReducers } from 'redux';
import playerReducer from './player';
import requisitionReducer from './requisitions';

const rootReducer = combineReducers({
  player: playerReducer,
  requisition: requisitionReducer,
});

export default rootReducer;
