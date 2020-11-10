import { combineReducers } from 'redux';
import user from './user_reducer';
import contact from './contact_reducer';
import notification from './notification_reducer';
const rootReducer = combineReducers({
    user,
    contact,
    notification
})
export default rootReducer;