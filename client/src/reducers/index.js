import { combineReducers } from 'redux';

import dealReducer from './dealReducer';

export default combineReducers({
    deals: dealReducer
});
