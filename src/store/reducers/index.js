import { combineReducers } from 'redux';
import userReducer from './userReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
	user: userReducer,
	article: articleReducer,
});

export default rootReducer;
