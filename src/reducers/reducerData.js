import { FETCH_DATA } from '../actions'

//default our state to {object} to begin with
export default function (state = {}, action) {
    switch (action.type) {

        case FETCH_DATA:
            return action.payload

        default:
            return state;
    }
}

