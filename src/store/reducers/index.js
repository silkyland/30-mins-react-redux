import { combineReducers } from 'redux'
import userReducer from './userReducer'

const RootReducer = combineReducers({
    users: userReducer,
    // another reducerhere,
})

export default RootReducer