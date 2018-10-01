const initialState = {
    user: ''
}

const USERINFO = 'USERINFO'
export default (state = initialState, action) => {
    switch(action.type){
        case USERINFO: 
        return {...state, user: action.payload}
        default :
        return state
        }
        
    }

    export function userinfo(user){
        return {
            type: USERINFO,
            payload: user
        }
    }