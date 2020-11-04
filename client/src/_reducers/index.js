import { combineReducers } from 'redux';
import user from './user_reducer';
import contact from './contact_reducer';
const rootReducer = combineReducers({
    user,
    contact
})
export default rootReducer;