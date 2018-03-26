import { SET_DARK_HEADER } from '../actions/types'


export default function(state = true, action){
    switch(action.type){
        case SET_DARK_HEADER:
        return action.payload
        default:
        return state
    }
}