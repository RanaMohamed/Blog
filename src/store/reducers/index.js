import { combineReducers } from 'redux';
import requestReducer from './requestReducer';
import userReducer from './userReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
	request: requestReducer,
	user: userReducer,
	article: articleReducer,
});

export default rootReducer;
