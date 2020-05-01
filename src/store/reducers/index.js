import { combineReducers } from 'redux';
import userReducer from './userReducer';
import articleReducer from './articleReducer';
import routeReducer from './routeReducer';

const rootReducer = combineReducers({
	user: userReducer,
	article: articleReducer,
	route: routeReducer,
});

export default rootReducer;
