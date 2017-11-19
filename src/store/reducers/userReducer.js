import { GET_USERS } from '../types'

const user = (state = [], action) => {
    switch (action.type) {
        case GET_USERS:
            return action.payload.users
        default:
            return state
    }
}

export default user