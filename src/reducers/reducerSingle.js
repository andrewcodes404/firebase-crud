import { FETCH_ITEM, RESET_INITIAL_STATE } from '../actions'

//default our state to {object} to begin with
export default function (state = {}, action) {
    switch (action.type) {

        case FETCH_ITEM:
            return { ...action.payload }
        
        case RESET_INITIAL_STATE:
            return { ...action.payload }

        default:
            return state;
    }
}