//reduer를 거쳐 store에 저장
export default function(state = {}, action){
    //action에서 온 type값에 따라 store에 저장
    switch (action.type){
        case 'USER_LOGIN' :
            return {...state, login : action.payload}
            break;

        case 'USER_REGISTER' :
            return {...state, register : action.payload}
            break;
            
        case 'USER_PROFILE' :
            return {...state, profile : action.payload}
            break;

        case 'USER_AUTH' :
            return {...state, login : action.payload}
            break;
            
        default:
            return state;
    }
}