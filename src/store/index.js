import { createStore } from 'redux'
import RootReducer from './reducers'

const initailState = {
    users: []
}
const store = createStore(
    RootReducer,
    initailState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store